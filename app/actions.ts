'use server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { bannerSchema, productSchema } from './lib/zodSchemas';
import prisma from './lib/db';
import { redis } from './lib/radis';
import { Cart } from './lib/interfaces';
import { revalidatePath } from 'next/cache';
import { stripe } from './lib/stripe';

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'adnankarim725@gmail.com') {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  // Send the submission back to the client if the status is not successful
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(',').map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect('/dashboard/products');
}

// update server action

export async function editProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'adnankarim725@gmail.com') {
    return redirect('/');
  }

  // check form data along with zon schema
  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  // Send the submission back to the client if the status is not successful
  if (submission.status !== 'success') {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(',').map((url) => url.trim())
  );

  // prisam mutation
  const productId = formData.get('productId') as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      category: submission.value.category,
      price: submission.value.price,
      isFeatured: submission.value.isFeatured === true ? true : false,
      status: submission.value.status,
      images: flattenUrls,
    },
  });

  redirect('/dashboard/products');
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'adnankarim725@gmail.com') {
    return redirect('/');
  }

  await prisma.product.delete({
    where: {
      id: formData.get('productId') as string,
    },
  });

  redirect('/dashboard/products');
}

export async function createBanner(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'adnankarim725@gmail.com') {
    return redirect('/');
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  // Send the submission back to the client if the status is not successful
  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect('/dashboard/banner');
}
export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const cartData = await redis.get(`cart-${user.id}`);
  let cart: Cart | null = null;
  if (cartData) {
    try {
      cart = typeof cartData === 'string' ? JSON.parse(cartData) : cartData;
    } catch (error) {
      console.error('Error parsing cart data:', error);
      cart = null;
    }
  }

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
    where: { id: productId },
  });

  if (!selectedProduct) throw new Error('Product not found');
  if (!selectedProduct.images || selectedProduct.images.length === 0) {
    throw new Error('Product has no images');
  }

  let myCart: Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          id: selectedProduct.id,
          price: selectedProduct.price.toString(),
          quantity: '1',
          name: selectedProduct.name,
          imageString: selectedProduct.images[0],
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart = {
      userId: user.id,
      items: cart.items.map((item) => {
        if (item.id === productId) {
          itemFound = true;
          item.quantity = (parseInt(item.quantity) + 1).toString();
        }
        return item;
      }),
    };

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        price: selectedProduct.price.toString(),
        quantity: '1',
        name: selectedProduct.name,
        imageString: selectedProduct.images[0],
      });
    }
  }

  await redis.set(`cart-${user.id}`, JSON.stringify(myCart));

  revalidatePath('/', 'layout');
}

export async function updateItemQuantity(productId: string, newQuantity: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  if (newQuantity <= 0) {
    // If quantity is 0 or less, remove the item
    return removeItem(productId);
  }

  const cartData = await redis.get(`cart-${user.id}`);
  let cart: Cart | null = null;
  if (cartData) {
    try {
      cart = typeof cartData === 'string' ? JSON.parse(cartData) : cartData;
    } catch (error) {
      console.error('Error parsing cart data:', error);
      cart = null;
    }
  }

  if (!cart || !cart.items) {
    return;
  }

  const myCart: Cart = {
    userId: user.id,
    items: cart.items.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity.toString() };
      }
      return item;
    }),
  };

  await redis.set(`cart-${user.id}`, JSON.stringify(myCart));
  revalidatePath('/bag');
  revalidatePath('/', 'layout');
}

export async function removeItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const cartData = await redis.get(`cart-${user.id}`);
  let cart: Cart | null = null;
  if (cartData) {
    try {
      cart = typeof cartData === 'string' ? JSON.parse(cartData) : cartData;
    } catch (error) {
      console.error('Error parsing cart data:', error);
      cart = null;
    }
  }

  if (!cart || !cart.items) {
    return;
  }

  const myCart: Cart = {
    userId: user.id,
    items: cart.items.filter((item) => item.id !== productId),
  };

  await redis.set(`cart-${user.id}`, JSON.stringify(myCart));
  revalidatePath('/bag');
  revalidatePath('/', 'layout');
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== 'adnankarim725@gmail.com') {
    return redirect('/');
  }

  await prisma.banner.delete({
    where: {
      id: formData.get('bannerId') as string,
    },
  });

  redirect('/dashboard/banner');
}

// export async function addItem(productId: string) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user || user.email !== 'adnankarim725@gmail.com') {
//     return redirect('/');
//   }

//   const cart: Cart | null = await redis.get(`cart-${user.id}`);

//   const selectedProduct = await prisma.product.findUnique({
//     select: {
//       id: true,
//       name: true,
//       price: true,
//       images: true,
//     },
//     where: {
//       id: productId,
//     },
//   });

//   if (!selectedProduct) {
//     throw new Error('Product not found');
//   }

//   let myCart: Cart;

//   if (!cart || !cart.items) {
//     myCart = {
//       userId: user.id,
//       items: [
//         {
//           id: selectedProduct.id,
//           price: selectedProduct.price,
//           quantity: '1',
//           name: selectedProduct.name,
//           imageString: selectedProduct.images[0],
//         },
//       ],
//     };
//   } else {
//     let itemFound = false;

//     myCart = {
//       userId: user.id,
//       items: cart.items.map((item) => {
//         if (item.id === productId) {
//           itemFound = true;
//           item.quantity = (parseInt(item.quantity) + 1).toString();
//         }
//         return item;
//       }),
//     };

//     if (!itemFound) {
//       myCart.items.push({
//         id: selectedProduct.id,
//         price: selectedProduct.price,
//         quantity: '1',
//         name: selectedProduct.name,
//         imageString: selectedProduct.images[0],
//       });
//     }
//   }

//   // Save updated cart
//   // await redis.set(`cart-${user.id}`, myCart);
//   await redis.set(`cart-${user.id}`, JSON.stringify(myCart));
// }

// Stripe Checkout Action
export async function createCheckoutSession() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const cartData = await redis.get(`cart-${user.id}`);
  let cart: Cart | null = null;
  if (cartData) {
    try {
      cart = typeof cartData === 'string' ? JSON.parse(cartData) : cartData;
    } catch (error) {
      console.error('Error parsing cart data:', error);
      cart = null;
    }
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return redirect('/bag');
  }

  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.imageString],
      },
      unit_amount: Math.round(Number(item.price) * 100), // Convert to cents
    },
    quantity: Number(item.quantity),
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    }/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/cancel`,
    customer_email: user.email || undefined,
    metadata: {
      userId: user.id,
    },
  });

  if (session.url) {
    redirect(session.url);
  } else {
    throw new Error('Failed to create checkout session');
  }
}

// Conform.guide isntall and do this setups
// 4/16/11

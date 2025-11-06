'use server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { bannerSchema, productSchema } from './lib/zodSchemas';
import prisma from './lib/db';
import { redis } from './lib/radis';
import { Cart } from './lib/interfaces';
import { revalidatePath } from 'next/cache';

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

  if (!user || user.email !== 'adnankarim725@gmail.com') {
    return redirect('/');
  }

  // const cartData = await redis.get(`cart-${user.id}`);
  // const cart: Cart | null = cartData ? JSON.parse(cartData) : null;
  const cart: Cart | null = await redis.get(`cart-${user.id}`);

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

  let myCart: Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          id: selectedProduct.id,
          price: selectedProduct.price,
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
        price: selectedProduct.price,
        quantity: '1',
        name: selectedProduct.name,
        imageString: selectedProduct.images[0],
      });
    }
  }

  await redis.set(`cart-${user.id}`, JSON.stringify(myCart));

  revalidatePath('/', 'layout');
}

// export async function deleteBanner(formData: FormData) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user || user.email !== 'adnankarim725@gmail.com') {
//     return redirect('/');
//   }

//   await prisma.banner.delete({
//     where: {
//       id: formData.get('bannerId') as string,
//     },
//   });

//   redirect('/dashboard/banner');
// }

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

// Conform.guide isntall and do this setups
// 4/16/11

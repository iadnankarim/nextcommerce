// import prisma from '@/app/lib/db';
// import { notFound } from 'next/navigation';

// async function getData(productId: string) {
//   const data = await prisma.product.findUnique({
//     where: {
//       id: productId,
//     },
//   });

//   if (!data) {
//     return notFound();
//   }

//   return data;
// }

// export default async function EditRoute({ params }: { params: { id: string } }) {
//   console.log('params:', params); // ✅ see in terminal
//   const data = await getData(params.id);
//   return (
//     <div>
//       <h1>Hello from the edit route</h1>
//     </div>
//   );
// }

// import { EditForm } from "@/app/components/dashboard/EditForm";
import { EditForm } from '@/app/components/dashboard/EditForm';
import prisma from '@/app/lib/db';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

async function getData(productId: string) {
  noStore();
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getData(id);
  return (
    <div>
      <EditForm data={data} />
    </div>
  );
}

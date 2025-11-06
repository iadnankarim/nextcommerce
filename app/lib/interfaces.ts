// export type Cart = {
//   userId: string;
//   item: Array<{
//     id: string;
//     name: string;
//     price: string;
//     quantity: string;
//     imageString: string;
//   }>;
// };

export type Cart = {
  userId: string;
  items: Array<{
    id: string;
    name: string;
    price: string;
    quantity: string;
    imageString: string;
  }>;
};

import { DollarSign, PartyPopper, ShoppingBag, User2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/app/lib/db';

async function getData() {
  const user = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  const order = await prisma.order.findMany({
    select: {
      amount: true,
    },
  });

  return {
    user,
    products,
    order,
  };
}

export async function DashboardStatus() {
  const { user, products, order } = await getData();

  const totalRevenue = order.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="grid  md:grid-cols-2 md:gap-3 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(totalRevenue / 100)}
          </p>
          <p className="text-xs text-muted-foreground">Based on {order.length} charge(s)</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBag className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{order.length}</p>
          <p className="text-xs text-muted-foreground">Total sales on shoes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Products</CardTitle>
          <PartyPopper className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{products.length}</p>
          <p className="text-xs text-muted-foreground">Total Products created</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Users</CardTitle>
          <User2 className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{user.length}</p>
          <p className="text-xs text-muted-foreground">Total Users Signed Up</p>
        </CardContent>
      </Card>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStatus } from '../components/dashboard/DashboardStats';
import { Chart } from '../components/dashboard/Chart';
import prisma from '@/app/lib/db';

async function getWeekData() {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      createdAt: true,
      amount: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Create array of last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      revenue: 0,
    };
  });

  // Aggregate order data by date
  data.forEach((order) => {
    const date = new Date(order.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const dayData = last7Days.find((item) => item.date === date);
    if (dayData) {
      dayData.revenue += order.amount / 100;
    }
  });

  return last7Days;
}

async function getRecentSales() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      user: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  return data;
}

export default async function Dashboard() {
  const [weekData, recentSales] = await Promise.all([getWeekData(), getRecentSales()]);

  return (
    <>
      <DashboardStatus />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Recent transactions from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={weekData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-8">
            {recentSales.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sales yet</p>
            ) : (
              recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center gap-4">
                  <Avatar className="hidden sm:flex h-9 w-9">
                    {sale.user?.profileImage && <AvatarImage src={sale.user.profileImage} />}
                    <AvatarFallback>
                      {sale.user?.firstName?.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid gap-1">
                    <p className="text-sm font-medium">{sale.user?.firstName || 'Unknown'}</p>
                    <p className="text-sm text-muted-foreground">{sale.user?.email || 'N/A'}</p>
                  </div>
                  <p className="ml-auto font-medium">
                    +
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(sale.amount / 100)}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

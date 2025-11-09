import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingDashboard() {
  return (
    <>
      {/* Dashboard Stats Skeleton */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[120px] mb-2" />
              <Skeleton className="h-3 w-[150px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Sales Skeleton */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Recent transactions from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="grid gap-1 flex-1">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-3 w-[180px]" />
                </div>
                <Skeleton className="h-4 w-[80px]" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

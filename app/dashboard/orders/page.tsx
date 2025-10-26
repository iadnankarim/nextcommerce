import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recents orders from your store</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>
                <p className="font-medium">Adnan</p>
                <p className="hidden md:flex text-sm text-muted-foreground">text@gmail.com</p>
              </TableCell>

              <TableCell>Sales</TableCell>

              <TableCell>Success</TableCell>

              <TableCell>2025-06-12</TableCell>

              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

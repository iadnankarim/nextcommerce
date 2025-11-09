import { ReactNode } from 'react';
import { DasboardNavigation } from '../components/dashboard/DasboardNavigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CircleUser, MenuIcon, Store } from 'lucide-react';
// import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user.email !== 'adnankarim725@gmail.com') {
    return redirect('/');
  }

  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="sticky top-0 flex  h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white">
        <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <DasboardNavigation />
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="shrink md:hidden" variant="outline" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <nav className="flex flex-col gap-5 text-lg font-base mt-5">
              <DasboardNavigation />
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-medium hover:text-purple-400 transition-colors"
              >
                <Store className="h-5 w-5" />
                Back to Store
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <Link href="/" className="hidden md:block">
            <Button variant="outline" size="sm" className="gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden lg:inline">Back to Store</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" variant="secondary" size="icon">
                <CircleUser className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutLink>Logout</LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="my-5">{children}</main>
    </div>
  );
}

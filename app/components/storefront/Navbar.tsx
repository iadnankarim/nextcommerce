import Link from 'next/link';
import { NavbarLinks } from './NavbarLink';
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { ShoppingBagIcon, Menu } from 'lucide-react';
import { UserDropdown } from './UserDropDown';
import { Button } from '@/components/ui/button';
import { redis } from '@/app/lib/radis';
import { Cart } from '@/app/lib/interfaces';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Navigation links array (defined here to avoid client/server component issues)
const navbarLinks = [
  {
    id: 0,
    name: 'Home',
    href: '/',
  },
  {
    id: 1,
    name: 'All Products',
    href: '/products/all',
  },
  {
    id: 2,
    name: 'Men',
    href: '/products/men',
  },
  {
    id: 3,
    name: 'Women',
    href: '/products/women',
  },
  {
    id: 4,
    name: 'kids',
    href: '/products/kids',
  },
];

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let cart: Cart | null = null;
  if (user?.id) {
    try {
      const cartData = await redis.get(`cart-${user.id}`);
      if (cartData) {
        cart = typeof cartData === 'string' ? JSON.parse(cartData) : cartData;
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      cart = null;
    }
  }

  const total = cart?.items?.reduce((sum, item) => sum + Number(item.quantity), 0) || 0;

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-black font-bold text-xl sm:text-2xl lg:text-3xl whitespace-nowrap">
            Store<span className="text-purple-400">foru</span>
          </h1>
        </Link>
        {/* Desktop Navigation Links */}
        <NavbarLinks />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {/* Mobile Navigation Links */}
              {navbarLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-lg font-medium hover:text-purple-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t pt-4 mt-4">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/bag"
                      className="flex items-center gap-2 text-lg font-medium hover:text-purple-400 transition-colors"
                    >
                      <ShoppingBagIcon className="h-5 w-5" />
                      Shopping Bag ({total})
                    </Link>
                    <UserDropdown
                      email={user.email as string}
                      name={user.given_name as string}
                      userImage={
                        user?.picture ??
                        `https://avatar.vercel.sh/${user?.given_name || 'user'}.png`
                      }
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" asChild className="w-full">
                      <LoginLink>Sign in</LoginLink>
                    </Button>
                    <Button asChild className="w-full">
                      <RegisterLink>Create Account</RegisterLink>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Right Side */}
        {user ? (
          <>
            <Link href="/bag" className="group p-2 flex items-center mr-2 relative">
              <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              {total > 0 && (
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 hidden sm:inline">
                  {total}
                </span>
              )}
              {total > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center sm:hidden">
                  {total}
                </span>
              )}
            </Link>

            <div className="hidden md:block">
              <UserDropdown
                email={user.email as string}
                name={user.given_name as string}
                userImage={
                  user?.picture ?? `https://avatar.vercel.sh/${user?.given_name || 'user'}.png`
                }
              />
            </div>
          </>
        ) : (
          <div className="hidden md:flex md:items-center md:gap-2">
            <Button variant="ghost">
              <LoginLink>Sign in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button asChild variant="ghost">
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

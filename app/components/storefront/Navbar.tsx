import Link from 'next/link';
import { NavbarLinks } from './NavbarLink';
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { ShoppingBagIcon } from 'lucide-react';
import { UserDropdown } from './UserDropDown';
import { Button } from '@/components/ui/button';

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="w-full  max-w-7xl mx-auto sm:px-6 lg:px-8 py-5 flex items-center justify-between ">
      <div className="flex  items-center">
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Store<span className="text-purple-400">foru</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>

      <div className="flex items-center">
        {user ? (
          <>
            <Link href="/bag" className="group p-2 flex items-center mr-2">
              <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                5
              </span>
            </Link>

            <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              //   userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
              userImage={
                user?.picture ?? `https://avatar.vercel.sh/${user?.given_name || 'user'}.png`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant="ghost">
              <LoginLink>Sign in</LoginLink>
            </Button>

            <span className="h-6 wp-x bg-gray-200"></span>

            <Button asChild variant="ghost">
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

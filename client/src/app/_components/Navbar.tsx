'use client';

import { User } from '@/constants/type';
import { withAuth } from '@/hoc/withAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar({ user }: { user: User }) {  
  const pathName = usePathname();
  const isHomePage = pathName === '/';
  const isChatPage = pathName.includes('/chat');

  return (
    <header className="bg-white dark:bg-[#121212] shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          ⚡ ChatNow
        </Link>

        <nav className="space-x-4 text-sm flex items-center">
          {!isHomePage && <Link href="/" className="hover:text-blue-500">
            Home
          </Link>}
          {!isChatPage && (
            <Link href="/chat/demo-room" className="hover:text-blue-500">
              Try Chat
            </Link>
          )}
          {user ? (
            <span className="font-medium text-gray-700 dark:text-gray-300">
              <span className='bg-blue-200 rounded-full'>👤</span>  {user.user.name}
            </span>
          ) : (
            <Link href="/auth" className="hover:text-blue-500">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default withAuth(Navbar);

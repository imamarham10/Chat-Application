'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathName = usePathname();
    const isChatPage = pathName.includes("/chat");

  return (
    <header className="bg-white dark:bg-[#121212] shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          ⚡ ChatNow
        </Link>
        <nav className="space-x-4 text-sm">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          {!isChatPage && <Link href="/chat/demo-room" className="hover:text-blue-500">
            Try Chat
          </Link>}
        </nav>
      </div>
    </header>
  );
}

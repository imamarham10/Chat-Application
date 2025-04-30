// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './_components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Realtime Chat App',
  description: 'Modern real-time chat using Redis, Kafka, WebSocket',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-[#1a1a1a] dark:text-white`}>
        <div className="flex flex-col min-h-screen">
          <Navbar/>
          <main className="flex-1 w-full sm:max-w-5xl mx-auto px-4 sm:px-2 lg:px-8 overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

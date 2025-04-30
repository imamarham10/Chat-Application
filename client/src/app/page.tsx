'use client';

import Link from 'next/link';
import Features from './_components/Features';

export default function HomePage() {
  return (
    <>
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
          Real-time Chat App for Modern Teams
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Chat seamlessly with real-time updates powered by Redis, Kafka & WebSockets.
          Designed for speed, built with modern tech.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/chat/demo-room"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition shadow-md"
          >
            🚀 Try Demo Chat
          </Link>
          <Link
            href="#features"
            className="border border-gray-400 dark:border-gray-600 px-6 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            🔍 View Features
          </Link>
        </div>
<Link
  href="/create-room"
  className="text-sm underline text-blue-500 hover:text-blue-700 mt-4 block"
>
  ➕ Create a New Room
</Link>

      </div>
    </section>
    <Features/>
    </>
  );
}

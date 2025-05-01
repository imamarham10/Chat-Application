'use client';

import Link from 'next/link';
import Features from './_components/Features';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJoinChatRoomMutation } from './useJoinChatRoomMutation';
import { toast } from 'sonner';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { mutate: joinRoom } = useJoinChatRoomMutation();

  const handleJoinRoom = () => {
    joinRoom(
      { roomName, password },
      {
        onSuccess: () => {
          router.push(`/chat/${roomName.trim()}?password=${encodeURIComponent(password)}`);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Failed to join room');
        },
      }
    );
  };
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
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
          >
            🔗 Join a Room
          </button>

          <Link
            href="/create-room"
            className="text-sm underline text-blue-500 hover:text-blue-700 mt-4 block"
          >
            ➕ Create a New Room
          </Link>

        </div>
      </section>
      <Features />
      {/* 👇 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Join a Chat Room</h2>
            <input
              type="text"
              placeholder="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-2 mb-3 border rounded-md dark:bg-gray-800 dark:text-white"
            />
            <input
              type="password"
              placeholder="Room Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md dark:bg-gray-800 dark:text-white"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinRoom}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

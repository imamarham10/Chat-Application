'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AvatarGenerator } from 'random-avatar-generator';
import { X, Menu } from 'lucide-react';

const generator = new AvatarGenerator();

export default function ActiveUsersPanel() {
  const [users, setUsers] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Simulate Redis connection: fetch active users
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate Redis logic: create dummy users
      setUsers(['Alice', 'Bob', 'Charlie'].map((name) => generator.generateRandomAvatar(name)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <aside className="hidden lg:flex flex-col w-48 bg-white dark:bg-[#1a1a1a] rounded-lg shadow p-4 ml-4 h-[calc(100vh-64px)]">
        <h2 className="text-lg font-semibold mb-2">Active Users</h2>
        <div className="space-y-2 overflow-y-auto">
          {users.map((avatar, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Image src={avatar} alt={`User ${idx}`} width={32} height={32} className="w-8 h-8 rounded-full" />
              <span className="text-sm text-gray-700 dark:text-gray-300">User {idx + 1}</span>
            </div>
          ))}
        </div>
      </aside>

      <button
        onClick={() => setShowModal(!showModal)}
        className="lg:hidden fixed top-17 right-1 z-50 p-2 rounded-md bg-white dark:bg-[#222] shadow"
        aria-label="Toggle Active Users"
      >
        {showModal ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {showModal && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-end">
          <div className="w-64 bg-white dark:bg-[#1a1a1a] h-full p-4">
            <h2 className="text-lg font-semibold mb-2">Active Users</h2>
            <div className="space-y-2 overflow-y-auto">
              {users.map((avatar, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Image src={avatar} alt={`User ${idx}`} width={32} height={32} className="w-8 h-8 rounded-full" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">User {idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

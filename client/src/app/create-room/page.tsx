'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRoomPage() {
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    // Assuming we send a request to create a room and get a room ID
    // In this case, we are simply simulating it.
    const newRoomId = roomName.toLowerCase().replace(/\s+/g, '-');

    // Redirecting to the new room
    router.push(`/chat/${newRoomId}`);
  };

  return (
    <div className="min-h-screen mt-[-64px] flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-[#1c1c1c] rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Create a New Room</h2>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white"
        />
        <input
          type='text'
          value={roomPassword}
          onChange={(e) => setRoomPassword(e.target.value)}
          placeholder='Enter room password'
          className='w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white'
        />
        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Create & Join
        </button>
      </div>
    </div>
  );
}

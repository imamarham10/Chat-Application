'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateChatRoomMutation } from './useCreateChatRoomMutation';
import { toast } from 'sonner';

export default function CreateRoomPage() {
  const [form, setForm] = useState({ roomName: '', password: '', isGroup: false });
  const router = useRouter();
  const {mutate} = useCreateChatRoomMutation();
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data)=> {
        console.log(`Room created`, data);
        toast.success("Room created successfully!");
        router.push(`/`)
      }
    })
  };

  return (
    <div className="min-h-screen mt-[-64px] flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-[#1c1c1c] rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Create a New Room</h2>
        <input
          type="text"
          value={form.roomName}
          onChange={(e) => setForm({ ...form, roomName: e.target.value })}
          placeholder="Enter room name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white"
        />
        <input
          type='text'
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder='Enter room password'
          className='w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-[#222] text-black dark:text-white'
        />
        <div className="flex items-center mb-4 space-x-2">
          <input
            id="isGroup"
            type="checkbox"
            checked={form.isGroup}
            onChange={(e) => setForm({ ...form, isGroup: e.target.checked })}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="isGroup" className="text-sm text-gray-900 dark:text-gray-300">
            Is this a group chat?
          </label>
        </div>
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

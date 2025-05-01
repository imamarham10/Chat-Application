'use client';

import { useState } from 'react';
import { useRegisterMutation } from './useRegisterMutation';

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { mutate, isPending } = useRegisterMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data) => {
        console.log('User registered:', data);
        // Optional: redirect or show success message
      },
      onError: (err) => {
        console.error('Registration failed:', err);
      },
    });
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border rounded dark:bg-[#2a2a2a]"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border rounded dark:bg-[#2a2a2a]"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border rounded dark:bg-[#2a2a2a]"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer disabled:opacity-50"
      >
        {isPending ? 'Registering...' : 'Register'}
      </button>

      {/* {isError && (
        <p className="text-red-500 text-sm">
          {(error as any)?.response?.data?.message || 'Something went wrong.'}
        </p>
      )} */}
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useLoginMutation } from './useLoginMutation';

export default function LoginForm() {
  const [form, setForm] = useState({email: '', password: ''});
  const { mutate, isPending} = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call here
    mutate(form, {
      onSuccess: (data) => {
        console.log(`User logged in:`, data);
      },
      onError: (err) => {
      console.log("🚀 ~ handleLogin ~ err:", err)
      }
    })
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({...form, email: e.target.value})}
        className="w-full p-2 border rounded dark:bg-[#2a2a2a]"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({...form, password: e.target.value})}
        className="w-full p-2 border rounded dark:bg-[#2a2a2a]"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer">
        {isPending ? 'Logging In...' : 'Login'}
      </button>
    </form>
  );
}

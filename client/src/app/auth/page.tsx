'use client';

import { useState } from 'react';
import LoginForm from './_components/LoginForm';
import RegisterForm from './_components/RegisterForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#111] px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1c1c1c] p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          {isLogin ? 'Login' : 'Register'}
        </h1>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register now' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
}

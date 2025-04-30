'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AvatarGenerator } from 'random-avatar-generator';
import Image from 'next/image';
import ActiveUsersPanel from '@/app/_components/ActiveUsersPannel';

const generator = new AvatarGenerator();

export default function ChatRoomPage() {
    const { roomId } = useParams();

    const [avatars, setAvatars] = useState<{ me: string; other: string }>({
        me: '',
        other: '',
    });

    const [messages, setMessages] = useState<{ text: string; sender: 'me' | 'other' }[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        setAvatars({
            me: generator.generateRandomAvatar('me'),
            other: generator.generateRandomAvatar('other'),
        });
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { text: input, sender: 'me' }]);
        setInput('');
    };

    return (
        <div className="h-[calc(100vh-64px)] w-full bg-blue-100 dark:bg-[#111] px-4 py-2 flex justify-center overflow-y-auto">
            <div className="w-full max-w-2xl flex flex-col min-h-full">
                <h1 className="text-2xl font-bold mb-2 text-black mx-auto dark:text-white">
                    Chat Room: {roomId}
                </h1>

                <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#1c1c1c] rounded-lg p-2 mb-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} items-center gap-2`}
                        >
                            {msg.sender === 'other' && (
                                <Image src={avatars.other} alt='Other avatar'  width={32} height={32} className='w-8 h-8 rounded-full bg-gray-200' />
                                // <img
                                //   src={avatars.other}
                                //   alt="Other Avatar"
                                //   className="w-8 h-8 rounded-full bg-gray-200"
                                // />
                            )}
                            <div
                                className={`max-w-xs p-2 rounded-lg ${msg.sender === 'me'
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : 'bg-gray-300 text-black rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>
                            {msg.sender === 'me' && (
                                <Image src={avatars.me} alt='my avatar' width={32} height={32} className='w-8 h-8 rounded-full bg-gray-200' />

                                // <img
                                //     src={avatars.me}
                                //     alt="My Avatar"
                                //     className="w-8 h-8 rounded-full bg-gray-200"
                                // />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Type a message..."
                        rows={1}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#222] text-black dark:text-white resize-none"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
            <ActiveUsersPanel/>
        </div>
    );
}

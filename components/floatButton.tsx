import Link from 'next/link';
import React from 'react';

interface floatButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function FloatButton({ href, children }: floatButtonProps) {
  return (
    <Link href={href}>
      <button className="fixed bottom-16 right-4 bg-black w-12 h-12 z-30 flex items-center justify-center rounded-full hover:bg-gray-800 focus:ring-1 focus:ring-purple-600 text-white text-md">
        {children}
      </button>
    </Link>
  );
}

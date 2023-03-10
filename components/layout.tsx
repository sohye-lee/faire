import Link from 'next/link';
import React from 'react';
import { mergeClass } from '../pages/libs/utils';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar = true,
  children,
}: LayoutProps) {
  return (
    <div>
      <div className="w-full bg-white border-b text-md font-serif font-medium fixed top-0 left-0 h-14 z-20">
        <div className="w-full max-w-2xl h-full mx-auto px-4 flex justify-center space-x-4 items-center">
          <Link href="/">Home</Link>
        </div>
      </div>
      <div className={mergeClass('pt-16', hasTabBar ? 'pb-16' : '')}>
        {children}
        {hasTabBar ? (
          <nav className="w-full bg-white border-t text-md font-serif font-medium fixed bottom-0 left-0 h-14 z-20">
            <div className="w-full max-w-2xl h-full mx-auto px-4 flex justify-center space-x-4 items-center">
              home
            </div>
          </nav>
        ) : null}
      </div>
    </div>
  );
}

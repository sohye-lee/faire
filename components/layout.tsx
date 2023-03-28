import Link from 'next/link';
import React from 'react';
import { mergeClass } from '../libs/client/utils';
import {
  RiHome3Line,
  RiNewspaperLine,
  RiChat1Line,
  RiUser2Line,
  RiVideoLine,
  RiArrowGoBackLine,
  RiArrowLeftCircleLine,
} from 'react-icons/ri';
import { useRouter } from 'next/router';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div>
      <div className="w-full bg-white border-b text-md font-serif font-medium fixed top-0 left-0 h-14 z-20">
        <div className="w-full max-w-2xl h-full mx-auto px-4 flex justify-center space-x-4 items-center relative">
          {canGoBack ? (
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-gray-500 hover:text-purple-600 transition px-4"
              onClick={goBack}
            >
              <RiArrowLeftCircleLine />
            </div>
          ) : null}
          {title}
        </div>
      </div>
      <div className={mergeClass('pt-16', hasTabBar ? 'pb-20' : '')}>
        {children}
        {hasTabBar ? (
          <nav className="w-full bg-white border-t text-md font-serif font-medium fixed bottom-0 left-0 py-2 z-20">
            <div className="w-full max-w-2xl h-full mx-auto px-6 flex justify-between space-x-4 items-center">
              <Link href="/">
                <a className="hover:text-purple-600 flex flex-col items-center justify-content text-3xl text-gray-800 w-1/5">
                  <RiHome3Line />
                  <span className="text-xs font-sans">Home</span>
                </a>
              </Link>
              <Link href="/community">
                <a className="hover:text-purple-600 flex flex-col items-center justify-content text-3xl text-gray-800 w-1/5">
                  <RiNewspaperLine />
                  <span className="text-xs font-sans">Community</span>
                </a>
              </Link>
              <Link href="/chats">
                <a className="hover:text-purple-600 flex flex-col items-center justify-content text-3xl text-gray-800 w-1/5">
                  <RiChat1Line />
                  <span className="text-xs font-sans">Chats</span>
                </a>
              </Link>
              <Link href="/live">
                <a className="hover:text-purple-600 flex flex-col items-center justify-content text-3xl text-gray-800 w-1/5">
                  <RiVideoLine />
                  <span className="text-xs font-sans">Live</span>
                </a>
              </Link>
              <Link href="/profile">
                <a className="hover:text-purple-600 flex flex-col items-center justify-content text-3xl text-gray-800 w-1/5">
                  <RiUser2Line />
                  <span className="text-xs font-sans">Profile</span>
                </a>
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </div>
  );
}

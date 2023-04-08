import React from 'react';
import type { NextPage } from 'next';
import Layout from '@components/layout';
import Button from '@components/button';

interface ItemProps {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  comments: number;
  hearts: number;
}
const ItemDetail: NextPage = () => {
  return (
    <Layout hasTabBar={false} canGoBack={true}>
      <div className="px-4">
        <div>
          <div className="h-96 bg-slate-300" />
          <div className="flex items-center space-x-3 py-3 border-t border-b cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div>
              <p className="font-medium font-serif text-sm text-gray-700">
                Steve Jobs
              </p>
              <p className="text-xs font-medium font-sans text-gray-700">
                View profile &rarr;
              </p>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl font-serif font-medium">Galaxy S50</h1>
            <p className="text-3xl font-serif">$140</p>
            <p className="my-3 text-sm text-gray-700">
              My money&apos;s in that office, right? If she start giving me some
              bullshit about it ain&apos;t there, and we got to go someplace
              else and get it, I&apos;m gonna shoot you in the head then and
              there. Then I&apos;m gonna shoot that bitch in the kneecaps, find
              out where my goddamn money is. She gonna tell me too. Hey, look at
              me when I&apos;m talking to you, motherfucker. You listen: we go
              in there, and that ni**a Winston or anybody else is in there, you
              the first motherfucker to get shot. You understand?
            </p>
            <div className="flex items-stretch space-x-2">
              <Button large={true} filled={true} text="Talk To Seller" />
              <Button
                large={false}
                filled={false}
                addClass="h-full p-3"
                text=""
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <h2 className="font-serif text-gray-900 text-2xl capitalize">
            Similar items
          </h2>
          <div className="py-5 flex gap-2 overflow-scroll">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i}>
                <div className="bg-slate-300 w-80 h-80" />
                <h3 className="text-md font-serif text-gray-700">Galaxy S60</h3>
                <p className="text-md font-sans text-gray-700">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;

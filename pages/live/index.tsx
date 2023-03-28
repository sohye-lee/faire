import type { NextPage } from 'next';
import Link from 'next/link';
import { RiAddLine, RiVideoAddLine } from 'react-icons/ri';
import FloatButton from '@components/floatButton';
import Layout from '@components/layout';

const Live: NextPage = () => {
  return (
    <Layout title={'Live'} hasTabBar={true} canGoBack={false}>
      <div className="relative">
        <div className="flex flex-col divide-y">
          {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
            <div key={i} className="px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-300 w-full aspect-video"></div>
                <div className="w-full">
                  <div className="w-full">
                    <Link href={`/live/${[_]}`}>
                      <a>
                        <p className="font-serif font-bold text-md capitalize">
                          title {_}
                        </p>
                      </a>
                    </Link>
                    <p className="font-sans text-sm font-light text-gray-600 w-full">
                      Description Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <FloatButton href="/live/create">
          <RiVideoAddLine width="40" height="40" color="white" />
        </FloatButton>
      </div>
    </Layout>
  );
};

export default Live;

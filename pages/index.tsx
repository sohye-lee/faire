import type { NextPage } from 'next';
import Link from 'next/link';
import {
  RiHeart2Line,
  RiHeart3Line,
  RiHeart2Fill,
  RiAddLine,
  RiChat2Line,
  RiChat3Line,
} from 'react-icons/ri';
import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  items-stretch w-full px-4">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <div key={i} className="border border-gray-200 h-full">
            <div className="w-full aspect-square bg-gray-100 relative">
              <div className="absolute top-2 right-2 flex items-center justify-end space-x-3">
                <button className="flex items-center space-x-1">
                  <RiHeart3Line className="" width="24" height="24" />
                  <span>1</span>
                </button>
                <button className="flex items-center space-x-1">
                  <RiChat3Line className="" width="24" height="24" />
                  <span>3</span>
                </button>
              </div>
            </div>
            <div className="p-3 h-32 flex flex-col justify-between">
              <div>
                <Link href={`/items/${[_]}`}>
                  <a>
                    <p className="font-serif font-bold text-md capitalize truncate">
                      title {_}
                    </p>
                  </a>
                </Link>
                <p className="font-sans text-sm font-light text-gray-600 truncate mb-1">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eveniet hic molestiae suscipit ex natus et. Iste, illum
                  beatae, ratione odit vero ullam repellendus nisi alias
                  voluptas impedit totam! Suscipit, hic?
                </p>
                <p className="font-sans text-sm">$99.99</p>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-md bg-blue-400"></div>
                <div className="w-3 h-3 rounded-md bg-purple-400"></div>
                <div className="w-3 h-3 rounded-md bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-md bg-red-400"></div>
                <div className="w-3 h-3 rounded-md bg-black"></div>
                <div className="w-3 h-3 rounded-md bg-white border"></div>
              </div>
            </div>
          </div>
        ))}
        <button className="fixed bottom-10 right-10 bg-black w-10 h-10 z-30 flex items-center justify-center rounded-full">
          <RiAddLine width={60} height={60} color="white" />
        </button>
      </div>
    </Layout>
  );
};

export default Home;

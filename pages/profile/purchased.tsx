import type { NextPage } from 'next';
import Link from 'next/link';
import {
  RiHeart2Line,
  RiHeart2Fill,
  RiAddLine,
  RiChat2Line,
  RiHeart3Line,
  RiChat3Line,
} from 'react-icons/ri';

const Purchased: NextPage = () => {
  return (
    <div className=" max-w-2xl mx-auto py-16 flex flex-col divide-y">
      {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
        <div key={i} className="px-4 py-3 flex justify-between items-end">
          <div className="flex items-center space-x-3">
            <div className="w-20 h-20 bg-purple-100"></div>
            <div>
              <div>
                <Link href={`/items/${[_]}`}>
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
                <p className="font-serif text-md mt-3">$99.99</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
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
      ))}
    </div>
  );
};

export default Purchased;

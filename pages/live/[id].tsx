import type { NextPage } from 'next';
import Link from 'next/link';
import { RiAddLine, RiVideoAddLine } from 'react-icons/ri';

const LiveDetail: NextPage = () => {
  return (
    <div>
      <div className=" max-w-2xl mx-auto py-16 flex flex-col divide-y">
        <div className=" space-y-3">
          <div className="bg-slate-300 w-full aspect-video"></div>
          <div>
            <div>
              <a>
                <p className="font-serif font-bold text-2xl capitalize">
                  Live Stream title
                </p>
              </a>
              <p className="font-sans text-md font-light text-gray-600 w-full">
                Description Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDetail;

import type { NextPage } from 'next';
import Link from 'next/link';
import { RiAddLine, RiVideoAddLine } from 'react-icons/ri';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';

const LiveDetail: NextPage = () => {
  return (
    <Layout title={'Live 1'} hasTabBar={false} canGoBack={true}>
      <div className="relative flex flex-col divide-y h-screen px-4 space-y-5">
        <div className=" space-y-3">
          <div className="bg-slate-300 w-full aspect-video"></div>
          <div>
            <div className="pb-4">
              <a>
                <p className="font-serif text-gray-800 font-semibold text-2xl capitalize">
                  Live Stream title
                </p>
                <p className="mb-3 font-serif text-gray-800 font-medium text-2xl capitalize">
                  $99
                </p>
              </a>
              <p className="font-sans text-sm text-gray-600 w-full">
                Description Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique fuga, dolorem et impedit ipsa ipsum qui sint nulla
                fugiat exercitationem quas totam aperiam asperiores
                reprehenderit magnam. Nesciunt aut voluptatibus laborum!
              </p>
            </div>
          </div>
        </div>
        <div className=" h-72 bg-slate-200 relative  ">
          <div className="relative h-full">
            <div className="relative overflow-auto h-full p-4 pb-16">
              <div className="flex space-x-2 justify-end">
                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-600 text-end">Sohye Lee</p>
                  <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-r-0 border-l-8 border-b-8 border-b-white  "></div>
                  <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
                    Hi how much are you selling them for?
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-300" />
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-300" />
                <div>
                  <p className="text-sm text-gray-600 ">Sohye Lee</p>
                  <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-l-0 border-r-8 border-b-8 border-b-white"></div>
                  <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
                    $200
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 justify-end">
                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-600 text-end">Sohye Lee</p>
                  <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-r-0 border-l-8 border-b-8 border-b-white  "></div>
                  <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
                    Hi how much are you selling them for?
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-300" />
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-300" />
                <div>
                  <p className="text-sm text-gray-600 ">Sohye Lee</p>
                  <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-l-0 border-r-8 border-b-8 border-b-white"></div>
                  <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
                    $200
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 justify-end">
                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-600 text-end">Sohye Lee</p>
                  <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-r-0 border-l-8 border-b-8 border-b-white  "></div>
                  <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
                    Hi how much are you selling them for?
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-300" />
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-300" />
                <div>
                  <p className="text-sm text-gray-600 ">Sohye Lee</p>
                  <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-l-0 border-r-8 border-b-8 border-b-white"></div>
                  <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
                    $200
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 justify-end">
                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-600 text-end">Sohye Lee</p>
                  <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-r-0 border-l-8 border-b-8 border-b-white  "></div>
                  <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
                    Hi how much are you selling them for?
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-300" />
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-300" />
                <div>
                  <p className="text-sm text-gray-600 ">Sohye Lee</p>
                  <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-l-0 border-r-8 border-b-8 border-b-white"></div>
                  <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
                    $200
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 justify-end">
                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-600 text-end">Sohye Lee</p>
                  <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-r-0 border-l-8 border-b-8 border-b-white  "></div>
                  <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
                    Hi how much are you selling them for?
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-300" />
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-300" />
                <div>
                  <p className="text-sm text-gray-600 ">Sohye Lee</p>
                  <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-l-0 border-r-8 border-b-8 border-b-white"></div>
                  <p className="text-md font-serif text-gray-900 px-3 py-2 bg-white mt-0">
                    $200
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <div className="flex w-full items-center relative">
              <Input type="text" label="" name="" />
              <Button
                large={false}
                filled={true}
                text="&rarr;"
                addClass="absolute right-[1px] bottom-[1px] p-4 h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiveDetail;

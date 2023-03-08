import type { NextPage } from 'next';

const ChatDetail: NextPage = () => {
  return (
    <div className="relative px-4 bg-slate-200 max-w-md mx-auto pt-16 pb-32 flex flex-col divide-y-[1px] min-h-full overflow-y-scroll space-y-3">
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

      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex w-full items-center relative">
          <input
            type="text"
            className="w-full mb-[1px] mx-[1px] focus:ring-1 -focus:ring-offset-1 focus:ring-purple-600 outline-none"
          />
          <div className="absolute right-0 top-0 h-full p-4 bg-black text-white flex items-center justify-center hover:bg-gray-800">
            <span>&rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;

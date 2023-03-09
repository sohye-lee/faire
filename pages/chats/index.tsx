import type { NextPage } from 'next';

const Chats: NextPage = () => {
  return (
    <div className="max-w-md mx-auto py-16 flex flex-col divide-y-[1px] min-h-full overflow-y-scroll">
      {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
        <div key={i} className="flex space-x-3 py-3 px-4">
          <div className="h-10 w-10 rounded-full bg-purple-300" />
          <div>
            <p className="font-sm font-sans text-sm text-gray-500">Sohye Lee</p>
            {/* <div className="mb-0 w-2 h-0 mt-0 border-transparent border-t-0 border-l-0 border-r-8 border-b-8 border-b-white"></div> */}
            <p className="text-md font-serif text-gray-900 mt-1">
              Great, thank you!
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;

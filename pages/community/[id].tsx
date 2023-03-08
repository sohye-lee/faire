import type { NextPage } from 'next';

const CommunitPostDetail: NextPage = () => {
  return (
    <div className="max-w-md mx-auto py-16 flex flex-col space-y-5">
      <div className="flex px-4 mb-3 items-center space-x-3 py-3 border-t border-b cursor-pointer">
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
      <div className="px-4">
        <span className="inline-block py-0-5 px-2 bg-purple-200 text-gray-600 text-sm">
          Question
        </span>
        <span className="block font-serif font-medium text-lg mt-3">
          <span className="text-2xl font-bold text-purple-600">Q.</span> What is
          the best mandu restaurant?
        </span>
      </div>
      <div className="px-4 border-top border-t border-b-2 border-bottom border-gray-300 pt-4 pb-6 flex items-center text-gray-800 space-x-5 text-md">
        <span className="flex items-center space-x-2 hover:text-purple-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12l-4-4-4 4M12 16V9" />
          </svg>
          <span>Upvote 1</span>
        </span>
        <span className="flex items-center space-x-2 hover:text-purple-600">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <span>Answer 1</span>
        </span>
      </div>
      <div className="px-4">
        <div className="flex space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-200" />
          <div>
            <span className="text-sm block font-serif font-medium text-gray-800">
              Sohye Lee
            </span>
            <span className="text-xs font-sans text-gray-600 block">
              2 hr ago
            </span>
            <p className="text-md font-sans text-gray-900 mt-2">
              The best experience ever!
            </p>
          </div>
        </div>
      </div>
      <div className="px-4">
        <textarea
          rows={4}
          className="w-full focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400 focus:ring-offset-2"
          placeholder="Leave your answer"
        />
        <button className="bg-black capitalize text-white text-sm flex items-center justify-center transition hover:bg-gray-800 border border-black w-full py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500">
          Reply
        </button>
      </div>
    </div>
  );
};

export default CommunitPostDetail;

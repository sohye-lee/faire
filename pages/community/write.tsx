import type { NextPage } from 'next';

const Write: NextPage = () => {
  return (
    <div className="max-w-md mx-auto py-16 flex flex-col space-y-2">
      <textarea
        rows={4}
        className="w-full focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400 focus:ring-offset-2"
        placeholder="Ask a question"
      />
      <button className="bg-black capitalize text-white text-sm flex items-center justify-center transition hover:bg-gray-800 border border-black w-full py-3 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500">
        Submit
      </button>
    </div>
  );
};

export default Write;

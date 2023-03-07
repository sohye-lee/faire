import type { NextPage } from 'next';

const Upload: NextPage = () => {
  return (
    <div className=" max-w-md mx-auto py-16 flex flex-col space-y-5">
      <div>
        <label className="flex hover:text-purple-600 transition hover:border-purple-300 hover:bg-slate-100 justify-center items-center py-5 w-full border border-black border-dashed">
          <svg
            className="h-12 w-12"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input className="hidden" type="file" />
        </label>
      </div>
      <div>
        <label className="text-lg mb-2 font-serif font-medium">Price</label>
        <div className="flex items-center">
          <div className="mr-2">
            <span className="text-lg font-serif font-medium">$</span>
          </div>
          <input type="text" placeholder="0.00" className="w-full" />
          <div className="ml-2">
            <span className="text-lg font-serif font-medium">USD</span>
          </div>
        </div>
      </div>
      <div>
        <label className="text-lg mb-2 font-serif font-medium">
          Description
        </label>
        <div>
          <textarea rows={4} className="w-full" />
        </div>
      </div>
      <button>Upload product</button>
    </div>
  );
};

export default Upload;

import type { NextPage } from 'next';
import Button from '../../components/button';
import Layout from '../../components/layout';

const CreateLive: NextPage = () => {
  return (
    <Layout title={'Create Your Live'} hasTabBar={false} canGoBack={true}>
      <div className="flex flex-col space-y-3 px-4">
        <div>
          <label
            htmlFor="price"
            className="text-lg mb-2 font-serif font-medium"
          >
            Title
          </label>
          <div className="flex items-center relative">
            <input
              id="price"
              type="text"
              placeholder="0.00"
              className="w-full px-3 focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="text-lg mb-2 font-serif font-medium"
          >
            Price
          </label>
          <div className="flex items-center relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <span className="text-lg font-serif font-medium">$</span>
            </div>
            <input
              id="price"
              type="text"
              placeholder="0.00"
              className="w-full px-6 focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <span className="text-lg font-serif font-medium">USD</span>
            </div>
          </div>
        </div>
        <div>
          <label className="text-lg mb-2 font-serif font-medium">
            Description
          </label>
          <div>
            <textarea
              rows={4}
              className="w-full focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <Button large={true} filled={true} text="Create Live" />
      </div>
    </Layout>
  );
};

export default CreateLive;

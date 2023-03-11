import type { NextPage } from 'next';
import Button from '../../components/button';
import Layout from '../../components/layout';

const Write: NextPage = () => {
  return (
    <Layout title={'Write'} hasTabBar={false} canGoBack={true}>
      <div className="flex flex-col space-y-2 px-4">
        <textarea
          rows={4}
          className="w-full focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400 focus:ring-offset-2"
          placeholder="Ask a question"
        />
        <Button large={true} filled={true} text="Submit" />
      </div>
    </Layout>
  );
};

export default Write;

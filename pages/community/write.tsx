import type { NextPage } from 'next';
import Button from '../../components/button';
import Input from '../../components/input';
import Layout from '../../components/layout';

const Write: NextPage = () => {
  return (
    <Layout title={'Write'} hasTabBar={false} canGoBack={true}>
      <div className="flex flex-col space-y-2 px-4">
        <Input label="" type="textarea" placeholder="Ask a question" name="" />
        <Button large={true} filled={true} text="Submit" />
      </div>
    </Layout>
  );
};

export default Write;

import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';

const CreateLive: NextPage = () => {
  return (
    <Layout title={'Create Your Live'} hasTabBar={false} canGoBack={true}>
      <div className="flex flex-col space-y-3 px-4">
        <Input type="text" placeholder="live title" name="name" label="Title" />
        <Input type="price" placeholder="0.00" name="price" label="Price" />
        <Input type="textarea" label="Description" name="description" />

        <Button large={true} filled={true} text="Create Live" />
      </div>
    </Layout>
  );
};

export default CreateLive;

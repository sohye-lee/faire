import type { NextPage } from 'next';
import Image from 'next/image';
import Button from '../../components/button';
import Input from '../../components/input';
import Layout from '../../components/layout';
import Message from '../../components/message';

const ChatDetail: NextPage = () => {
  return (
    <Layout title={'Chat 1'} hasTabBar={false} canGoBack={true}>
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 px-4 max-w-2xl bg-slate-200 w-full min-h-screen pt-20 pb-10 flex flex-col overflow-y-scroll space-y-3">
        <Message
          reversed={false}
          message="Hi, how are you?"
          avatarUrl="/images/avatar-1.jpg"
        />
        <Message
          reversed={true}
          message="Hi, good morning!"
          avatarUrl="/images/avatar-2.jpg"
        />
        <Message
          reversed={false}
          message="How much is it?"
          avatarUrl="/images/avatar-1.jpg"
        />
        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex w-full items-center relative">
            <Input name="chat" label="" type="text" />
            <Button
              addClass="absolute right-[1px] bottom-0 h-full px-4"
              large={false}
              filled={true}
              text={'&rarr;'}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;

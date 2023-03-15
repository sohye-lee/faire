import type { NextPage } from 'next';
import Link from 'next/link';
import FloatButton from '../../components/floatButton';
import Layout from '../../components/layout';
import { RiAddLine } from 'react-icons/ri';

const Chats: NextPage = () => {
  return (
    <Layout title={'Chats'} hasTabBar={true} canGoBack={false}>
      <div className="flex flex-col divide-y-[1px] min-h-screen overflow-y-scroll">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <Link href={`/chats/${i}`} key={i}>
            <div className="flex space-x-3 py-3 px-4 items-center cursor-pointer hover:bg-slate-100 transition">
              <div className="h-10 w-10 rounded-full bg-purple-300" />
              <div>
                <p className="font-sm font-sans text-sm text-gray-500">
                  Sohye Lee
                </p>
                <p className="text-md font-serif text-gray-900">
                  Great, thank you!
                </p>
              </div>
            </div>
          </Link>
        ))}
        <FloatButton href="/chats/create">
          <RiAddLine />
        </FloatButton>
      </div>
    </Layout>
  );
};

export default Chats;

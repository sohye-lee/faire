import type { NextPage } from 'next';
import Link from 'next/link';
import {
  RiHeart2Line,
  RiHeart3Line,
  RiHeart2Fill,
  RiAddLine,
  RiChat2Line,
  RiChat3Line,
} from 'react-icons/ri';
import FloatButton from '../components/floatButton';
import Item from '../components/item';
import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout hasTabBar={true} title="Home">
      <div className="grid grid-cols-2 gap-2  items-stretch w-full px-4">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <Item
            key={i}
            id={i}
            title="title"
            description="description in details"
            comments={i * 3}
            liked={i}
            price={99.0}
          />
        ))}
        <FloatButton href="/items/upload">
          <RiAddLine color="white" />
        </FloatButton>
      </div>
    </Layout>
  );
};

export default Home;

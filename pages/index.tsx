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
import FloatButton from '@components/floatButton';
import Item from '@components/item';
import Layout from '@components/layout';
import useUser from '@libs/client/useUser';
import useSWR from 'swr';
import { Product } from '@prisma/client';

interface ProductsResponse {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>('/api/products');
  console.log(data?.products);
  return (
    <Layout hasTabBar={true} title="Home">
      <div className="grid grid-cols-2 gap-2  items-stretch w-full px-4">
        {data?.products.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            comments={3}
            liked={2}
            price={product.price}
          />
        ))}
        <FloatButton href="/products/upload">
          <RiAddLine color="white" />
        </FloatButton>
      </div>
    </Layout>
  );
};

export default Home;

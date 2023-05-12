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
import { Category, Product, Record } from '@prisma/client';
import Loading from '@components/loading';
import useCoords from '@libs/client/useCoords';

interface ProductWithExtended extends Product {
  records: Record[];
  category: Category;
  _count: {
    favorites: number;
    records: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithExtended[];
}

const Home: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const { data } = useSWR<ProductsResponse>(
    latitude && longitude
      ? `/api/products?latitude=${latitude}&longitude=${longitude}`
      : null
  );
  return (
    <Layout hasTabBar={true} title="Home">
      <div
        className={`grid ${
          data ? 'grid-cols-2' : 'grid-cols-1'
        } gap-2  items-stretch w-full px-4`}
      >
        {data ? (
          data?.products?.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              comments={3}
              imageIds={product.imageIds || ''}
              favorites={
                product.records.filter((r) => r.type == 'Favorite').length
              }
              price={product.price}
              category={product.category}
              condition={product.condition}
              color={product.color || ''}
            />
          ))
        ) : (
          <Loading />
        )}
        <FloatButton href="/products/upload">
          <RiAddLine color="white" />
        </FloatButton>
      </div>
    </Layout>
  );
};

export default Home;

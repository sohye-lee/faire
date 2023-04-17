import type { NextPage } from 'next';
import Link from 'next/link';
import {
  RiHeart2Line,
  RiHeart2Fill,
  RiAddLine,
  RiChat2Line,
  RiHeart3Line,
  RiChat3Line,
} from 'react-icons/ri';
import Layout from '../../components/layout';
import useSWR from 'swr';
import { Product, Record } from '@prisma/client';

interface ProductWithCount extends Product {
  _count: {
    favorites: number;
  };
}

interface RecordWithProduct extends Record {
  product: ProductWithCount;
}

interface FavoritesResponse {
  ok: true;
  records: RecordWithProduct[];
}

const Liked: NextPage = () => {
  const { data } = useSWR<FavoritesResponse>(
    '/api/users/me/records?type=Favorite'
  );
  return (
    <Layout title={'You Liked'} hasTabBar={false} canGoBack={true}>
      <div className=" flex flex-col divide-y">
        {data?.records?.map((favorite) => (
          <div
            key={favorite.id}
            className="px-4 py-3 flex justify-between items-center"
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="w-24 aspect-square bg-purple-100"></div>
              <div className=" w-full flex-column ">
                <Link
                  href={`/products/${favorite?.product?.id}`}
                  className="w-full"
                >
                  <a className="font-serif font-bold text-md capitalize w-full ">
                    {favorite?.product?.name}
                  </a>
                </Link>

                <div className=" flex items-center justify-between w-full mt-2 ">
                  <p className="font-serif text-md">
                    ${favorite?.product?.price}
                  </p>
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-1">
                      <RiHeart3Line className="" width="24" height="24" />
                      <span>{favorite?.product?._count.favorites}</span>
                    </button>
                    <button className="flex items-center space-x-1">
                      <RiChat3Line className="" width="24" height="24" />
                      <span>3</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Liked;

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

interface PurchasesResponse {
  ok: boolean;
  records: RecordWithProduct[];
}

const Purchased: NextPage = () => {
  const { data } = useSWR<PurchasesResponse>(
    '/api/users/me/records?type=Purchase'
  );
  return (
    <Layout title={'You Purchased'} hasTabBar={false} canGoBack={true}>
      <div className=" flex flex-col divide-y">
        {data?.records?.map((purchase) => (
          <div
            key={purchase?.id}
            className="px-4 py-3 flex justify-between items-center"
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="w-24 aspect-square bg-purple-100"></div>
              <div className=" w-full flex-column ">
                <Link
                  href={`/items/${purchase?.product?.id}`}
                  className="w-full"
                >
                  <a className="font-serif font-bold text-md capitalize w-full ">
                    {purchase?.product?.name}
                  </a>
                </Link>

                <div className=" flex items-center justify-between w-full mt-2 ">
                  <p className="font-serif text-md">
                    ${purchase?.product?.price}
                  </p>
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-1">
                      <span>{purchase?.product?.createdAt.toUTCString()}</span>
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

export default Purchased;

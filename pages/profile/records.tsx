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
import { useRouter } from 'next/router';

interface ProductWithRecords extends Product {
  records: Record[];
}

interface RecordWithProduct extends Record {
  product: ProductWithRecords;
}

interface FavoritesResponse {
  ok: true;
  records: RecordWithProduct[];
}

const Liked: NextPage = () => {
  const router = useRouter();
  const { type } = router.query;
  const { data } = useSWR<FavoritesResponse>(
    `/api/users/me/records?type=${type}`
  );
  let title = '';
  switch (type) {
    case 'Favorite':
      title = 'You liked';
    case 'Purchase':
      title = 'You purchased';
    case 'Sale':
      title = 'You sold';
  }
  return (
    <Layout title={title} hasTabBar={false} canGoBack={true}>
      <div className=" flex flex-col divide-y">
        {data?.records?.map((record) => (
          <div
            key={record.id}
            className="px-4 py-3 flex justify-between items-center"
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="w-24 aspect-square bg-purple-100"></div>
              <div className=" w-full flex-column ">
                <Link
                  href={`/products/${record?.product?.id}`}
                  className="w-full"
                >
                  <a className="font-serif font-bold text-md capitalize w-full ">
                    {record?.product?.name}
                  </a>
                </Link>

                <div className=" flex items-center justify-between w-full mt-2 ">
                  <div className="flex items-center space-x-3">
                    <p className="font-serif text-md">
                      ${record?.product?.price}
                    </p>
                    <span className="flex items-center text-sm text-gray-600">
                      <RiHeart3Line className="" width="24" height="24" />
                      <span className="ml-1">
                        {
                          record?.product?.records.filter(
                            (r) => r.toString() == 'Favorite'
                          ).length
                        }
                      </span>
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {new Date(record?.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
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

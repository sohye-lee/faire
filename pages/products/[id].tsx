import React from 'react';
import type { NextPage } from 'next';
import Layout from '@components/layout';
import Button from '@components/button';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Loading from '@components/loading';
import Link from 'next/link';
import { Category, Product, Record, User } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import Avatar from '@components/avatar';
import Slider from '@components/slider';
import { getColorNameByHex } from '@libs/client/myFuncs';

interface ProductExtended extends Product {
  user: User;
  records: Record;
  category?: Category;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductExtended;
  relatedProducts: Product[];
  isFavorited: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  const [toggleFavorite] = useMutation(
    `/api/products/${router.query.id}/favorite`
  );
  const onFavoriteClick = () => {
    toggleFavorite({});
    if (!data) return;
    mutate({ ...data, isFavorited: !data?.isFavorited }, false);
  };

  console.log('imageId is ', data?.product?.imageIds);

  return (
    <>
      {data ? (
        <Layout hasTabBar={false} canGoBack={true}>
          <div className="px-4">
            <div>
              <div className="aspect-square w-full">
                <Slider
                  imageIds={
                    data?.product?.imageIds ? data?.product?.imageIds : '[]'
                  }
                />
              </div>
              {/* <div
                className="aspect-square bg-slate-300 bg-center bg-cover"
                style={{
                  backgroundImage: `url(${
                    data?.product?.images ? data?.product?.images[0] : null
                  })`,
                }}
              /> */}
              <div className="flex items-center space-x-3 py-3 border-t border-b cursor-pointer">
                <Avatar
                  size={10}
                  name={data?.product?.user?.name!}
                  imageUrl={data?.product?.user?.avatarUrl!}
                />
                <div>
                  <p className="font-medium font-serif text-sm text-gray-700">
                    {data?.product?.user?.name}
                  </p>
                  <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                    <a className="text-xs font-medium font-sans text-gray-700">
                      View profile &rarr;
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mt-10">
                <h1 className="text-3xl font-serif font-medium">
                  {data?.product?.name}
                </h1>
                <p className="text-3xl font-serif">${data?.product?.price}</p>
                <p className="text-md text-gray-700 mt-1">
                  {data?.product?.condition}
                </p>
                <p className="text-md text-gray-700">
                  {data?.product?.category?.name}
                </p>
                <p className="text-md text-gray-700">
                  {getColorNameByHex(data?.product?.color || '')}
                </p>
                <p className="my-3 text-sm text-gray-700">
                  {data?.product?.description}
                </p>
                <div className="flex items-stretch space-x-2">
                  <Button large={true} filled={true} text="Talk To Seller" />
                  <Button
                    onClick={onFavoriteClick}
                    large={false}
                    // filled={data?.isFavorited ? true : false}
                    addClass={`h-full p-3 ${
                      data?.isFavorited ? 'bg-purple-600 border-purple-600' : ''
                    }`}
                    text=""
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={data?.isFavorited ? 'rgb(147 51 234)' : 'black'}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        fill={data?.isFavorited ? 'white' : 'none'}
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <h2 className="font-serif text-gray-900 text-2xl capitalize">
                Similar items
              </h2>
              <div className="py-5 flex gap-2 overflow-scroll">
                {data?.relatedProducts?.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <a>
                      <div className="bg-slate-300 w-80 h-80">
                        <Slider imageIds={product.imageIds || ''} />
                      </div>
                      <h3 className="text-md font-serif text-gray-700">
                        {product.name}
                      </h3>
                      <p className="text-md font-sans text-gray-700">
                        ${product.price}
                      </p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ItemDetail;

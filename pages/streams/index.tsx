import type { NextPage } from 'next';
import Link from 'next/link';
import {
  RiAddLine,
  RiVideoAddLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from 'react-icons/ri';
import FloatButton from '@components/floatButton';
import Layout from '@components/layout';
import useSWR from 'swr';
import { Stream, User } from '@prisma/client';
import Loading from '@components/loading';
import { dateTimeToString, dateToString } from '@libs/client/myFuncs';
import { useEffect, useState } from 'react';

interface StreamWithUser extends Stream {
  user: User;
}
interface SreamResponse {
  ok: boolean;
  streams: StreamWithUser[];
  pageCount: number;
}

const Live: NextPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSWR<SreamResponse>(
    `/api/streams?page=${page}`
  );
  const allPages: number = data?.pageCount || 0;
  const [pageGroup, setPageGroup] = useState(1);
  useEffect(() => {
    console.log(`new page : ${page}, pageGroup: ${pageGroup}`);
  }, [page, pageGroup]);
  return (
    <Layout title={'Live'} hasTabBar={true} canGoBack={false}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative">
          <div className="flex flex-col divide-y">
            {data?.streams.map((stream) => (
              <div key={stream.id} className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-slate-300 w-full aspect-video"></div>
                  <div className="w-full">
                    <div className="w-full">
                      <Link href={`/streams/${stream.id}`}>
                        <a>
                          <p className="font-serif font-bold text-md capitalize">
                            {stream?.name}
                          </p>
                        </a>
                      </Link>
                      <p className="font-sans text-sm font-light text-gray-600 w-full">
                        {stream?.description.substring(1, 120)}{' '}
                        {stream?.description.length > 120 ? (
                          <span>...</span>
                        ) : null}
                      </p>
                      <p className="text-xs text-gray-600 mt-3">
                        {stream?.user.name} |{' '}
                        {dateTimeToString(stream?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center pt-4">
              <button
                onClick={() =>
                  pageGroup > 1 ? setPageGroup(pageGroup - 1) : setPageGroup(1)
                }
              >
                <RiArrowLeftLine />
              </button>
              {Array.from(Array(allPages).keys())
                .slice((pageGroup - 1) * 10, pageGroup * 10)
                .map((a) => (
                  <span
                    onClick={() => {
                      setPage(a + 1);
                      console.log(a + 1);
                    }}
                    className={` cursor-pointer text-gray-600 hover:text-purple-600 hover:bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center ${
                      a + 1 === page ? 'bg-purple-400 text-white' : null
                    }`}
                    key={a}
                  >
                    {a + 1}
                  </span>
                ))}
              <button
                onClick={() => {
                  setPageGroup(pageGroup + 1);
                  console.log(pageGroup + 1);
                }}
              >
                <RiArrowRightLine />
              </button>
            </div>
          </div>
          <FloatButton href="/streams/create">
            <RiVideoAddLine width="40" height="40" color="white" />
          </FloatButton>
        </div>
      )}
    </Layout>
  );
};

export default Live;

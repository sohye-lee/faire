import type { NextPage } from 'next';
import Link from 'next/link';
import { RiAddLine, RiVideoAddLine } from 'react-icons/ri';
import FloatButton from '@components/floatButton';
import Layout from '@components/layout';
import useSWR from 'swr';
import { Stream, User } from '@prisma/client';
import Loading from '@components/loading';
import { dateTimeToString, dateToString } from '@libs/client/myFuncs';

interface StreamWithUser extends Stream {
  user: User;
}
interface SreamResponse {
  ok: boolean;
  streams: StreamWithUser[];
}

const Live: NextPage = () => {
  const { data, isLoading } = useSWR<SreamResponse>('/api/streams');

  return (
    <Layout title={'Live'} hasTabBar={true} canGoBack={false}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative">
          <div className="flex flex-col divide-y">
            {data?.streams
              .sort(
                (a, b) =>
                  new Date(b.createdAt).valueOf() -
                  new Date(a.createdAt).valueOf()
              )
              .map((stream) => (
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

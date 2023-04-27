import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '@components/button';
import FloatButton from '@components/floatButton';
import Layout from '@components/layout';
import useMutation from '@libs/client/useMutation';
import { Post, User } from '@prisma/client';
import useSWR from 'swr';
import useCoords from '@libs/client/useCoords';
import { dateTimeToString } from '@libs/client/myFuncs';

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    votes: number;
  };
}
interface PostResponse {
  ok: boolean;
  posts: PostWithUser[];
}

const Community: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const { data } = useSWR<PostResponse>(
    latitude && longitude
      ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
      : null
  );
  return (
    <Layout title={'Community'} hasTabBar={true} canGoBack={false}>
      <div className="flex flex-col space-y-5">
        {data?.posts?.map((post) => (
          <div key={post?.id}>
            <div className="px-4">
              <span className="inline-block py-0-5 px-2 bg-purple-200 text-gray-600 text-sm">
                Question
              </span>
              <Link href={`/community/${post?.id}`}>
                <span className="block font-serif font-medium text-lg mt-3 cursor-pointer">
                  <span className="text-2xl font-bold text-purple-600">Q.</span>{' '}
                  {post?.question}
                </span>
              </Link>
              <div className="w-full flex justify-end text-gray-500 text-sm font-sans mt-3">
                <span className="mr-2">{post?.user.name}</span> |
                <span className="ml-2">
                  {dateTimeToString(post?.createdAt!)}
                </span>
              </div>

              <Link href={`/community/${post?.id}`}>
                <a className="w-full flex justify-end mt-2 mb-3 cursor-pointer ">
                  <span className="underline text-xs borde text-purple-500">
                    Read More
                  </span>
                </a>
              </Link>
            </div>

            <div className="border-top border-t border-b-2 border-bottom border-gray-300 pt-4 pb-6 flex items-center text-gray-800 space-x-5 text-md px-4">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 12l-4-4-4 4M12 16V9" />
                </svg>
                <span>Upvote {post?._count?.votes}</span>
              </span>
              <span className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span>Answer {post?._count?.answers}</span>
              </span>
            </div>
          </div>
        ))}
        <FloatButton href="/community/write">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatButton>
      </div>
    </Layout>
  );
};

export default Community;

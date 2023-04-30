import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../components/layout';
import useSWR from 'swr';
import useUser from '@libs/client/useUser';
import { Review, User } from '@prisma/client';
import Rating from '@components/rating';
import Avatar from '@components/avatar';

interface Rating {
  num: number;
}
interface ReviewExtended extends Review {
  createdBy: User;
}
interface ReviewResponse {
  ok: boolean;
  reviews: ReviewExtended[];
}
const Profile: NextPage = () => {
  const { data } = useSWR<ReviewResponse>(`/api/reviews`);
  const { user } = useUser();

  return (
    <Layout title={'Profile'} hasTabBar={true} canGoBack={false}>
      <div className="flex flex-col space-y-4 px-4">
        <div className="flex px-4 items-center space-x-3 pt-3 pb-4 border-b cursor-pointer">
          <Avatar size={16} name={user?.name!} imageUrl={user?.avatarUrl!} />
          {/* <div
            className="h-16 w-16 rounded-full bg-slate-200 bg-center bg-cover"
            style={{ backgroundImage: `url(${user?.avatarUrl})` }}
          /> */}
          <div>
            <p className="font-medium font-serif text-lg text-gray-700">
              {user?.name}
            </p>
            <Link href="/profile/edit">
              <p className="text-xs font-medium font-sans text-gray-500 hover:text-purple-500">
                Edit profile &rarr;
              </p>
            </Link>
          </div>
        </div>
        <div className="flex justify-between px-4">
          <Link href="/profile/records?type=Sale">
            <div className="flex flex-col items-center space-y-1">
              <div className="hover:bg-gray-800 hover:ring-1 hover:ring-offset-1 hover:ring-purple-600 w-16 h-16 flex items-center justify-center bg-black text-white rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <span className="font-serif">Sold</span>
            </div>
          </Link>
          <Link href="/profile/records?type=Purchase">
            <div className="flex flex-col items-center space-y-1">
              <div className="hover:bg-gray-800 hover:ring-1 hover:ring-offset-1 hover:ring-purple-600 w-16 h-16 flex items-center justify-center bg-black text-white rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <span className="font-serif">Purchases</span>
            </div>
          </Link>
          <Link href="/profile/records?type=Favorite">
            <div className="flex flex-col items-center space-y-1">
              <div className="hover:bg-gray-800 hover:ring-1 hover:ring-offset-1 hover:ring-purple-600 w-16 h-16 flex items-center justify-center bg-black text-white rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <span className="font-serif">Liked</span>
            </div>
          </Link>
        </div>
        {data?.reviews?.map((review) => (
          <div className="px-4 mt-3 border-t py-3" key={review.id}>
            <div className="flex space-x-2 items-center">
              <div className="w-8 h-8 bg-purple-200 rounded-full" />
              <div className="">
                <h4 className="font-serif text-sm text-gray-700 px-1">
                  {review?.createdBy?.name}
                </h4>
                <Rating rating={review?.score} />
              </div>
            </div>
            <div className="mt-2">
              <p className="font-sans text-gray-800 text-md">
                {review?.review}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Profile;

import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Answer, Post, User } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Loading from '@components/loading';

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostExtended extends Post {
  user: User;
  answers: AnswerWithUser[];
  _count: {
    answers: number;
    votes: number;
  };
}

interface CommunitPostDetailResponse {
  ok: boolean;
  post: PostExtended;
  isVoted: boolean;
}

interface AnswerForm {
  content: string;
}

interface WriteAnswerResponse {
  ok: boolean;
  answer: Answer;
}

const CommunitPostDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR<CommunitPostDetailResponse>(
    `/api/posts/${id}`
  );
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const [answer, { loading: answerLoading, data: answerData }] =
    useMutation<WriteAnswerResponse>(`/api/posts/${id}/answers`);
  const onValid = (data: AnswerForm) => {
    if (answerLoading) return;
    answer(data);
  };
  const [toggleVote, { loading }] = useMutation(`/api/posts/${id}/vote`);
  const onVoteClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            votes: !data.isVoted
              ? data.post._count.votes + 1
              : data.post._count.votes - 1,
          },
        },
        isVoted: !data?.isVoted,
      },
      false
    );
    if (!loading) {
      toggleVote({});
    }
  };
  useEffect(() => {
    if (answerData && answerData?.ok) {
      reset();
      mutate();
    }
  }, [answerData, reset, mutate]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout title={data?.post?.question} hasTabBar={false} canGoBack={true}>
          <div className="flex flex-col space-y-5">
            <div className="flex px-4 mb-3 items-center space-x-3 pt-3 pb-4 border-b cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div>
                <p className="font-medium font-serif text-sm text-gray-700">
                  {data?.post?.user?.name}
                </p>
                <Link href={`/profiles/${data?.post?.user?.id}`}>
                  <a className="text-xs font-medium font-sans text-gray-700">
                    View profile &rarr;
                  </a>
                </Link>
              </div>
            </div>
            <div className="px-4">
              <span className="inline-block py-0-5 px-2 bg-purple-200 text-gray-600 text-sm">
                Question
              </span>
              <span className="block font-serif font-medium text-lg mt-3">
                <span className="text-2xl font-bold text-purple-600">Q. </span>
                {data?.post?.question}
              </span>
            </div>
            <div className="px-4 border-top border-t border-b-2 border-bottom border-gray-300 pt-4 pb-6 flex items-center text-gray-800 space-x-5 text-md">
              <span
                className={`flex items-center space-x-2 hover:text-purple-300 cursor-pointer ${
                  data?.isVoted ? 'text-purple-600' : null
                }`}
                onClick={onVoteClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={data?.isVoted ? '#9333EA' : '#000000'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 12l-4-4-4 4M12 16V9" />
                </svg>
                <span>Upvote {data?.post?._count.votes}</span>
              </span>
              <span className="flex items-center space-x-2 hover:text-purple-600">
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
                <span>Answer {data?.post?._count.answers}</span>
              </span>
            </div>
            <div className="px-4">
              {data?.post?.answers.map((answer) => (
                <div
                  className="flex space-x-2 py-2 border-b last:border-none"
                  key={answer.id}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200" />
                  <div>
                    <span className="text-sm block font-serif font-medium text-gray-800">
                      {answer.user.name}
                    </span>
                    <span className="text-xs font-sans text-gray-600 block">
                      {answer?.createdAt?.toString()}
                    </span>
                    <p className="text-md font-sans text-gray-900 mt-2">
                      {answer.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit(onValid)} className="px-4 space-y-3">
              <Input
                type="textarea"
                placeholder="Answer this question"
                label=""
                name="content"
                register={register('content')}
              />
              <Button
                addClass=""
                large={true}
                filled={true}
                text={answerLoading ? 'Loading····' : 'Reply'}
              />
            </form>
          </div>
        </Layout>
      )}
    </>
  );
};

export default CommunitPostDetail;

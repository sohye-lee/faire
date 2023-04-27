import type { NextPage } from 'next';
import Link from 'next/link';
import { RiAddLine, RiVideoAddLine } from 'react-icons/ri';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Message, Stream, User } from '@prisma/client';
import Loading from '@components/loading';
import { dateTimeToString } from '@libs/client/myFuncs';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect, useRef } from 'react';
import MessageText from '@components/message';
import useUser from '@libs/client/useUser';

interface MessageWithUser extends Message {
  user: {
    id: number;
    name: string;
    avatarUrl?: string;
  };
}
interface StreamExtended extends Stream {
  user: User;
  messages: MessageWithUser[];
}
interface StreamResponse {
  ok: boolean;
  stream: StreamExtended;
}

interface MessageForm {
  message: string;
}

const LiveDetail: NextPage = () => {
  useRef();
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, mutate } = useSWR<StreamResponse>(
    `/api/streams/${id}`
  );

  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [sendMessage, { data: messageData, loading }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );
  const onValid = (data: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: data.message,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false
    );
    sendMessage(data);
  };

  // useEffect(() => {
  //   if (messageData && messageData?.ok) {
  //     mutate();
  //   }
  // }, [messageData, mutate]);
  return (
    <Layout title={'Live 1'} hasTabBar={false} canGoBack={true}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative flex flex-col divide-y h-screen px-4 space-y-5">
          <div className=" space-y-3">
            <div className="bg-slate-300 w-full aspect-video"></div>
            <div>
              <div className="pb-4">
                <a>
                  <p className="font-serif text-gray-800 font-semibold text-2xl capitalize">
                    {data?.stream?.name}
                  </p>
                  <p className=" font-serif text-gray-800 font-medium text-2xl capitalize">
                    ${data?.stream?.price}
                  </p>
                  <p className="text-xs text-gray-600 mb-4 text-right">
                    {data?.stream?.user.name} |
                    {dateTimeToString(data?.stream?.createdAt!)}
                  </p>
                </a>
                <p className="font-sans text-sm text-gray-600 w-full">
                  {data?.stream?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <div className=" h-72 bg-slate-200 relative">
              <div className="relative h-full">
                <div className="relative overflow-auto h-full p-4 pb-16">
                  {data?.stream?.messages?.map((message) => (
                    <MessageText
                      key={message?.id}
                      name={message?.user?.name}
                      reversed={user?.id === message?.user.id}
                      message={message?.message}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                <form
                  onSubmit={handleSubmit(onValid)}
                  className="flex w-full items-center relative"
                >
                  <Input
                    register={register('message', { required: true })}
                    type="text"
                    label=""
                    name="message"
                    placeholder="Write a message or question"
                  />
                  <Button
                    large={false}
                    filled={true}
                    text="&rarr;"
                    addClass="absolute right-[1px] bottom-[1px] p-4 h-full"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default LiveDetail;

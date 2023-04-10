import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Post } from '@prisma/client';

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const [uploadPost, { loading, data }] =
    useMutation<WriteResponse>('/api/posts');
  const { register, handleSubmit } = useForm<WriteForm>();
  const onValid = (data: WriteForm) => {
    if (loading) return;
    uploadPost(data);
  };
  const router = useRouter();
  useEffect(() => {
    if (data && data?.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout title={'Write'} hasTabBar={false} canGoBack={true}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col space-y-2 px-4"
      >
        <Input
          label=""
          type="textarea"
          placeholder="Ask a question"
          name=""
          register={register('question', { required: true, minLength: 10 })}
        />
        <Button
          large={true}
          filled={true}
          text={loading ? 'Loading···' : 'Submit'}
        />
      </form>
    </Layout>
  );
};

export default Write;

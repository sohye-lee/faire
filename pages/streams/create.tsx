import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import { useForm } from 'react-hook-form';
import { Stream } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface CreateStreamForm {
  name: string;
  description: string;
  price: string;
  image?: string;
  formErrors?: string;
}

interface CreateStreamResponse {
  ok: boolean;
  stream: Stream;
}
const CreateLive: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateStreamForm>();
  const [updateStream, { data, loading }] =
    useMutation<CreateStreamResponse>('/api/streams');
  const onValid = ({ name, description, price }: CreateStreamForm) => {
    if (loading) return;
    if (name === '' || description === '' || price.toString() === '') {
      setError('formErrors', { message: 'All fields are required.' });
    }
    updateStream({ name, description, price });
  };
  useEffect(() => {
    if (data && data?.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);
  return (
    <Layout title={'Create Your Live'} hasTabBar={false} canGoBack={true}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col space-y-3 px-4"
      >
        <Input
          register={register('name', { required: true })}
          type="text"
          placeholder="live title"
          name="name"
          label="Title"
          required
        />
        <Input
          register={register('price', { required: true, valueAsNumber: true })}
          type="price"
          placeholder="0.00"
          name="price"
          label="Price"
          required
        />
        <Input
          register={register('description')}
          type="textarea"
          label="Description"
          name="description"
        />
        {errors?.formErrors ? (
          <span className="text-sm text-purple-500 text-center font-light">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button
          loading={loading}
          large={true}
          filled={true}
          text="Create Live"
        />
      </form>
    </Layout>
  );
};

export default CreateLive;

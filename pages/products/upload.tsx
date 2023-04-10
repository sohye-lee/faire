import { Decimal } from '@prisma/client/runtime';
import type { NextPage } from 'next';
import { FieldErrors, useForm } from 'react-hook-form';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { Product } from '@prisma/client';
import { useRouter } from 'next/router';

interface ProductUploadForm {
  name: string;
  price: number;
  description?: string;
  image?: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}
const Upload: NextPage = () => {
  const router = useRouter();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>('/api/products');
  const { register, handleSubmit } = useForm<ProductUploadForm>();

  const onValid = (data: ProductUploadForm) => {
    if (loading) return;
    uploadProduct(data);
  };
  useEffect(() => {
    if (data?.ok) {
      router.replace(`/products/${data.product.id}`);
    }
  }, [data, router]);
  return (
    <Layout title={'Upload Your Product'} canGoBack>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col space-y-3 px-4"
      >
        <div>
          <label className="flex hover:text-purple-600 transition hover:border-purple-300 hover:bg-slate-100 justify-center items-center h-48 w-full  border border-black border-dashed">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input className="hidden" name="image" type="file" />
          </label>
        </div>
        <Input
          id="name"
          register={register('name')}
          label="Name"
          name="name"
          placeholder="name of the product"
          type="text"
          required
        />
        <Input
          id="price"
          register={register('price')}
          type="price"
          label="Price"
          name="price"
          placeholder="0.00"
          required
        />
        <Input
          id="description"
          register={register('description')}
          type="textarea"
          label="Description"
          name="description"
          placeholder="details of the product"
        />

        <Button
          text={loading ? 'Loading ···' : 'Upload Product'}
          filled={true}
          large={true}
        />
      </form>
    </Layout>
  );
};

export default Upload;

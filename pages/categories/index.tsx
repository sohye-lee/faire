import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import Loading from '@components/loading';
import useMutation from '@libs/client/useMutation';
import { Category, Product } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

interface CategoryWithProducts extends Category {
  products?: Product[];
}

interface CategoriesResponse {
  ok: boolean;
  categories: CategoryWithProducts[];
}

interface UploadCategoryForm {
  name: string;
}
const Categories: NextPage = () => {
  const { data, isLoading } = useSWR<CategoriesResponse>('/api/categories');
  const [createCategory, { data: uploadData, loading }] =
    useMutation('/api/categories');
  const { handleSubmit, register } = useForm<UploadCategoryForm>();
  const router = useRouter();
  const onValid = ({ name }: UploadCategoryForm) => {
    if (loading) return;
    createCategory({ name });
  };
  useEffect(() => {
    if (uploadData) {
      router.reload();
    }
  }, [uploadData]);
  return (
    <Layout hasTabBar={true} canGoBack={false}>
      {data ? (
        <div className="px-4">
          <form
            onSubmit={handleSubmit(onValid)}
            className="flex justify-between items-center w-full items-stretch"
          >
            <Input
              register={register('name')}
              type={'text'}
              placeholder={'Add category'}
              name="name"
              label=""
              
            />
            <Button
              text="Add"
              filled={true}
              large={false}
              loading={loading}
              addClass=" px-3 border border-black"
            />
          </form>

          <table className=" mt-8 w-full">
            <thead className=" border-bottom border-b border-bottom border-gray-200">
              <tr>
                <th className="uppercase w-1/5 pb-3 font-medium text-sm">Id</th>
                <th className="uppercase w-2/5 pb-3 font-medium text-sm">
                  Name
                </th>
                <th className="uppercase w-2/5 pb-3  text-sm font-medium">
                  Products
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data?.categories.map((category) => (
                <tr key={category?.id} className="border-b border-gray-200">
                  <td className="w-1/5 py-1 text-center font-gray-800 text-sm">
                    {category?.id}
                  </td>
                  <td className="w-2/5 py-1 text-center font-gray-800 text-sm ">
                    {category?.name}
                  </td>
                  <td className="w-2/5 py-1 text-center font-gray-800 text-sm">
                    {category?.products?.length}
                  </td>{' '}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default Categories;

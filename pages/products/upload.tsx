import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import useMutation from '@libs/client/useMutation';
import { useEffect, useState } from 'react';
import { Category, Product } from '@prisma/client';
import { useRouter } from 'next/router';
import useCoords from '@libs/client/useCoords';
import useSWR from 'swr';
import { colorList, getConditions } from '@libs/client/myFuncs';

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

interface CategoriesResponse {
  ok: boolean;
  categories: Category[];
}

const Upload: NextPage = () => {
  const router = useRouter();
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>('/api/products');
  const { register, handleSubmit, watch, reset } = useForm<ProductUploadForm>();
  const { latitude, longitude } = useCoords();
  const [categoryId, setCategoryId] = useState('');
  const [color, setColor] = useState('');
  const [condition, setCondition] = useState('');
  const [imageIds, setImageIds] = useState('');

  const photos: Blob[] | any = watch('image');
  const [photoPreview, setPhotoPreview] = useState('');

  const { data: categoriesData } =
    useSWR<CategoriesResponse>('/api/categories');

  useEffect(() => {
    if (photos && photos.length > 0) {
      const file = photos[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photos]);

  const confirmPhotos = () => {
    const imageIdList: string[] = [];

    if (photos) {
      let convertedPhotos = Array.prototype.slice.call(photos);

      // For loop for each photo
      convertedPhotos.map(async (photo: Blob) => {
        const { uploadURL } = await (await fetch('/api/files')).json();
        const imageForm = new FormData();

        // Upload images to Cloudflare -> get image id -> add to the photoids list
        imageForm.append('file', photo);
        await (
          await fetch(uploadURL, {
            method: 'POST',
            body: imageForm,
          })
        )
          .json()
          .then((res) => imageIdList.push(res.result.id))
          .then((res) => setImageIds(JSON.stringify(imageIdList)));
        // imageIdList.push(imageReq.result.id);
        console.log(imageIdList);
      });
    }
  };
  const resetPhotos = () => {
    reset({ image: '' });
  };
  const onValid = async ({ name, price, description }: ProductUploadForm) => {
    if (loading) return;
    uploadProduct({
      name,
      price,
      description,
      latitude,
      longitude,
      imageIds,
      color,
      condition,
      categoryId,
    });
  };

  useEffect(() => {
    if (data && data?.ok) {
      router.replace(`/products/${data?.product.id}`);
    }
  }, [data, router]);

  return (
    <Layout title={'Upload Your Product'} canGoBack>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col space-y-3 px-4"
      >
        <div>
          {photoPreview ? (
            <>
              <div
                className="w-full bg-cover bg-center aspect-square relative"
                style={{ backgroundImage: `url(${photoPreview})` }}
              >
                <div className="absolute right-0 bottom-0 flex items-stretch ">
                  <button
                    className="text-xs p-2 font-serif bg-white border border-gray-800 border-r-0"
                    onClick={() => {
                      resetPhotos();
                      setPhotoPreview('');
                    }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={confirmPhotos}
                    className="text-xs font-serif p-2 bg-white border border-gray-800"
                  >
                    Upload Images
                  </button>
                </div>
              </div>
            </>
          ) : (
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

              <input
                {...register('image')}
                className="hidden"
                name="image"
                type="file"
                accept="image/*"
                multiple
              />
            </label>
          )}
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
        <select
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-3 focus:ring-2 text-sm font-serif focus:ring-purple-500 border border-black"
          defaultValue="default"
          required
        >
          <option disabled value="default">
            Category
          </option>
          {categoriesData?.categories ? (
            categoriesData?.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <option>No categories yet.</option>
          )}
        </select>
        <div className="flex items-stretch">
          <select
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-3 focus:ring-2 text-sm font-serif focus:ring-purple-500 border border-black"
            defaultValue="default"
          >
            <option disabled value="default">
              Color
            </option>
            {colorList.map((color, i) => (
              <option key={i} value={color.hex}>
                {color.color}
              </option>
            ))}
          </select>
          <div
            className="aspect-square w-12 h-10 border border-gray-800 ml-2 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        </div>
        <select
          className="p-3 focus:ring-2 text-sm font-serif focus:ring-purple-500 border border-black"
          onChange={(e) => setCondition(e.target.value)}
          defaultValue="default"
        >
          <option disabled value="default">
            Condition
          </option>
          {getConditions().map((condition, i) => (
            <option key={i} value={condition}>
              {condition}
            </option>
          ))}
        </select>
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

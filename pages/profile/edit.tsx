import type { NextPage } from 'next';
import Button from '../../components/button';
import Input from '../../components/input';
import Layout from '../../components/layout';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useMutation from '@libs/client/useMutation';

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatarUrl?: string;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}
const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.name) setValue('name', user?.name);
    if (user?.email) setValue('email', user?.email);
    if (user?.phone) setValue('phone', user?.phone);
  }, [user, setValue]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const onValid = ({ email, phone, name, avatarUrl }: EditProfileForm) => {
    if (email === '' && phone === '') {
      setError('formErrors', { message: 'Email or Phone is required.' });
    }
    if (name === '') {
      setError('formErrors', { message: 'Name is required.' });
    }
    editProfile({ name, email, phone, avatarUrl });
    console.log(avatarUrl);
  };

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('formErrors', { message: data?.error });
    }
  }, [data, setError]);

  const [avatarPreview, setAvatarPreview] = useState('');
  const avatar = watch('avatarUrl');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout title={'Edit Your Profile'} hasTabBar={false} canGoBack>
      <div className="pt-8">
        <div>
          <div>
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex flex-col items-center space-y-5 py-5"
            >
              <div className="w-full space-y-3">
                <div className="flex space-x-3 items-center pb-3">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      className="h-24 w-24 rounded-full bg-slate-200"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-purple-400 flex items-center justify-center">
                      <span className="text-white font-sans text-5xl capitalize font-thin">
                        {user && user?.name !== '' && user?.name !== 'anonyme'
                          ? user?.name?.substring(0, 1)
                          : null}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-serif text-lg font-medium text-gray-800 mb-1">
                      {user?.name}
                    </p>
                    {/* <p className="font-sans text-sm text-gray-700 mb-3">
                      username
                    </p> */}
                    <div className="cursor-pointer pb-1 px-2 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                      <label className=" text-xs">
                        Change Photo
                        <input
                          {...register('avatarUrl')}
                          id="picture"
                          type="file"
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <Input
                  register={register('name')}
                  label="Name"
                  name="name"
                  type="text"
                  // placeholder={user?.name}
                />
                <Input
                  register={register('email')}
                  label="Email Address"
                  name="email"
                  type="email"
                  // placeholder={user?.email}
                />
                <Input
                  register={register('phone')}
                  label="Phone"
                  name="phone"
                  type="phone"
                  // placeholder={user?.phone}
                />
              </div>
              {errors?.formErrors ? (
                <span className="text-sm text-purple-500 font-light">
                  {errors.formErrors.message}
                </span>
              ) : null}
              <div className="pt-3 w-full">
                <Button
                  loading={loading}
                  text="Save"
                  large={true}
                  filled={true}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;

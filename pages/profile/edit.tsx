import type { NextPage } from 'next';
import Button from '../../components/button';
import Input from '../../components/input';
import Layout from '../../components/layout';

const EditProfile: NextPage = () => {
  return (
    <Layout title={'Edit Your Profile'} hasTabBar={false} canGoBack={true}>
      <div className="">
        <div>
          <h3 className="font-serif text-center text-3xl mb-5">
            Edit Your Profile
          </h3>
          <div>
            <form className="flex flex-col items-center space-y-5 py-5">
              <div className="w-full space-y-3">
                <div className="flex space-x-3 items-center pb-3">
                  <div className="h-24 w-24 rounded-full bg-slate-200" />
                  <div>
                    <p className="font-serif text-md font-medium text-gray-800">
                      Sohye Lee
                    </p>
                    <p className="font-sans text-sm text-gray-700 mb-3">
                      username
                    </p>
                    <div className="cursor-pointer pb-1 px-2 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white">
                      <span className=" text-xs">Change Photo</span>
                    </div>
                  </div>
                </div>
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="id@mail.com"
                />
                <Input label="Phone" name="phone" type="phone" placeholder="" />
              </div>
              <Button text="Save" large={true} filled={true} />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;

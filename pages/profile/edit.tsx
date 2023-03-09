import type { NextPage } from 'next';

const EditProfile: NextPage = () => {
  return (
    <div className="max-w-md mx-auto py-16 ">
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
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="font-medium text-lg font-serif"
                >
                  email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="id@mail.com"
                  required
                  className="w-full p-3 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="phone"
                  className="font-medium text-lg font-serif"
                >
                  phone
                </label>
                <div className="flex items-stretch">
                  <span className="p-3 text-center border border-gray-500 bg-slate-100 border-r-0">
                    +1
                  </span>
                  <input
                    id="phone"
                    type="text"
                    placeholder="xxx-xxx-xxxx"
                    required
                    className="w-full ml-0 p-3 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
            <button className="w-full bg-black py-3 hover:bg-purple-500 transition-all text-white capitalize">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

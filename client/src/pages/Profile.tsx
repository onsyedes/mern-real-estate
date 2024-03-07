import React from "react";
const Profile = () => {
  return (
    <div className=" dark:bg-gray-700 bg-gray-200 pt-12">
      {/* <!-- Card start --> */}
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className=" px-4 ">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
              src="https://randomuser.me/api/portraits/women/21.jpg"
              alt=""
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                Ons Yedes
              </h3>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div role="tablist" className="tabs tabs-bordered">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Profile"
              checked
            />
            <div role="tabpanel" className="tab-content p-10">
              {/* profile content */}
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ons yedes"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    placeholder="ons.yedes@gmail.com"
                    className={`input input-bordered `}
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-outline btn-primary ">
                    Confirm
                  </button>
                </div>
              </form>
              {/* end profile content */}
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Password"
            />

            <div role="tabpanel" className="tab-content p-10">
              {/* Password content */}
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Old Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="************"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <input
                    placeholder="************"
                    className={`input input-bordered `}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm New Password</span>
                  </label>
                  <input
                    placeholder="************"
                    className={`input input-bordered `}
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-outline btn-primary ">
                    Confirm
                  </button>
                </div>
              </form>

              {/* end Password content */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Card end --> */}
    </div>
  );
};

export default Profile;

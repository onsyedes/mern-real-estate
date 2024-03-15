import React, { useState } from "react";
import { AccountInfoForm, ProfileInfoForm } from "../components";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";

const Profile = () => {
  const user = useAppSelector(selectUser);
  const [tab, settab] = useState("profile");
  const onTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settab(e.target.value);
  };
  return (
    <div className=" dark:bg-gray-700 bg-gray-200 pt-12 ">
      {/* <!-- Card start --> */}
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="flex mt-10">
          <div role="tablist" className="tabs tabs-bordered">
            <input
              type="radio"
              name="my_tabs_1"
              value="profile"
              role="tab"
              className="tab"
              aria-label="Profile"
              checked={tab === "profile"}
              onChange={onTabChange}
            />
            <div role="tabpanel" className="tab-content p-10">
              {/* profile content */}
              <ProfileInfoForm user={user} />
              {/* end profile content */}
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              value="account"
              role="tab"
              className="tab"
              aria-label="Account"
              checked={tab === "account"}
              onChange={onTabChange}
            />

            <div role="tabpanel" className="tab-content p-10">
              {/* Account content */}
              <AccountInfoForm user={user} />

              {/* end Account content */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Card end --> */}
    </div>
  );
};

export default Profile;

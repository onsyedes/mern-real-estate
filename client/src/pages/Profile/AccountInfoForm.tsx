import { UserRoundX } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AccountInfoForm = () => {
  return (
    <React.Fragment>
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
          <button className="btn btn-outline btn-primary ">Confirm</button>
        </div>
      </form>
      <Link to={"/"} className="text-red-600 flex ">
        <UserRoundX className="mx-2 hover:underline" /> Delete Account
      </Link>
    </React.Fragment>
  );
};

export default AccountInfoForm;

import React from "react";
import { Home, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logout, selectUser } from "../features/userSlice";

const Header = () => {
  const authUser = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  const profilePicture = (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="user image"
            src={`${authUser?.avatar}?v=${authUser?.updatedAt}`}
            key={authUser?.updatedAt}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <Link to="/sign-in" onClick={onLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
  const loginButton = (
    <Link to="/sign-in" className="btn">
      Login
    </Link>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <Home />
          YdsEstate
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="form-control mr-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        {authUser ? profilePicture : loginButton}
      </div>
    </div>
  );
};

export default Header;

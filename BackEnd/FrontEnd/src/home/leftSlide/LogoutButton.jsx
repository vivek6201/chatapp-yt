import React from "react";
import { TbLogout2 } from "react-icons/tb";
import useLogout from "../../components/Logout";

function LogoutButton() {
  const { loading, logout } = useLogout();
  return (
    <>
      <div className="h-[10vh] ">
        {!loading ? (
          <div className="mx-6 pt-5  ">
            <TbLogout2
              onClick={logout}
              className="text-5xl text-center hover:rounded-full hover:bg-slate-600 duration-200 p-2 cursor-pointer"
            />
          </div>
        ) : (
          <span className="loading loading-spinner loading-md"></span>
        )}
      </div>
    </>
  );
}

export default LogoutButton;

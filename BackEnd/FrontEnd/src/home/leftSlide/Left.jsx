import React from "react";
import Search from "./Search";
import Users from "./Users";
import LogoutButton from "./LogoutButton";

function Left() {
  return (
    <>
      <div className="w-[30%] h-screen bg-black flex-1 overflow-auto">
        <Search />
        <Users />
        <LogoutButton />
      </div>
    </>
  );
}

export default Left;

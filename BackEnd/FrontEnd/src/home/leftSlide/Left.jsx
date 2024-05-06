import React from "react";
import Search from "./Search";
import Users from "./Users";
import LogoutButton from "./LogoutButton";

function Left() {
  return (
    <>
      <div className="w-full overflow-auto">
        <Search />
        <Users />
        <LogoutButton />
      </div>
    </>
  );
}

export default Left;

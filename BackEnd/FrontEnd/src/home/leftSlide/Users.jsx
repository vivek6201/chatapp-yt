import React from "react";
import User from "./User";
import useGetUsers from "../../components/context/useGetUsers";

function Users() {
  const [allUsers, loading] = useGetUsers();
  console.log(allUsers);
  return (
    <>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div className="overflow-hidden">
        <div
          className="flex-1 overflow-y-auto"
          style={{ maxHeight: "calc(84vh - 10vh)" }}
        >
          {allUsers.map((users, idx) => (
            <User
              key={users._id}
              users={users}
              lastIdx={idx === allUsers.length - 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;

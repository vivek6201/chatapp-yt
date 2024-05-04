import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import useGetUsers from "../../components/context/useGetUsers";

function Search() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const [allUsers] = useGetUsers();
  console.log(allUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      alert("No search user found");
    }
  };
  return (
    <>
      <div className="h-[10vh]">
        <div className=" mx-6 my-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-3">
              <label className="p-3 border-[1px] border-gray-700 rounded-lg outline-none bg-slate-900 flex items-center gap-2 w-[80%]">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <button type="submit">
                <FaSearch className="text-5xl cursor-pointer hover:bg-gray-600 duration-300 hover:rounded-full p-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Search;

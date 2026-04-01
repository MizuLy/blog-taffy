import axios from "axios";
import { IoIosSearch } from "react-icons/io";

import { useEffect, useState } from "react";

const APIAllUser = `http://localhost:8880/api/auth/all`;
// const APIYou = `http://localhost:8880/api/auth/me`;
export default function UserList() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");

  const filterSearch = user.filter((u) => {
    return Object.values(u)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  // const getMe = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.get(APIYou, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setUser(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const getUsers = async () => {
    try {
      const res = await axios.get(APIAllUser);

      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="h-screen text-white w-full px-3 py-4">
      <h2 className="text-sm font-semibold text-gray-400 mb-3">Search</h2>
      <div className="flex items-center bg-gray-900 rounded-full px-2 py-2 gap-2">
        <IoIosSearch size={20} className="text-gray-400 shrink-0" />

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-white text-sm placeholder-gray-400 w-full [&::-webkit-search-cancel-button]:hidden"
          placeholder="Search"
        />
      </div>

      <h2 className="text-sm font-semibold text-gray-400 mb-3 mt-4">
        Who to follow
      </h2>
      {filterSearch.length > 0 ? (
        <div>
          {filterSearch.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-2 hover:bg-gray-700 rounded-lg px-4 py-2 cursor-pointer"
            >
              {u.avatar ? (
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 text-sm font-medium shrink-0">
                  {u.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm">{u.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <span className="text-sm text-center">User not found</span>
        </div>
      )}
    </div>
  );
}

import { GrHomeRounded } from "react-icons/gr";
import { LuUserRound } from "react-icons/lu";
import {
  IoLogOutOutline,
  IoSettingsOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen px-3 py-4 flex flex-col gap-6">
      <img src="/Taffy.png" alt="Taffy" className="w-14 h-14 rounded-full" />

      <nav className="flex flex-col gap-2">
        <Link
          to={"/home"}
          className="flex items-center gap-3 rounded-full px-4 py-2 hover:bg-gray-700 transition text-white"
        >
          <GrHomeRounded size={20} />
          <span>Home</span>
        </Link>

        <Link
          to={"/profile"}
          className="flex items-center gap-3 rounded-full px-4 py-2 hover:bg-gray-700 transition text-white"
        >
          <LuUserRound size={20} />
          <span>Profile</span>
        </Link>

        <Link
          to={"/chat"}
          className="flex items-center gap-3 rounded-full px-4 py-2 hover:bg-gray-700 transition text-white"
        >
          <IoChatbubbleOutline size={20} />
          <span>Chat</span>
        </Link>

        <Link
          to={"/setting"}
          className="flex items-center gap-3 rounded-full px-4 py-2 hover:bg-gray-700 transition text-white"
        >
          <IoSettingsOutline size={20} />
          <span>Setting</span>
        </Link>

        <Link
          to={"/logout"}
          className="flex items-center px-4 py-2 gap-3 rounded-full hover:bg-gray-700 text-white transition"
        >
          <IoLogOutOutline size={20} />
          <span>Log Out</span>
        </Link>
      </nav>
    </div>
  );
}

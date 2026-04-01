import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

import { Link } from "react-router-dom";

export default function Setting() {
  return (
    <div>
      <h1 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <IoSettingsOutline size={20} /> Settings
      </h1>

      {/* Content */}
      <div className="flex flex-col">
        <Link
          to={"/account"}
          className="flex justify-between items-center px-4 py-2 gap-3 hover:bg-gray-700 text-white transition"
        >
          Account <MdOutlineKeyboardDoubleArrowRight />
        </Link>

        <Link
          to={"/theme"}
          className="flex justify-between items-center px-4 py-2 gap-3 hover:bg-gray-700 text-white transition"
        >
          Theme <MdOutlineKeyboardDoubleArrowRight />
        </Link>
      </div>
    </div>
  );
}

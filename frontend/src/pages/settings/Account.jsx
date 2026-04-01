import { HiOutlineKey, HiOutlineMail } from "react-icons/hi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div>
      <h1 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <MdOutlineAccountCircle size={20} /> Account
      </h1>

      {/* Content */}
      <div className="">
        <h2 className="text-lg font-medium mb-4">
          See information about your account.
        </h2>

        {/* Link */}
        <div className="flex flex-col gap-2">
          <Link
            to={"/email"}
            className="hover:bg-gray-700 px-4 py-2 gap-3 flex items-center"
          >
            <HiOutlineMail />
            Change Email
          </Link>
          <Link
            to={"/password"}
            className="hover:bg-gray-700 px-4 py-2 gap-3 flex items-center"
          >
            <HiOutlineKey />
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}

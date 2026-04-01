import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="rounded-2xl shadow-xl shadow-gray-700 border p-8 max-w-md w-full text-center">
        <div className="bg-gray-300 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <IoLogOutOutline size={40} className="text-red-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-200 mb-3">
          Confirm Logout
        </h2>
        <p className="text-gray-300 mb-8">
          Are you sure you want to logout? You'll need to sign in again to
          access your dashboard.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-300 rounded-lg hover:bg-gray-600 transition font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

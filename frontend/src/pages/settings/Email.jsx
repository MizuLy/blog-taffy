import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const APIUser = `http://localhost:8880/api/auth/me`;
const APIEmail = `http://localhost:8880/api/auth/email`;
export default function Account() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
  });

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(APIUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.put(APIEmail, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Updated successfully");

      getUser();
      setFormData({
        email: "",
      });
    } catch (err) {
      toast.error("Failed to update");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Toaster position="top-center" />
      <h1 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <MdOutlineAccountCircle size={20} /> Email
      </h1>

      {/* Content */}
      <div className="">
        <h2 className="text-lg font-medium mb-4">
          See information about your email.
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={user?.email}
            className="focus:outline-none w-full px-4 py-2 placeholder-gray-500 text-white bg-gray-800 border-gray-500 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:shadow-md focus:shadow-white focus:border-transparent transition"
          />

          <button
            type="submit"
            className="mt-4 w-full px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            Save change
          </button>
        </form>
      </div>
    </div>
  );
}

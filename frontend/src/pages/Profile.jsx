import { CiCalendar, CiEdit } from "react-icons/ci";
import { TbDots } from "react-icons/tb";
import { IoMdPhotos } from "react-icons/io";

import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import { useEffect, useState } from "react";
import { timeAgo } from "../utils/timeAgo";
import { linkify } from "../utils/linkify";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const APIUser = `http://localhost:8880/api/auth/me`;
const APIPost = `http://localhost:8880/api/post`;
const APIUpdateUser = `http://localhost:8880/api/auth/profile`;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [profileData, setProfileData] = useState({
    name: "",
    avatar: "",
  });
  const [postData, setPostData] = useState({
    text: "",
    media: "",
  });
  const [edit, setEdit] = useState(null);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.put(APIUpdateUser, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated successfully");

      getUser();
      setProfileData({
        name: "",
        avatar: "",
      });

      document.getElementById("editModal").checked = false;
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.put(`${APIPost}/${edit}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Updated successfully!");

      getPost();
      setEdit(null);
      setPostData({
        text: "",
        media: "",
      });

      document.getElementById("postModal").checked = false;
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  const handlePostChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${APIPost}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Post deleted");

        getPost();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete post", err);
      }
    }
  };

  // Handle edit profile
  const handleProfileUpdate = () => {
    setProfileData({
      name: user.name,
      avatar: user.avatar,
    });
  };

  // Handle edit post
  const handlePostUpdate = (p) => {
    setEdit(p.id);
    setPostData({
      text: p.text,
      media: p.media,
    });

    document.getElementById("postModal").checked = true;
  };

  // Handle profile image
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadToCloudinary(file);
      setProfileData({ ...profileData, avatar: url });
    } catch (err) {
      toast.error("Image upload failed");
      console.error("Image upload failed", err);
    }
  };

  // Handle post image
  const handlePostImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadToCloudinary(file);
      setPostData({ ...postData, media: url });
    } catch (err) {
      toast.error("Image upload failed");
      console.error("Image upload failed", err);
    }
  };

  const getPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(APIPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

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
      console.error("Error fetching user", err);
    }
  };

  useEffect(() => {
    getPost();
    getUser();
  }, []);

  const initials = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex flex-col items-start rounded-xl w-full shadow-sm text-white">
      <Toaster position="top-center" />

      {/* Profile */}
      <div className="flex flex-col items-start gap-2 w-full">
        <div className="flex items-center justify-between w-full">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-36 h-36 rounded-full object-cover border border-gray-100"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 font-medium text-sm">
              {initials}
            </div>
          )}
          <label
            htmlFor="editModal"
            onClick={handleProfileUpdate}
            className="btn px-3 py-1 border shadow-lg shadow-gray-700 rounded-full text-white font-semibold"
          >
            Edit Profile
          </label>
        </div>
        {user?.name ? (
          <span className="text-xl font-semibold text-white">{user.name}</span>
        ) : (
          <span className="text-xl font-semibold text-white">Guest</span>
        )}
        <span className="flex gap-2 text-gray-300">
          <CiCalendar size={20} /> Joined{" "}
          {new Date(user?.created_at).toLocaleDateString()}
        </span>
      </div>

      {/* Edit Profile Modal */}
      <input type="checkbox" id="editModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-gray-800 p-0 overflow-hidden">
          <form onSubmit={handleProfileSubmit}>
            <h1 className="font-semibold text-xl text-center py-4 border-b border-gray-600">
              Edit Profile
            </h1>

            {/* Body */}
            <div className="p-4">
              {/* Avatar input */}
              <label className="flex items-center gap-2 mb-3 cursor-pointer relative group w-32 h-32">
                <input
                  type="file"
                  onChange={handleProfileImageChange}
                  accept="image/*"
                  className="hidden"
                />
                {profileData.avatar || user?.avatar ? (
                  <img
                    src={profileData.avatar || user.avatar}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 font-medium">
                    {initials}
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <CiEdit size={30} className="text-white" />
                </div>
              </label>

              {/* Name input */}
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="Name"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg outline-none mb-4"
              />

              {/* Edit button */}
              <button
                type="submit"
                className="btn px-4 py-2 rounded-full border"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="editModal"></label>
      </div>

      {/* Edit Post Modal */}
      <input type="checkbox" id="postModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-gray-800 p-0 overflow-hidden">
          <form onSubmit={handlePostSubmit}>
            {/* Header */}
            <h1 className="font-semibold text-xl text-center py-4 border-b border-gray-600">
              Update Post
            </h1>

            {/* Body */}
            <div className="p-4">
              {/* User info */}
              <div className="flex items-center gap-2 mb-3">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 font-medium">
                    {initials}
                  </div>
                )}
                <span className="font-semibold">{user?.name}</span>
              </div>

              {/* Textarea */}
              <textarea
                name="text"
                value={postData.text}
                onChange={handlePostChange}
                placeholder={`What's on your mind, ${user?.name}?`}
                className="w-full bg-gray-900 resize-none outline-none text-white placeholder-gray-400 text-lg min-h-32 rounded-lg px-4 py-2"
              />

              {/* Preview Image */}
              {postData.media && (
                <img
                  src={postData.media}
                  className="mt-2 rounded-lg max-h-48 object-cover"
                />
              )}

              {/* Image upload */}
              <label className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer w-fit mt-2">
                <input
                  type="file"
                  onChange={handlePostImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <IoMdPhotos size={30} />
              </label>
            </div>

            {/* Footer */}
            <div className="p-4 pt-0">
              <button
                type="submit"
                className="btn btn-primary w-full rounded-full"
              >
                Update
              </button>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="postModal"></label>
      </div>

      {/* User's posts */}
      <div className="mt-3 w-full">
        {post.map((p) => (
          <div
            key={p.id}
            className="rounded-lg p-4 mb-3 border border-gray-700"
          >
            <div className="flex items-center gap-2 mb-2">
              {/* Profile picture */}
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  className="w-9 h-9 rounded-full object-cover cursor-pointer"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray600 flex items-center justify-center text-gray-300 text-sm font-medium cursor-pointer">
                  {p.name?.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Info */}
              <div className="flex-1">
                <div className="flex-1 flex justify-between">
                  <div className="flex flex-col">
                    <h2 className="font-semibold cursor-pointer hover:underline">
                      {user?.name}
                    </h2>
                    <p className="text-gray-400">{timeAgo(p.created_at)}</p>
                  </div>

                  {/* Option button */}
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="">
                      <TbDots size={20} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li onClick={() => handlePostUpdate(p)}>
                        <span>Edit</span>
                      </li>
                      <li onClick={() => handleDelete(p.id)}>
                        <span>Delete</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Handles link */}
            <p className="mt-2 break-words">{linkify(p.text)}</p>
            {p.media && (
              <img
                src={p.media}
                alt="media"
                className="mt-2 rounded-lg max-w-sm max-h-64 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

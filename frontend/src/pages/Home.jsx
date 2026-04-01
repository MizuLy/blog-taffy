import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import { IoMdPhotos } from "react-icons/io";
import { TbDots } from "react-icons/tb";

import { timeAgo } from "../utils/timeAgo";
import { linkify } from "../utils/linkify";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const APIPosts = "http://localhost:8880/api/post/all";
const APIUser = "http://localhost:8880/api/auth/me";
const APIPost = "http://localhost:8880/api/post";

export default function Home() {
  // All posts
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  // Add post
  const [formData, setFormData] = useState({
    text: "",
    media: "",
  });

  const [edit, setEdit] = useState(null);

  // Fetch Posts
  const getPosts = async () => {
    try {
      const res = await axios.get(APIPosts);

      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle posting
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (edit) {
        await axios.put(`${APIPost}/${edit}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Update successfully!");
      } else {
        await axios.post(APIPost, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Post successfully!");
      }

      getPosts();
      setEdit(null);
      setFormData({
        text: "",
        media: "",
      });

      document.getElementById("postModal").checked = false;
    } catch (err) {
      toast.error("Post error");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${APIPost}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        getPosts();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete post", err);
      }
    }
  };

  // Handle edit
  const handleUpdate = async (p) => {
    setEdit(p.id);
    setFormData({
      text: p.text,
      media: p.media,
    });

    document.getElementById("postModal").checked = true;
  };

  // Handle image
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadToCloudinary(file);
      setFormData({ ...formData, media: url });
    } catch (err) {
      toast.error("Image upload failed");
      console.error("Image upload failed", err);
    }
  };

  // Fetch current user
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
    getPosts();
    getUser();
  }, []);

  const initials = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className=" text-white w-full min-h-screen">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6">For you</h1>
      <hr className="mb-3" />

      {/* Status posting box */}
      <div className="sticky w-full h-16 p-4 mb-3 flex items-center gap-2 rounded-lg border border-gray-700">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-gray-300 font-medium text-sm">
            {initials}
          </div>
        )}
        <label
          htmlFor="postModal"
          className="btn rounded-full flex-1 bg-gray-900"
        >
          Tell us what's on your mind, {user?.name}?
        </label>
      </div>

      {/* Post Modal */}
      <input type="checkbox" id="postModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-gray-800 p-0 overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <h1 className="font-semibold text-xl text-center py-4 border-b border-gray-600">
              {edit ? "Update post" : "Create Post"}
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
                value={formData.text}
                onChange={handleChange}
                placeholder={`What's on your mind, ${user?.name}?`}
                className="w-full bg-gray-900 resize-none outline-none text-white placeholder-gray-400 text-lg min-h-32 rounded-lg px-4 py-2"
              />

              {/* Preview Image */}
              {formData.media && (
                <img
                  src={formData.media}
                  className="mt-2 rounded-lg max-h-48 object-cover"
                />
              )}

              {/* Image upload */}
              <label className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer w-fit mt-2">
                <input
                  type="file"
                  onChange={handleImageChange}
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
                {edit ? "Update" : "Post"}
              </button>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="postModal"></label>
      </div>

      {posts.map((p) => (
        <div key={p.id} className="rounded-lg p-4 mb-3 border border-gray-700">
          <div className="w-full flex items-center gap-2 mb-2">
            {/* Profile picture */}
            {p.avatar ? (
              <Link to={`/profile/${p.user_id}`}>
                <img
                  src={p.avatar}
                  className="w-9 h-9 rounded-full object-cover cursor-pointer"
                />
              </Link>
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray600 flex items-center justify-center text-gray-300 text-sm font-medium cursor-pointer">
                {p.name?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <div className="flex-1 flex justify-between">
                <div className="flex flex-col">
                  <h2 className="font-semibold hover:underline cursor-pointer">
                    {p.name}
                  </h2>
                  <p className="text-gray-400">{timeAgo(p.created_at)}</p>
                </div>

                {/* Option button */}
                {p.user_id === user?.id && (
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="">
                      <TbDots size={20} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li onClick={() => handleUpdate(p)}>
                        <span>Edit</span>
                      </li>
                      <li onClick={() => handleDelete(p.id)}>
                        <span>Delete</span>
                      </li>
                    </ul>
                  </div>
                )}
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
  );
}

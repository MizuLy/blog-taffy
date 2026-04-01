import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "my_preset");
  // data.append("cloud_name", "drlotgsko");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/drlotgsko/image/upload",
    data,
  );

  return res.data.secure_url; // this is the image URL to store in DB
};

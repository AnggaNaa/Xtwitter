import { v2 as cloudinary } from "cloudinary";

// const cloudinaryConfig = () => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
//   });
// };

// export default cloudinaryConfig;

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: "daqitl4oc",
    api_key: "664683232595348",
    api_secret: "_ePVIHvaFcP4isCL52QZv8RraV0",
    secure: true,
  });
};

export default cloudinaryConfig;

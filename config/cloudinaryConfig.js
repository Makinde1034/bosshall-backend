require("dotenv").config({path:"./.env"});
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dlinffsds" ,
  api_key: process.env.API_KEY || 864265113552176,
  api_secret: process.env.API_SECRET || "XVICYjxtT2CF2zAP1r2H2zKMw5E",
});

 
exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};

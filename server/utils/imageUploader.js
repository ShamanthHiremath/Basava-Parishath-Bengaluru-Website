const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  try {
    // First verify that cloudinary is properly configured
    if (!cloudinary.config().api_key) {
      throw new Error("Cloudinary is not properly configured. Check your environment variables.");
    }

    const options = { folder };

    // Height and quality for compression
    if (height) {
      options.height = height;
    }

    if (quality) {
      options.quality = quality;
    }

    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Error while uploading image, please try again");
  }
};
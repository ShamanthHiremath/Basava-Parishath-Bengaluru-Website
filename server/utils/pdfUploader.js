const cloudinary = require('cloudinary').v2;

/**
 * Uploads a PDF file to Cloudinary using the same pattern as the imageUploader
 * @param {Object} file - The PDF file from req.files
 * @param {String} folder - Cloudinary folder path
 * @returns {Promise<Object>} Cloudinary upload result
 */
exports.uploadPdfToCloudinary = async (file, folder) => {
  try {
    // First verify that cloudinary is properly configured
    if (!cloudinary.config().api_key) {
      throw new Error("Cloudinary is not properly configured. Check your environment variables.");
    }

    const options = { 
      folder,
      resource_type: "auto",
      format: "pdf",
      allowed_formats: ["pdf"]
    };

    // Use the tempFilePath from express-fileupload
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.error("Error uploading PDF to Cloudinary:", error);
    throw new Error("Error while uploading PDF, please try again");
  }
};
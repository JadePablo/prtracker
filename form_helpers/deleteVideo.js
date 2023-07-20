import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_APIKEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_APISECRET
});

export default async function deleteVideo(publicID) {
  try {

    // Call the destroy method using async/await
    const result = await cloudinary.uploader.destroy(publicID,
        {resource_type:'video'});
    console.log('Delete response:', result);
    return result;
  } catch (error) {
    console.error('Error occurred during video deletion:', error);
    throw error; // Rethrow the error so the caller can handle it if needed
  }
}

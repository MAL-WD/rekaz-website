import { compressImage } from '../utils/imageHelper';

export const UploadFile = async (img) => {
  try {
    const compressedUrl = await compressImage(img);
    return compressedUrl;
  } catch (error) {
    console.error('Image processing failed:', error);
    // Fallback to basic object URL
    return URL.createObjectURL(img);
  }
};

export const UploadImage = UploadFile;

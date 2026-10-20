/**
 * Image helper utility for Rekaz Blog & Admin
 * Handles instant client-side image compression and conversion to data URL
 * Ensures uploaded images persist in the database without requiring external AWS credentials
 */

export const compressImage = (file, maxWidth = 1600, maxHeight = 1000, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));

    // If file is not an image
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image'));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        // Smooth scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first for great compression, fallback to JPEG
        try {
          const webpDataUrl = canvas.toDataURL('image/webp', quality);
          if (webpDataUrl && webpDataUrl.startsWith('data:image/webp')) {
            return resolve(webpDataUrl);
          }
        } catch {
          // Fallback to JPEG
        }

        const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(jpegDataUrl);
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
};

/**
 * Calculates estimated reading time in minutes from text / blocks
 */
export const calculateReadTime = (content, lang = 'en') => {
  let wordCount = 0;

  if (typeof content === 'string') {
    wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  } else if (content && Array.isArray(content.blocks)) {
    content.blocks.forEach((b) => {
      if (b.data?.text) {
        // Strip HTML tags
        const clean = b.data.text.replace(/<[^>]*>?/gm, '');
        wordCount += clean.trim().split(/\s+/).filter(Boolean).length;
      }
      if (Array.isArray(b.data?.items)) {
        b.data.items.forEach((item) => {
          const text = typeof item === 'string' ? item : item.content || '';
          const clean = text.replace(/<[^>]*>?/gm, '');
          wordCount += clean.trim().split(/\s+/).filter(Boolean).length;
        });
      }
    });
  }

  // Average reading speed: ~180-200 words per minute
  const minutes = Math.max(1, Math.ceil(wordCount / 180));
  return lang === 'ar' ? `${minutes} دقائق قراءة` : `${minutes} min read`;
};

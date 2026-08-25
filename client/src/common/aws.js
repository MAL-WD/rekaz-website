// Dummy AWS upload function since no backend is connected yet
export const UploadFile = async (img) => {
    return new Promise((resolve) => {
        // Mock image URL or create local object URL
        const url = URL.createObjectURL(img);
        setTimeout(() => {
            resolve(url);
        }, 1500);
    });
};

export const UploadImage = UploadFile;

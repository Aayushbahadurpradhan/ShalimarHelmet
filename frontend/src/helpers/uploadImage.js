const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern_product"); // Ensure this matches your Cloudinary upload preset

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Cloudinary upload failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};

export default uploadImage;

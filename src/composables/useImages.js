import { ref, computed } from "vue";

export default function useImages() {
    const urls = ref([]);

    async function uploadImages(e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const uploadedUrls = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "unsigned_preset"); // OJO: es upload_preset, no "unsigned_preset"

            try {
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dtkgoxqeo/image/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await response.json();

                if (data.secure_url) {
                    uploadedUrls.push(data.secure_url);
                } else {
                    console.error("Respuesta inesperada de Cloudinary:", data);
                }
            } catch (error) {
                console.error("Error al subir la imagen:", error);
            }
        }
        urls.value = [...urls.value, ...uploadedUrls];
    }

    const images = computed(() => urls.value);

    function removeImage(index) {
        urls.value.splice(index, 1);
    }

    return {
        urls,
        uploadImages,
        images,
        removeImage,
    };
}
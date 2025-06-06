const API_BASE_URL = 'http://localhost:5000';

export const processVideo = async (videoFile) => {
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
        const response = await fetch(`${API_BASE_URL}/process-video`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to process video');
        }

        return await response.json();
    } catch (error) {
        console.error('Error processing video:', error);
        throw error;
    }
}; 
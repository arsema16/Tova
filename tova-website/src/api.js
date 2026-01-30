const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('API URL:', API_URL); // Debug log

export const submitContactForm = async (formData) => {
    try {
        console.log('Submitting to:', `${API_URL}/api/contact`); // Debug log

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send message');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error); // Debug log

        if (error.name === 'AbortError') {
            throw new Error('Request timed out. The server may be starting up. Please try again in a moment.');
        }

        if (error.message === 'Failed to fetch') {
            throw new Error('Unable to connect to server. Please check your connection.');
        }

        throw error;
    }
};

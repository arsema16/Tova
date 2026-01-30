const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('API URL:', API_URL); // Debug log

export const submitContactForm = async (formData) => {
    try {
        console.log('Submitting to:', `${API_URL}/api/contact`); // Debug log

        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send message');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error); // Debug log
        if (error.message === 'Failed to fetch') {
            throw new Error('Unable to connect to server. Please check your connection.');
        }
        throw error;
    }
};

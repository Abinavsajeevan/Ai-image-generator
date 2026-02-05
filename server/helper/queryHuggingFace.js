const axios = require('axios');


const queryHuggingFace = async (url, token, data, isAudio = false) => {

    try {
        const response = await axios.post(url, data, {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": isAudio ? "audio/wav" : "image/png",
        "x-wait-for-model": "true" // <--- Add this
    },
    responseType: 'arraybuffer',
});
        return response.data;
    } catch (error) {
        // This decodes the "Not Found" buffer into actual text
        const errorBody = error.response?.data instanceof ArrayBuffer 
            ? Buffer.from(error.response.data).toString() 
            : JSON.stringify(error.response?.data || error.message);
            
        console.error(`Detailed Error for ${url}:`, errorBody);
        throw new Error(errorBody);
    }
};

module.exports = {
    queryHuggingFace
}
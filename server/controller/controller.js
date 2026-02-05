const { queryHuggingFace } = require("../helper/queryHuggingFace");

const HF_IMAGE_URL = "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell";
// STABLE 2026 URL
// This model is widely supported on the new router
// const HF_AUDIO_URL = "https://router.huggingface.co/hf-inference/v1/models/openai/whisper-large-v3:hf-inference";
// const HF_AUDIO_URL = "https://router.huggingface.co/hf-inference/models/facebook/mms-tts-eng";
const image =  async (req, res) => {
    try {
    const HF_TOKEN = process.env.HF_TOKEN;

        const buffer = await queryHuggingFace(HF_IMAGE_URL,HF_TOKEN, { inputs: req.body.text });
        const base64 = Buffer.from(buffer).toString('base64');
        res.json({ image: `data:image/jpeg;base64,${base64}` });
    } catch (e) {
        res.status(500).json({ error: e.message });         
    } 
}

// const audio = async (req, res) => {
//     const HF_TOKEN = process.env.HF_FINE_TOKEN;
//     const { text } = req.body;

//     try {
//         console.log("Requesting Audio...");
//         // Use the standard OpenAI-style input for the router
//         const buffer = await queryHuggingFace(HF_AUDIO_URL, HF_TOKEN, { 
//     inputs: text 
// }, true);
        
//         const base64Audio = Buffer.from(buffer).toString('base64');
//         res.json({ audio: `data:audio/wav;base64,${base64Audio}` });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

module.exports = {
    image
}
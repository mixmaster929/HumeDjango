
const HUME_API_KEY = process.env.REACT_APP_HUME_API_KEY;
const HUME_STREAM_API_ENDPOINT = `wss://api.hume.ai/v0/stream/models?apiKey=${HUME_API_KEY}`
const BACKEND_API_ENDPOINT = "http://127.0.0.1:8000"


const config = {
    HUME_STREAM_API_ENDPOINT: HUME_STREAM_API_ENDPOINT,
    BACKEND_ENDPOINT: BACKEND_API_ENDPOINT,
}

export default config
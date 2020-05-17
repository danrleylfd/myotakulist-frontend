const axios = require('axios');

const api = axios.create({ baseURL: 'https://mol-backend.glitch.me'});

api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.put["Content-Type"] = "application/json";

export default api;

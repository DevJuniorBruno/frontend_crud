import axios from 'axios';

//Base da url:https://crud-api-wm7b.onrender.com

const api = axios.create({
    baseURL: 'https://crud-api-wm7b.onrender.com'
})

export default api;
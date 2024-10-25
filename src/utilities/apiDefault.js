import axios from 'axios';

export default axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
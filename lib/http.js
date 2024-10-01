import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

class Http {

    getHeaders = () => ({
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
    });

    post = async (url, data) => {
        return axios.post(`${apiUrl}${url}`, data, { headers: this.getHeaders() })
    };

    get = async (url) => {
        return axios.get(`${apiUrl}${url}`, { headers: this.getHeaders() })
    };

}

export default Http
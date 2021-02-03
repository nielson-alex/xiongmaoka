import axios from 'axios';

export const GET = async (url, params) => await axios.get(url, {
    params: params
})
    .then(res => res.data);

export const POST = (url, data, headers) =>
    axios({
        method: 'POST',
        url: url,
        data: data
    });
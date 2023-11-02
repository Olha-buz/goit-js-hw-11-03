import axios from 'axios';
export { fetchImages };

const api_url = 'https://pixabay.com/api/';
const api_key = '40392012-08915947b5d4aadebea93b87b';

async function fetchImages(request, page, per_page) {
    const params = {
        key: api_key,
        q: request,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: per_page,
    }
    try {
        const response = await axios.get(api_url, { params });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
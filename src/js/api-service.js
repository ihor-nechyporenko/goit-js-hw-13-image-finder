const API_KEY = '21256034-530eff5c113cf9ecb9ad1dfd0';
const BASE_URL = 'https://pixabay.com/api';

export default class ApiService {
    constructor() {
        this.query = '';
        this.page = 1;
    }
    
    async fetchImages() {
        const searchParams = new URLSearchParams({
            image_type: 'photo',
            orientation: 'horizontal',
            q: this.query,
            page: this.page,
            per_page: '12',
            key: API_KEY,
        });

        const responce = await fetch(`${BASE_URL}/?${searchParams}`);

        if (!responce.ok) {
            throw responce;
        };

        const data = await responce.json();
        this.incrementPage();

        return data.hits;
    };

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };
}
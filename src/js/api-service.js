const API_KEY = '21256034-530eff5c113cf9ecb9ad1dfd0';
const BASE_URL = 'https://pixabay.com/api';

export default class ApiService {
    constructor() {
        this.query = '';
        this.page = 1;
    }
    
    fetchImages() {
        const searchParams = new URLSearchParams({
            image_type: 'photo',
            orientation: 'horizontal',
            q: this.query,
            page: this.page,
            per_page: '12',
            key: API_KEY,
        });
        
        return fetch(`${BASE_URL}/?${searchParams}`)
            .then(r => r.json())
            .then(({ hits }) => {
                this.incrementPage();

                if (hits.length === 0) {
                    throw hits;
                }

                return hits;
            });
    };

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };
}
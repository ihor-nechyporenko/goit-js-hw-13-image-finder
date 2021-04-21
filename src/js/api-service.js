export default class ApiService {
    constructor() {
        this.query = '';
        this.page = 1;
    }
    
    fetchImages() {
        console.log(this);
        const API_KEY = '21256034-530eff5c113cf9ecb9ad1dfd0';

        fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${API_KEY}`)
            .then(r => r.json())
            .then(this.incrementPage());
    };

    get searchQuery() {
        return this.query;
    };

    set searchQuery(newQuery) {
        this.query = newQuery;
    };

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    }
}
import './scss/styles.scss';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import ApiService from './js/api-service';

const apiService = new ApiService();

const refs = {
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.query.value;
    apiService.resetPage();
    apiService.fetchImages();
};

function onLoadMore() {
    apiService.fetchImages();
}
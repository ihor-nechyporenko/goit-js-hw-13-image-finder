import './scss/styles.scss';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import ApiService from './js/api-service';
import imageCardTpl from './tamplates/image-card.hbs';
import refs from './js/refs';

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.query.value;
    if (apiService.query === '') {
        return alert('Please enter a valid query');
    };
    apiService.resetPage();
    apiService.fetchImages().then(data => {
        clearGalleryContainer();
        appendImgCardsMarkup(data);
    }).catch(error => {
        return alert('Please enter a valid query')
    });
};

function onLoadMore() {
    apiService.fetchImages().then(data => {
        appendImgCardsMarkup(data);

        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    });
};

function appendImgCardsMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', imageCardTpl(images));
};

function clearGalleryContainer() {
    refs.gallery.innerHTML = '';
};
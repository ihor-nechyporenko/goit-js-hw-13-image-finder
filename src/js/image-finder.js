import ApiService from './api-service';
import refs from './refs';
import imageCardTpl from '../tamplates/image-card.hbs';
import { invalidQueryNotice, errorNotice } from './notice';

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();
    apiService.resetPage();
    apiService.query = e.currentTarget.elements.query.value;

    if (apiService.query === '' || !apiService.query.trim()) {
        return invalidQueryNotice();
    };

    onSearchFetchImages();
};

async function onSearchFetchImages() {
    try {
        const result = await apiService.fetchImages();
        if (result.length === 0) {
            invalidQueryNotice();
            return;
        };
        clearGalleryContainer();
        appendImgCardsMarkup(result);
    } catch (error) {
        errorNotice();
    };
};

function appendImgCardsMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', imageCardTpl(images));
};

function clearGalleryContainer() {
    refs.gallery.innerHTML = '';
};

function onEntry(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && apiService.query !== '') {
            onEntryFetchImages();
        };
    });
};

async function onEntryFetchImages() {
    const result = await apiService.fetchImages();
    appendImgCardsMarkup(result);
};

const observer = new IntersectionObserver(onEntry, {
    rootMargin: '100px',
});

observer.observe(refs.sentinel);
import './scss/styles.scss';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import ApiService from './js/api-service';
import imageCardTpl from './tamplates/image-card.hbs';
import refs from './js/refs';
import errorNotice from './js/notice';
import * as basicLightbox from 'basiclightbox';


const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.query.value;
    if (apiService.query === '' || !apiService.query.trim()) {
        return errorNotice();
    };
    apiService.resetPage();
    apiService.fetchImages().then(data => {
        clearGalleryContainer();
        appendImgCardsMarkup(data);
    }).catch(errorNotice);
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
            apiService.fetchImages().then(data => {
                appendImgCardsMarkup(data); 
            });
        };
    });
};


const observer = new IntersectionObserver(onEntry, {
    rootMargin: '100px',
});

observer.observe(refs.sentinel);


// refs.gallery.addEventListener('click', onImageClick);

// function onImageClick(e) {
//     if (!e.target.classList.contains('image-item')) {
//         return;
//     };

//     console.log(e.target);

//     const largeImage = e.target.dataset.source;
//     console.log(largeImage);
//     console.log(document.querySelector('.image-item'));
//     onOpenModal(largeImage);
// };

// function onOpenModal(src) {
//     basicLightbox.create(`
// 		<img width="1400" height="900" src="${src}">
// 	`).show();
// };
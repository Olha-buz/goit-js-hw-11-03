import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from './fetchImages';
import { renderGallery } from './renderGallery';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoadmore = document.querySelector('.load-more');

btnLoadmore.style.display = 'none';

form.addEventListener('submit', onSearchForm);


let simplelightbox;
let query = '';
let page = 0;
const per_page = 40;

async function onSearchForm(evt) {
    evt.preventDefault();
    query = evt.target.elements.searchQuery.value.trim();
    gallery.innerHTML = '';
    page = 1;

    if (query === '') {
        Notiflix.Notify.failure('Please enter a search keyword!');
        btnLoadmore.style.display = 'none';
        return;
    };
    try {
        const images = await fetchImages(query, page, per_page);
        console.log(images.total); //Вся кількість знайдених фото

        if (images.total === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            btnLoadmore.style.display = 'none';
        } else {
            renderGallery(images.hits);
            if (images.total <= per_page) {
                btnLoadmore.style.display = 'none';
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            } else {
                btnLoadmore.style.display = 'flex';
            };
            new SimpleLightbox('.gallery a', {
                captions: true,
                captionsData: 'alt',
                captionDelay: 250,
                fadeSpeed: 250,
                captionSelector: "img",
                enableKeyboard: true,
            });
            Notiflix.Notify.success(`Hooray! We found ${images.total} images.`);
            
        }
    } catch (error) {
        console.log(error);
        Notiflix.Notify.failure('Oops, something went wrong. Please try again later.');
    } finally {
        form.reset();
    }
}



btnLoadmore.addEventListener('click', onLoadMore);

function onLoadMore() {
    page += 1;
    console.log(page);
    fetchImages(query, page, per_page)
        .then(data => {
            renderGallery(data.hits);
            const totalPages = Math.ceil(data.total / per_page);
            console.log(totalPages);
            if (page >= totalPages) {
                btnLoadmore.style.display = 'none';
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                return;
            };
            
       })
        .catch(error => console.log(error));
    
}
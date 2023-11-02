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
let page = 1;
const per_page = 40;

async function onSearchForm(evt) {
    evt.preventDefault();
    query = evt.target.elements.searchQuery.value.trim();
    gallery.innerHTML = '';

    if (query === '') {
        Notiflix.Notify.failure('Please enter a search keyword!');
        return;
    };
    try {
        const images = await fetchImages(query, page, per_page);
        console.log(images.total); //Вся кількість знайдених фото

        if (images.total === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            renderGallery(images.hits);
            btnLoadmore.style.display = 'flex';
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

      fetchImages(query, page, per_page)
        .then(data => {
         renderGallery(data.hits);

       const totalPages = Math.ceil(data.totalHits / per_page);
       if (page > totalPages) {
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }
       })
       .catch(error => console.log(error));
}
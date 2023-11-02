export { renderGallery };

const gallery = document.querySelector('.gallery');

function renderGallery(images) {
  const markup = images
    .map(image => {
      return `
    <a href='${image.largeImageURL} class="large-image-link">
    <div class="gallery-item" id=${image.id}>
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="320"/> 
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${image.downloads}
    </p>
  </div>
  </div>
  </a>
  `;
    })
    .join('');
  gallery.innerHTML = markup;
  
}
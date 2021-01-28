import './styles.css';
// import loadService from "./js/load-service";
// import updateGalleryMarkup from "./js/update_gallery-markup";
// import showLightbox from "./js/lightbox"
import galleryTpl from "./templataes/gallery.hbs"
import genres from "./js/genres";

const refs = {
  galleryRef: document.querySelector(".gallery"),
  formRef: document.querySelector(".search-form")
  //   formRef: document.querySelector(".search-form"),
  //   loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  //    largeImage: document.querySelector('.lightbox-image'),
  // modal: document.querySelector('.js-lightbox'),
  // closeModalBtn: document.querySelector('.lightbox-button'),
  // overlay: document.querySelector('.lightbox-overlay')
};


//   console.log(refs.loadMoreBtn)
// refs.formRef.addEventListener("submit", submitHandler)


// function submitHandler(event) {
//     event.preventDefault()
//     const form = event.currentTarget;
//     loadService.query = form.elements.query.value;
//     refs.galleryRef.innerHTML = "";
//     form.reset();
//     loadService.resetPage();
//     refs.loadMoreBtn.classList.add("is-hidden");
//     loadService.fetchImages().then(hits => {
//         updateGalleryMarkup(hits);
//         refs.loadMoreBtn.classList.remove("is-hidden");
//     });
//     };



// refs.loadMoreBtn.addEventListener("click", loadMoreBtnHandler);


// function loadMoreBtnHandler() {
//     loadService.fetchImages().then(hits => {
//         updateGalleryMarkup(hits);
//         refs.loadMoreBtn.classList.remove("is-hidden");
//     });
//     };


//   refs.galleryRef.addEventListener('click', onGalleryClick);


// refs.closeModalBtn.addEventListener('click', onCloseModal);

// function onGalleryClick(e) {
//   e.preventDefault();

//   if (e.target.nodeName !== 'IMG') {
//     return;
//   }

//   const imageRef = e.target;
  
//   refs.largeImage.src = imageRef.dataset.source;
//   refs.largeImage.alt = imageRef.alt;
  
//   onOpenModal();
// }

// function onOpenModal() {
//   window.addEventListener('keydown', onPressESC);
  
//   refs.modal.classList.add('is-open');
//   refs.overlay.addEventListener('click', onClickOverlay);
// }



// function onCloseModal() {
//   window.removeEventListener('keydown', onPressESC);
  
//   refs.modal.classList.remove('is-open');
//   refs.largeImage.src = '#';
//   refs.largeImage.alt = ' ';
// }

// function onPressESC(e) {
//   if (e.code === 'Escape') {
//     onCloseModal();
//   }
// }

// function onClickOverlay(e) {
//   if (e.target === e.currentTarget) {
//     onCloseModal();
//   }
// }


// const x = 1;
// const x = 'hello';
// console.log(x);

  


const apiKey = '030295876ec9637cb436e167c8c73741';
const page = '1';
const baseUrl = 'https://api.themoviedb.org/3';

// const url = `https://api.themoviedb.org/3/trending/movie/day?&page=${page}&api_key=${apiKey}`;
fetch(`${baseUrl}/trending/movie/day?&page=${page}&api_key=${apiKey}`)
  .then(response => response.json())
  .then(({ results}) => updateGalleryMarkup(results))
  .catch(error => console.log(error));


refs.formRef.addEventListener("submit", queryHandler);


function queryHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
    const inputValue = form.elements.query.value;
    refs.galleryRef.innerHTML = "";
  form.reset();
  fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${inputValue}&page=${page}`)
  .then(response => response.json())
  .then(({ results }) => updateGalleryMarkup(results))
  .catch(error => console.log(error));
}


// const movieId = 628534;
// const url2 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

// fetch(url2).then(response => response.json()).then(data => console.log(data)).catch(error=>console.log(error));
// https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US


fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`)
  .then(response => response.json())
  .then((data) =>  console.log(data))
    .catch(error => console.log(error))
 

// function genreRemake() {
//   const genreName = genres.map(item => item.name);
  
//       return genreName;
    
//     }


function updateGalleryMarkup(results) {
 results.map((item) => {
    let newGenres = [];
    item.genre_ids.map((id) => {
      const found = genres.find((item) => item.id === id);
      console.log(found)
      newGenres.push(found.name);
    });
    if (newGenres.length >= 3) {
      const normalizedGenres = newGenres.slice(0, 2);
      normalizedGenres.push("Other");
      item.genre_ids = normalizedGenres.join(', ')
      item.release_date = item.release_date.slice(0, 4);
    } else {
      item.genre_ids = newGenres.join(', ');
      if (item.release_date) item.release_date = item.release_date.slice(0, 4);
    }
    return item;
  });
    const galleryMarkup = galleryTpl(results);
    refs.galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);
 }
import galleryTpl from "../templataes/gallery.hbs";
// import imageTpl from "../templataes/image.hbs";



const refs = {
    galleryRef: document.querySelector(".gallery"),
    lightBoxRef: document.querySelector(".lightbox__overlay")
}
console.dir(refs.galleryRef)
function updateGalleryMarkup(hits) {
    const galleryMarkup = galleryTpl(hits);
    refs.galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);
 window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: "smooth",
 });
    
}



export default updateGalleryMarkup;
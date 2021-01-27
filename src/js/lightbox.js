import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function showLightbox(value) {
  const instance = basicLightbox.create(`<img src="${value}">`);
  instance.show();
}

export default showLightbox;
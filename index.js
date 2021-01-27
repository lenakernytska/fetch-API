const apiKey = '030295876ec9637cb436e167c8c73741';

const url = `https://developers.themoviedb.org/3/trending/get-trending/movie/day?api_key=${apiKey}`;
fetch(url).then(response=>response.json()).then(data=> console.log(data))
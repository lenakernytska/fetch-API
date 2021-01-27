const apiKey = '19969795-0e842fcefe638df843a1829e0';


export default {
    searchQuery: "",
    page: 1,
    fetchImages() {
        const page = 1;
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${apiKey}`;
 
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                this.page += 1;
                return data.hits;
            })
            .catch(error => console.log(error))
    },
    resetPage() {
        this.page = 1;
    },
    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    }
};
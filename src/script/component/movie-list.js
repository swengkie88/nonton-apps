import './movie-item.js';
class MovieList extends HTMLElement{
    set movies(movies){
        this._movies = movies;
        this.render();
    }

    renderError(message){
        this.innerHTML = ''; 
        this.innerHTML +=  `<h2>${message}</h2>`;
    } 

    render(){ 
        this.innerHTML = '';
        this.classList.add("row");
        this._movies.forEach((movie) => {
            // console.log('Genred Id: ', movie.genre_ids);
            const movieItem = document.createElement('movie-item');
            movieItem.movie = movie;
            this.appendChild(movieItem);
        })
    }
}

customElements.define('movie-list', MovieList);
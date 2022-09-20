class MovieItem extends HTMLElement{
    set movie(movie){
        this._movie = movie;
        this.render();
    }

    render(){
        const onMovieTitleClicked = (movieId) => {
            console.log('Ini movieId nya: ', movieId);
            // DataSource.detailMovie(movieId)
            //     .then(console.log('Sampe!!!'))
            //     .catch(fallbackResult);
        }

        let imgUrl = `https://image.tmdb.org/t/p/original${this._movie.backdrop_path}`;
        if(this._movie.backdrop_path == null){
            imgUrl = 'https://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png';
        }
        let addClass = [ 'col-lg-3', 'col-md-4', 'col-6'];
        this.classList.add(...addClass);

        const movieModal = document.createElement('modal-dialog');
        movieModal.movie = this._movie;
        document.body.appendChild(movieModal);

        this.innerHTML = `
        <div class="card">
            <div class="img-wrapper">
                <img src="${imgUrl}" class="card-img-top" alt="${this._movie.backdrop_path}">
            </div>
            <div class="card-body">
                <input id="idMovie" type="hidden" value="${this._movie.id}">
                <h5 class="card-title">
                    <a data-bs-toggle="modal" data-bs-target="#modal${this._movie.id}">${this._movie.title}</a>
                </h5>
                <p class="card-text">${this._movie.release_date}</p>
                </div>
                </div>
                `;
    }
}

customElements.define('movie-item', MovieItem);
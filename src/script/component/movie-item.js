class MovieItem extends HTMLElement{
    set movie(movie){
        this._movie = movie;
        this.render();
    }

    render(){
        let imgUrl = `https://image.tmdb.org/t/p/original${this._movie.backdrop_path}`;
        if(this._movie.backdrop_path == null){
            imgUrl = 'https://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png';
        }
        let addClass = [ 'col-lg-3', 'col-md-4', 'col-6'];
        this.classList.add(...addClass);
        this.innerHTML = `
        <div class="card">
            <div class="img-wrapper">
                <img src="${imgUrl}" class="card-img-top" alt="${this._movie.poster_path}">
            </div>
            <div class="card-body">
                <h5 class="card-title">
                    <a href="#">${this._movie.title}</a>
                </h5>
                <p class="card-text">${this._movie.release_date}</p>
            </div>
        </div>
        `;
    }
}

customElements.define('movie-item', MovieItem);
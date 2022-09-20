class ModalDialog extends HTMLElement{
    connectedCallback(){
        this.render();
    }

    set movie(movie){
        this._movie = movie;
        this.render();
    }

    render(){
        this.innerHTML = `
        <div class="modal fade" id="modal${this._movie.id}" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${this._movie.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-img mb-3">
                            <img src="https://image.tmdb.org/t/p/original${this._movie.backdrop_path}"/>
                        </div>
                        ${this._movie.overview}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}
customElements.define('modal-dialog', ModalDialog);
class SearchBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get value() {
        return this.querySelector('.searchElement').value;
    }

    set value(nol) {
        this.querySelector('.searchElement').value = nol;
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="d-flex">
            <input class="searchElement form-control me-2" type="search" placeholder="Cari judul film..." aria-label="Cari judul film..." value="">
            <button class="searchButtonElement btn btn-light" type="submit"><i class="fas fa-search"></i></button>
            </div>
            `;

        this.querySelector('.searchButtonElement').addEventListener('click', this._clickEvent);
    }
}
customElements.define('search-bar', SearchBar);
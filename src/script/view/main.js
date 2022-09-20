import '../component/search-bar';
import '../component/movie-list.js';
import '../component/movie-item.js';
import '../component/page-navi.js';
import DataSource from "../data/data-source";

const main = () => {
    const movieList = document.querySelector('movie-list');
    const searchElement = document.querySelector('search-bar');
    const listGenreFilm = document.querySelector('#genreFilm');

    const paginationEl = document.querySelector('page-navi');
    const btnPrev = paginationEl.querySelector('#btnPrev');
    const btnNext = paginationEl.querySelector('#btnNext');

    const heading = document.getElementById('heading');
    const btnResetSearch = document.getElementById('btnResetSearch');
    let page = 1;

    let jumbotron = document.querySelector("#jumbotron");
    let sticky = jumbotron.offsetHeight;

    const onLoad = async () => {
        heading.innerHTML = 'Film populer';
        pagination();
        try {
            const results = await DataSource.popularMovie(page);
            console.log('Cek results movie: ', results);
            renderResults(results);
        } catch (message) {
            fallbackResult(message);
        }
    }
    
    const listGenreMovie = async () => {
        try {
            const listGenre = await DataSource.movieGenre();
            console.log(listGenre);
            listGenre.forEach(data => {
                const liGenre = document.createElement('li');
                liGenre.innerText = data.name
                listGenreFilm.appendChild(liGenre);
            });
        } catch (message) {
            console.log('Error!!!: ', message);
        }
    }
    
    const pagination = () => {
        if (page !== 1) {
            btnPrev.style.visibility = 'visible';
        } else {
            btnPrev.style.visibility = 'hidden';
        }
    }

    const prevPage = () => {
        page--;
        pagination();
        onLoad();
    }
    
    const nextPage = () => {
        page++;
        pagination();
        onLoad();
    }
    
    const onButtonSearchClicked = () => {
        if (searchElement.value == '') {
            searchElement.querySelector('input').style.boxShadow = '0 0 12px red';
        } else {
            heading.innerHTML = `Hasil pencarian: ${searchElement.value}`;
            paginationEl.classList.add("d-none");
            btnResetSearch.classList.remove("d-none");
            DataSource.searchMovie(searchElement.value)
            .then(searchResults)
            .catch(fallbackResult);
        }
    }
    
    const onButtonReset = () => {
        paginationEl.classList.remove("d-none");
        paginationEl.classList.add("d-block");
        btnResetSearch.classList.add("d-none");
        searchElement.value = '';
        onLoad();
    }
    
    const renderResults = results => {
        movieList.movies = results;
    }
    
    const fallbackResult = message => {
        movieList.renderError(message);
    };
    
    const searchResults = results => {
        movieList.movies = results;
    }
    
    onLoad();
    listGenreMovie();
    searchElement.clickEvent = onButtonSearchClicked;
    btnResetSearch.addEventListener('click', onButtonReset);
    btnPrev.addEventListener('click', prevPage);
    btnNext.addEventListener('click', nextPage);
    
    // Modifying DOM
    window.addEventListener("scroll", (event) => {
        if (window.pageYOffset >= sticky) {
            jumbotron.classList.add("scrolled");
            jumbotron.classList.remove("unscroll");
        } else {
            jumbotron.classList.remove("scrolled");
            jumbotron.classList.add("unscroll");
        }
    });

};

export default main;
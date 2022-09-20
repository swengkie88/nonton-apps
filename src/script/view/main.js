import '../component/search-bar';
import '../component/movie-list.js';
import '../component/movie-item.js';
import '../component/page-navi.js';
import '../component/modal-dialog.js';
import DataSource from "../data/data-source";

const main = () => {
    const movieList = document.querySelector('movie-list');
    const searchElement = document.querySelector('search-bar');
    const listGenreFilm = document.querySelector('#genreFilm');

    const paginationEl = document.querySelector('page-navi');
    const btnPrev = paginationEl.querySelector('#btnPrev');
    const btnNext = paginationEl.querySelector('#btnNext');

    const btnGenre = document.querySelector('#btnGenre');
    let filterActive = document.getElementById("resultFilter");

    const heading = document.getElementById('heading');
    const btnResetSearch = document.getElementById('btnResetSearch');
    let page = 1;

    let jumbotron = document.querySelector("#jumbotron");
    let sticky = jumbotron.offsetHeight;

    const onLoad = async () => {
        heading.innerHTML = 'Film populer';
        try {
            const results = await DataSource.popularMovie(page);
            renderResults(results);
        } catch (message) {
            fallbackResult(message);
        }
        pagination();
    }

    const listGenreMovie = async () => {
        try {
            let radioGenre;
            const listGenre = await DataSource.movieGenre();
            console.log(listGenre);
            listGenre.forEach((data) => {
                const labelRadio = document.createElement('label');
                labelRadio.setAttribute('for', `genre${data.id}`);
                labelRadio.innerText = data.name;
                listGenreFilm.appendChild(labelRadio);

                radioGenre = document.createElement('input');
                radioGenre.setAttribute('type', 'radio');
                radioGenre.setAttribute('name', 'genre')
                radioGenre.setAttribute('value', `${data.id}`)
                radioGenre.setAttribute('class', `radioBtn`);
                radioGenre.setAttribute('id', `genre${data.id}`);

                labelRadio.appendChild(radioGenre);
            });
        } catch (message) {
            console.log('Error!!!: ', message);
        }
    }


    const onGenreClicked = async () => {
        heading.innerHTML = `Filter genre diaktifkan`;
        btnResetSearch.classList.remove("d-none");
        let radioGenre = document.getElementsByName('genre');
        radioGenre.forEach((data, index) => {
            if (radioGenre[index].checked) {
                document.getElementById('resultFilter').innerHTML = radioGenre[index].value;
            }
        });
        try {
            const results = await DataSource.filterGenre(page, filterActive.innerText);
            filterResults(results);
        } catch (message) {
            fallbackResult(message);
        }
        // console.log('Udah kepanggil belum ya id nya: ', idGenre);
        pagination();
    }
    btnGenre.addEventListener('click', onGenreClicked);
    
    const pagination = () => {
        if (page !== 1) {
            btnPrev.style.visibility = 'visible';
        } else {
            btnPrev.style.visibility = 'hidden';
        }
        btnPrev.addEventListener('click', prevPage);
        btnNext.addEventListener('click', nextPage);
    }
    
    const prevPage = () => {
        page--;
        pagination();
        if(filterActive.innerText !== ''){
            console.log('Yg prev yg ini');
            onGenreClicked();
        }else{
            onLoad();
        }
    }
    
    const nextPage = () => {
        page++;
        pagination();
        if(filterActive.innerText !== ''){
            console.log('Yg next yg ini');
            onGenreClicked();
        }else{
            onLoad();
        }
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
        let radioActive = document.getElementById(`genre${filterActive.innerText}`);
        paginationEl.classList.remove("d-none");
        paginationEl.classList.add("d-block");
        btnResetSearch.classList.add("d-none");
        radioActive.checked = false;
        searchElement.value = '';
        filterActive.innerText = '';
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

    const filterResults = results => {
        movieList.movies = results;
    }

    onLoad();
    listGenreMovie();
    searchElement.clickEvent = onButtonSearchClicked;

    btnResetSearch.addEventListener('click', onButtonReset);
    

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
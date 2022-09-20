import axios from "axios";

const axiosObj = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: 'c9555f8f9f1a6b2b30400a1f492ec0ed',
    }
});

class DataSource {
    static popularMovie(page) {
        return axiosObj.get(`/movie/popular`, {
            params: {
                page: page,
            }
        }).then(response => {
            return response.data.results;
        }).catch(error => {
            console.log("GET Request Error");
        });
    }

    // https://api.themoviedb.org/3/genre/movie/list?api_key=c9555f8f9f1a6b2b30400a1f492ec0ed&language=en-US
    static movieGenre() {
        return axiosObj.get(`/genre/movie/list`)
            .then(response => {
                // console.log('Response genre: ', response);
                console.log('Cek data genre: ', response.data.genres);
                return response.data.genres;
            })
            .catch(error => {
                console.log('Ada error tak dung dung: ', error);
            });
    }

    static filterGenre(page, idGenre) {
        return axiosObj.get(`/discover/movie`, {
            params: {
                page: page,
                with_genres: idGenre,
            }
        }).then(response => {
            // console.log('Response genre: ', response);
            // console.log('Cek data filtergenre: ', response.data.results);
            return response.data.results;
        }).catch(error => {
            console.log('Ada error tak dung dung: ', error);
        });
    }

    static searchMovie(query) {
        console.log("Cek query: ", query);
        return axiosObj.get(`/search/movie/?query=${query}`)
            .then(response => {
                return response.data.results;
            })
            .catch(error => {
                console.log("Search error", error);
            });
    }
}

export default DataSource;
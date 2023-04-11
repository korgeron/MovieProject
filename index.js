let API_KEY;
let MOVIE_NAME;

const movieContainer = document.querySelector('.movie-container');
const submitAPI_KEY = document.querySelector('.submit-key');
const apiKeyForm = document.querySelector('.todo-list');
const bodyElement = document.querySelector('body');
const movieSection = document.querySelector('.movie-section');
const movieImageBox = document.querySelector('.movie-image');
const movieInfo = document.querySelector('.movie-info');

const populateMovieData = (movieID , key) => {
    fetch(`https://www.omdbapi.com/?apikey=${key}&i=${movieID}`)
        .then(res => res.json())
        .then(data => {
            movieInfo.innerHTML = "";

            console.log(data);
            movieImageBox.style.backgroundImage = `url(${data.Poster})`;
            movieInfo.innerHTML +=
            `
                <div style="text-align: center">
                    <h1>${data.Title}</h1>
                </div>
                <div style="display: flex; justify-content: space-between">
                    <p style="padding: 0 1vw 0 1vw">${data.Type.toUpperCase()} : ${data.Rated}</p>
                    <p style="padding: 0 1vw 0 1vw">${data.Country}</p>
                    <p style="padding: 0 1vw 0 1vw">${data.Language}</p>
                </div>
                <div style="text-align: center">
                    <p>${data.Plot}</p>
                </div>
                <div style="text-align: center">
                    <p>Actors: ${data.Actors}</p>
                </div>
            `
        })
}

submitAPI_KEY.addEventListener('click', ()=>{


    API_KEY = document.querySelector('.api-key').value;
    MOVIE_NAME = document.querySelector('#movie-title').value;
    let URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${MOVIE_NAME}`

    if (MOVIE_NAME != ""){
    apiKeyForm.style.display = 'none';
    movieSection.style.display = 'grid';
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.Error == "Movie not found!"){
            apiKeyForm.style.display = 'flex';
            movieSection.style.display = 'none';
            apiKeyForm.prepend("CAN'T FIND THAT MOVIE TITLE");
        }
        data.Search.forEach(movie => {
            movieContainer.innerHTML +=
                `<div class="movie-card" style="background-image: url(${movie.Poster})">
                    <input class="movie-id" type="hidden" value="${movie.imdbID}" />
                    <div class="movie-title">${movie.Title}</div>
                </div>`;
        })

            let movieIDs = document.querySelectorAll('.movie-id');
            let movies = document.querySelectorAll('.movie-card');

            movieIDs.forEach((id , i) => {
                if (i == 0) populateMovieData(id.value, API_KEY);
            })

            movies.forEach(movieClick => {
                movieClick.addEventListener('click', ()=>{
                    let ID = movieClick.firstElementChild.value;
                    populateMovieData(ID , API_KEY);
                })

            })

    })
    } else{
        apiKeyForm.prepend('SEARCH FOR A VALID MOVIE TITLE');
    }

});



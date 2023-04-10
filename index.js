let API_KEY;
let MOVIE_NAME;

const movieContainer = document.querySelector('.movie-container');
const submitAPI_KEY = document.querySelector('.submit-key');
const apiKeyForm = document.querySelector('.todo-list');
const bodyElement = document.querySelector('body');
const movieSection = document.querySelector('.movie-section');

submitAPI_KEY.addEventListener('click', ()=>{
    API_KEY = document.querySelector('.api-key').value;
    MOVIE_NAME = document.querySelector('#movie-title').value;
    let URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${MOVIE_NAME}`
    apiKeyForm.style.display = 'none';
    movieSection.style.display = 'grid';


    fetch(URL)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.Search.forEach(movie => {
            movieContainer.innerHTML +=
                `<div class="movie-card" style="background-image: url(${movie.Poster})">
                    <div class="movie-title">${movie.Title}</div>
                </div>`;
        })
    });
})

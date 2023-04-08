let API_KEY;
let MOVIE_NAME;

const submitAPI_KEY = document.querySelector('.submit-key');
const apiKeyForm = document.querySelector('.todo-list');
const bodyElement = document.querySelector('body');

submitAPI_KEY.addEventListener('click', ()=>{
    API_KEY = document.querySelector('.api-key').value;
    MOVIE_NAME = document.querySelector('.movie-title').value;
    apiKeyForm.style.display = 'none';




    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${MOVIE_NAME}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });
})

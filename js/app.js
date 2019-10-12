const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const filmList = document.querySelector('.film-list');
const searchList = document.querySelector('.last-search-list');
const clearBtn = document.querySelector('.clearStore');
const APIKEY = '82751509';
let storedSearches = localStorage.getItem('searches');
let searches = JSON.parse(storedSearches) == null ? [] : JSON.parse(storedSearches);
searchForm.addEventListener('submit',getMovies);


function getMovies(e){
  e.preventDefault();
  let query = searchInput.value;
  fetch(`http://www.omdbapi.com/?s=${query}&apikey=${APIKEY}`)
  .then(response => response.json())
  .then(data => {
    if(data.Search){
      renderUI(data.Search);
    }else{
      filmList.innerHTML = 'Your film was not found..';
    }
  })
  .catch(err => console.log(err));
  setStoredMovies(query)
  searchInput.value = '';
  
  /* let lastOutput = '';
  lastOutput += `<li>${}<li>` */
}


function setStoredMovies(query){
  if(localStorage.getItem('searches') === null){
    searches = [];
  }
  searches.push(query);
  localStorage.setItem("searches",JSON.stringify(searches));
  listStoredMovies(searches);
}

function listStoredMovies(searches){
  let output = '';
  searches.forEach(key => {
    output += `<li>${key}<li>`
  });

  searchList.innerHTML = output;
}

listStoredMovies(searches);


function renderUI(movieList){
  let output = '';
  movieList.forEach(movie => {
    output += `
      <li>
        <h3><a href="https://www.google.com/search?q=${movie.Title}&tbm=vid" target="_blank">${movie.Title} <span>(${movie.Year})</span></a></h3>
      </li>
    `;
  })

  filmList.innerHTML = output;
}


clearBtn.addEventListener('click',() => {
  searches = [];
  localStorage.clear();
  listStoredMovies(searches);
})
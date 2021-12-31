const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const moviesList = document.querySelector('.movies-list');
const form = document.querySelector('.form');
const searchMovie = document.querySelector('#search-movie');

// Initaially get movies by popularity
async function getMovies(url) {
  const response = await fetch(url);
  const responseData = await response.json();

  console.log(responseData);

  showMovies(responseData.results);
}
getMovies(APIURL);

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red'
  }
}

function showMovies(movies) {
  // clear main
  moviesList.innerHTML = '';

  movies.forEach((movie) => {
    const {poster_path, title, vote_average} = movie;
    moviesList.innerHTML += `<li class="movie mx-2">
                           <img src="${IMGPATH + poster_path}" alt="${title}">
                           <div class="movie-infos">
                             <h3>${title}</h3>
                             <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                           </div>
                         </li>
                        `;
  });
} 

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchMovie.value;

  if(searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    searchMovie.value = '';
  }
});

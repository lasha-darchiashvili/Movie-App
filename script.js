// API info
const info = {
  url: "https://api.themoviedb.org/3",
  key: "api_key=78828dca7949b70ca50313e4d49660d1",
  img_path: "https://image.tmdb.org/t/p/w500",
  movies_path: "/discover/movie?sort_by=popularity.desc",
  search: "/search/movie?",
};

// popular movies url
const url = `${info.url + info.movies_path}&${info.key}`;

// search movie url
const searchUrl = `${info.url + info.search + info.key}&query=`;

// Selectors
const movies = document.querySelector(".movies");
const form = document.querySelector("form");

// fetching data and also displaying on page
fetchMoviesData(url);

// fetching function
function fetchMoviesData(url) {
  fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      displayMovies(data);
    })
    .catch((err) => console.log(err));
}

//  This function takes fetched data as an argument and then displays all movies on page. This function is used in fetchMoviesData()
function displayMovies(data) {
  data.results.forEach((movie) => {
    const imgurl = `${info.img_path + movie.poster_path}`;
    const { original_title, release_date, vote_average } = movie;
    const newMovie = createMovieEl(
      // creates new movie element for each movie
      imgurl,
      original_title,
      release_date,
      vote_average
    );
    movies.append(newMovie);
  });
}

// creating single movie element. Function takes movies info as multiple arguments.
// This function is used for creating single movie boxes for all movies in displayMovies function
function createMovieEl(imgSrc, title, date, rating) {
  const movieBox = document.createElement("div"); //creating movie card element
  movieBox.classList.add("movie-cont");

  const movieImg = document.createElement("img"); // creating img element
  movieImg.classList.add("movie");
  movieImg.setAttribute("alt", "moviephoto");
  movieImg.setAttribute("src", imgSrc);
  movieBox.append(movieImg);

  const movieInfo = document.createElement("div"); // creating movie info element
  movieInfo.classList.add("movie-info");
  movieInfo.innerHTML = `
                        <p class="moviename">${title}</p>
                        <div class="additionalinfo">
                            <p class="year">${date}</p>
                            <p class="rating"><i class="far fa-star"></i> ${rating}</p>
                        </div>  
                        <div class="overlay"></div>
                        `;
  movieBox.append(movieInfo);
  return movieBox;
}

// addeventlistener on search. function displays searched movies
form.addEventListener("submit", (e) => {
  let movieName = document.querySelector(".searchbar");
  e.preventDefault();
  if (!movieName.value) {
    alert("Please enter valid movie");
    return;
  }
  movies.innerHTML = ""; // clearing movie data on page before fetching searched data
  fetchMoviesData(searchUrl + movieName.value);
  movieName.value = "";
});

// slider;
var splide = new Splide(".splide", {
  arrows: 0,
  autoplay: true,
  pagination: false,
  //   wheel: true,
  interval: 5000,
  rewind: true,
});
splide.mount();

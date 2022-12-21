/* we are getting the public key, private key, timestamp & hash based on the marvel api document for using the URL */
var marvelPublicKey = "404dba227267b0de961684a075bf34fd";
var marvelPrivateKey = "39adbe8bcae7bda20123e25d14346c492ffa4ca2";
/* query selecting the search button */
document
  .querySelector("#search-button")
  .addEventListener("click", async function () {
    /* storing the input movie title value in a variable */
    let movieTitleInput = document.querySelector("#title-search-input").value;
    /* if there is value available in the varaiable , if condition executes */
    if (movieTitleInput) {
      /* we are spliting the value that we get from input field using 'split(" ")-split by space' */
      let startsWith = movieTitleInput.split(" ")[0];
      /* unix() returns value in millisecond */
      let timeStamp = dayjs().unix();
      let hash = md5(timeStamp + marvelPrivateKey + marvelPublicKey);
      let marvelApi =
        "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
        startsWith +
        "&apikey=404dba227267b0de961684a075bf34fd&ts=" +
        timeStamp +
        "&hash=" +
        hash;
      let result;
      /* 'await' is used to pause the next line execution till we get the fetch response */
      await fetch(marvelApi)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          result = data;
        });
      /* if below condition is satisfied then we fetch omdb api and get the movie title details */
      if (result && result.data.results.length > 0) {
        let movieDetails;
        let omdbApi =
          "http://www.omdbapi.com/?t=" + movieTitleInput + "&apikey=6d258141";
        await fetch(omdbApi)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            movieDetails = data;
          });
        if (movieDetails) {
          let rottenTomatoes = movieDetails.Ratings.find(
            (rating) => rating.Source === "Rotten Tomatoes"
          );
          let element = `<div class="card-divider grid-x full-card">
          <div class="cell large-6">
            <h2 class="movie-title cell expanded text-center">${
              movieDetails.Title
            }</h2>
            <p class="movie-released cell expanded text-center">
              RELEASED DATE: ${movieDetails.Released}
            </p>
            <img src=${movieDetails.Poster}/>
          </div>
          <div class="cell large-6">
            <p class="movie-plot">PLOT: ${movieDetails.Plot}</p>
           <p class="movie-actors">ACTORS: ${movieDetails.Actors} </p>
            <p class="movie-rating-imdb">IMDB Rating: ${
              movieDetails.imdbRating
            }</p>
            <p class="movie-rating-rotten">Rotten Tomatoes: ${
              rottenTomatoes ? rottenTomatoes.Value : ""
            }</p>
          </div>`;
          document.querySelector("#movie-info").innerHTML = element;
        }
      } else {
        // ask them to write a div for displaying this
        console.log("no results found");
      }
    }
  });

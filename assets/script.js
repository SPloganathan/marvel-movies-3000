/* we are getting the public key, private key, timestamp & hash based on the marvel api document for using the URL */
var marvelPublicKey = "404dba227267b0de961684a075bf34fd";
var marvelPrivateKey = "39adbe8bcae7bda20123e25d14346c492ffa4ca2";
/* query selecting the search button */
document
  .querySelector("#movie-button")
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
        /* if we get the moviedetails then the following logic executes */
        if (movieDetails) {
          /* creating a variable to store the value of rotten tomatoes rating. we are finding the value using find() since it is a array */
          let rottenTomatoes = movieDetails.Ratings.find(
            (rating) => rating.Source === "Rotten Tomatoes"
          );
          /* dynamically setting all values */
          let element = `<div class="card-divider grid-x full-card">
          <div class="cell large-6">
            <h2 class="movie-title cell expanded text-center">${
              movieDetails.Title
            }</h2>
            <p class="movie-released cell expanded text-center">
              RELEASED DATE: ${movieDetails.Released}
            </p>
            <img class="float-center" src=${movieDetails.Poster}/>
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
          document.querySelector("#poster-section").style.display = "none";
          /* in the above line the ternary operator ? is used to find if there is a value available in the rottentomatoes variable and if yes it display the value else display the empty string. */
          document.querySelector("#movie-info").innerHTML = element;
        }
      } else {
        // ask them to write a div for displaying this
        console.log("no results found");
      }
    }
  });

window.onload = async () => {
  /* setting all newly released movies in the array */
  let recentMovies = [
    "Black Panther: Wakanda Forever",
    "Thor: Love and Thunder",
    "Doctor Strange in the Multiverse of Madness",
    "Spider-Man: No Way Home",
    "Eternals",
    "Shang-Chi and The Legend of The Ten Rings",
  ];
  /* setting an empty variable to concatenate */
  let element = "";
  /* using for looping through every movie title in the array and fetching the details from omdb */
  for (let i = 0; i < recentMovies.length; i++) {
    let omdbApi =
      "http://www.omdbapi.com/?t=" + recentMovies[i] + "&apikey=6d258141";
    let result;
    await fetch(omdbApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        result = data;
      });
    /* setting the results dynamically through JS in HTML */
    element += `<div class="cell custom-cell" id="movie-poster" data-movie-title="${result.Title}">
    <div class="card custom-card" data-movie-title="${result.Title}">
      <div class="card-section" data-movie-title="${result.Title}">
        <img src=${result.Poster}  data-movie-title="${result.Title}"/>
      </div>
      <div class="card-section" data-movie-title="${result.Title}">
        <h4 data-movie-title="${result.Title}">${result.Title} </h4>
        <p data-movie-title="${result.Title}">${result.Released}</p>
      </div>
    </div>
  </div>`;
  }

  document.querySelector("#poster-section").innerHTML = element;
  getCharacters();
};

setTimeout(() => {
  document.querySelectorAll("#movie-poster").forEach((eachElement) => {
    eachElement.addEventListener("click", async function (event) {
      let movieTitle = event.target.getAttribute("data-movie-title");
      if (movieTitle) {
        let movieDetails;
        let omdbApi =
          "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=6d258141";
        await fetch(omdbApi)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            movieDetails = data;
          });
        /* if we get the moviedetails then the following logic executes */
        if (movieDetails) {
          /* creating a variable to store the value of rotten tomatoes rating. we are finding the value using find() since it is a array */
          let rottenTomatoes = movieDetails.Ratings.find(
            (rating) => rating.Source === "Rotten Tomatoes"
          );
          /* dynamically setting all values */
          let element = `<div class="card-divider grid-x full-card">
          <div class="cell large-6">
            <h2 class="movie-title cell expanded text-center">${
              movieDetails.Title
            }</h2>
            <p class="movie-released cell expanded text-center">
              RELEASED DATE: ${movieDetails.Released}
            </p>
            <img class="float-center" src=${movieDetails.Poster}/>
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
          document.querySelector("#poster-section").style.display = "none";
          /* in the above line the ternary operator ? is used to find if there is a value available in the rottentomatoes variable and if yes it display the value else display the empty string. */
          document.querySelector("#movie-info").innerHTML = element;
        }
      }
    });
  });
}, 3000);

/* get characters function is placed inside onload function so that it will be called when page is loaded */
async function getCharacters() {
  let characters = [
    "iron man",
    "captain america",
    "hulk",
    "thor",
    "black widow",
    "loki",
  ];
  /* setting an empty variable to concatenate */
  let characterElement = "";
  for (let i = 0; i < characters.length; i++) {
    let timeStamp = dayjs().unix();
    let hash = md5(timeStamp + marvelPrivateKey + marvelPublicKey);
    let marvelApi =
      "https://gateway.marvel.com:443/v1/public/characters?name=" +
      characters[i] +
      "&apikey=404dba227267b0de961684a075bf34fd&ts=" +
      timeStamp +
      "&hash=" +
      hash;
    let result;
    await fetch(marvelApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        result = data;
      });
    if (result && result.data && result.data.results.length > 0) {
      let characterDetails = result.data.results[0];
      /* setting the results dynamically through JS in HTML */
      /* in the href we are adding '?' to query the characters name when landing on the next page */
      characterElement += `<a class="cell custom-cell" href="./character.html?name=${
        characterDetails.name
      }"  ><div class="cell custom-cell"  data-movie-title=${
        characterDetails.name
      }>
    <div class="card custom-card">
      <div class="card-section">
        <img src=${
          characterDetails.thumbnail.path +
          "." +
          characterDetails.thumbnail.extension
        }  data-movie-title="${characterDetails.name}"/>
      </div>
      <div class="card-section">
        <h4>${characterDetails.name}</h4>
       
      </div>
    </div>
  </div></a>`;
    }
  }
  document.querySelector("#character-poster").innerHTML = characterElement;
}

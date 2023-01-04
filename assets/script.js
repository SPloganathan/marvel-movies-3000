/* we are getting the public key, private key, timestamp & hash based on the marvel api document for using the URL */
var marvelPublicKey = "404dba227267b0de961684a075bf34fd";
var marvelPrivateKey = "39adbe8bcae7bda20123e25d14346c492ffa4ca2";
/* query selecting the search button */
document
  .querySelector("#movie-button")
  .addEventListener("click", async function () {
    /* storing the input movie title value in a variable */
    let movieTitleInput = document.querySelector("#title-search-input").value;
    /* if there is value available in the variable , if condition executes */
    if (movieTitleInput) {
      /* we are splitting the value that we get from input field using 'split(" ")-split by space' */
      let startsWith = movieTitleInput.split(" ")[0];
      /* unix() returns value in millisecond */
      let timeStamp = dayjs().unix();
      let hash = md5(timeStamp + marvelPrivateKey + marvelPublicKey);
      let marvelApi =
        "https://us-central1-marvel-api-f42f2.cloudfunctions.net/marvelMovie?Title=" +
        movieTitleInput;
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
      if (result && result.data) {
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
        /* if we get the moviedet
        ails then the following logic executes */
        if (movieDetails) {
          /* creating a variable to store the value of rotten tomatoes rating. we are finding the value using find() since it is a array */
          let rottenTomatoes = movieDetails.Ratings.find(
            (rating) => rating.Source === "Rotten Tomatoes"
          );
          /* dynamically setting all values */
          let element = `<div class="card-divider grid-x full-card" id="movie-back">
          <div class="cell large-6 ">
            <h2 class="movie-title cell expanded text-center">${
              movieDetails.Title
            }</h2>
            <p class="movie-released cell expanded text-center">
              <strong>RELEASED DATE</strong>: ${movieDetails.Released}
            </p>
            <img class="float-center" src=${movieDetails.Poster}/>
          </div>
          <div class="cell large-6 movie-summaries">
            <p class="movie-plot"><strong>PLOT</strong>: ${
              movieDetails.Plot
            }</p>
           <p class="movie-actors"><strong>ACTORS</strong>: ${
             movieDetails.Actors
           } </p>
            <p class="movie-rating-imdb"><strong>IMDB Rating</strong>: ${
              movieDetails.imdbRating
            }</p>
            <p class="movie-rating-rotten"><strong>Rotten Tomatoes</strong>: ${
              rottenTomatoes ? rottenTomatoes.Value : ""
            }</p>
          </div>`;
          document.querySelector("#poster-section").style.display = "none";
          /* in the above line the ternary operator ? is used to find if there is a value available in the rottentomatoes variable and if yes it display the value else display the empty string. */
          document.querySelector(".movie-details").style.display = "block";
          document.querySelector("#movie-info").innerHTML = element;
          addMovieNameToLocalStorage(movieTitleInput);
          addCharacterTextToLocalstorage(Input);
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
  getMovieList();
  getCharacterList();
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
          let element = `<div class="card-divider grid-x full-card " id="movie-back">
          <div class="cell large-6">
            <h2 class="movie-title cell expanded text-center">${
              movieDetails.Title
            }</h2>
            <p class="movie-released cell expanded text-center">
              RELEASED DATE: ${movieDetails.Released}
            </p>
            <img class="float-center" src=${movieDetails.Poster}/>
          </div>
          <div class="cell large-6 movie-summaries">
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
          document.querySelector(".movie-details").style.display = "block";
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
      }"  ><div class="cell custom-cell" data-movie-title=${
        characterDetails.name
      }>
    <div class="card custom-card" id="char-poster">
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
  document.querySelector("#character-poster").style.background =
    characterElement;
}

/* logic for character search */
document
  .querySelector("#character-search-button")
  .addEventListener("click", function () {
    let character = document.querySelector("#character-text").value;
    if (character) {
      window.location.href = "./character.html?name=" + character;
    }
  });

/* autofill implementation for movie search field */
async function getMovieList() {
  let response = await fetch(
    "https://us-central1-marvel-api-f42f2.cloudfunctions.net/marvelMovie"
  );
  let data = await response.json();
  let movieLists = data.data;
  if (movieLists.length > 0) {
    let names = movieLists.map((title) => {
      return title.Title;
    });
    //Sort names in ascending order
    let sortedNames = names.sort();
    let input = document.getElementById("title-search-input");
    //Execute function on keyup
    input.addEventListener("keyup", (e) => {
      //loop through above array
      //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
      removeElements();
      for (let i of sortedNames) {
        //convert input to lowercase and compare with each string
        if (
          input.value !== "" &&
          i.toLowerCase().startsWith(input.value.toLowerCase())
        ) {
          //create li element
          let listItem = document.createElement("li");
          //One common class name
          listItem.classList.add("list-items");
          listItem.style.cursor = "pointer";
          listItem.addEventListener("click", function () {
            input.value = i;
            removeElements();
          });
          //Display matched part in bold
          let word = "<b>" + i.substr(0, input.value.length) + "</b>";

          word += i.substr(input.value.length);

          //display the value in array
          listItem.innerHTML = word;
          document.querySelector(".list").appendChild(listItem);
        }
      }
    });
  }
}

/* autofill implementation for character search field */
async function getCharacterList() {
  //Execute function on keyup
  let input = document.getElementById("character-text");
  input.addEventListener("keyup", async (e) => {
    let timeStamp = dayjs().unix();
    let hash = md5(timeStamp + marvelPrivateKey + marvelPublicKey);
    let marvelApi =
      "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
      input.value +
      "&limit=100" +
      "&apikey=404dba227267b0de961684a075bf34fd&ts=" +
      timeStamp +
      "&hash=" +
      hash;
    let response = await fetch(marvelApi);
    let data = await response.json();
    let characterList = data.data.results;

    let names = characterList.map((title) => {
      return title.name;
    });
    //Sort names in ascending order
    let sortedNames = names.sort();
    //loop through above array
    //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
    removeElements();
    for (let i of sortedNames) {
      //convert input to lowercase and compare with each string
      if (
        input.value !== "" &&
        i.toLowerCase().startsWith(input.value.toLowerCase())
      ) {
        //create li element
        let listItem = document.createElement("li");
        //One common class name
        listItem.classList.add("list-items");
        // listItem.style.cursor = "pointer";
        listItem.addEventListener("click", function () {
          input.value = i;
          removeElements();
        });
        //Display matched part in bold
        let word = "<b>" + i.substr(0, input.value.length) + "</b>";

        word += i.substr(input.value.length);

        //display the value in array
        listItem.innerHTML = word;
        document.querySelector(".character-list").appendChild(listItem);
      }
    }
  });
}

let removeElements = () => {
  //clear all the item
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
};

/* local storage implementation for movie search */
function addMovieNameToLocalStorage(name) {
  /* first checking if there is any movie names available in local storage */
  let availableMovies = window.localStorage.getItem("movieName");
  /* if there is a movie name */
  if (availableMovies) {
    let parsedMovie = JSON.parse(availableMovies);
    /* in the above line we will get the array of movie name */
    /* in the below line we are checking if the name is already available in local storage */
    if (!parsedMovie.includes(name)) {
      parsedMovie.push(name);
      window.localStorage.setItem("movieName", JSON.stringify(parsedMovie));
    }
  } else {
    /* 'movieName' is the key and the 'name' is value and setting the value as a array */
    window.localStorage.setItem("movieName", JSON.stringify([name]));
  }
  appendMovieNames();
}

/* writing a function to append the movie names from loacl storage to the UI as buttons */
function appendMovieNames() {
  let availableMovies = window.localStorage.getItem("movieName");
  /* if there is a movie name */
  if (availableMovies) {
    let parsedMovie = JSON.parse(availableMovies);
    let buttonElement = "";
    for (let i = 0; i < parsedMovie.length; i++) {
      /* since we doesnt know the number buttons to be displayed we are trying to append it using dynamic JS */
      buttonElement += ` <button class="button secondary custom-button" id="search-movie-button" data-movieName="${parsedMovie[i]}">
      ${parsedMovie[i]}
    </button>`;
    }
    document.querySelector("#searched-movie").innerHTML = buttonElement;
  }
}
appendMovieNames();

/*writing a logic to append the suggestion buttons into the text field */
document
  .querySelector("#searched-movie")
  .addEventListener("click", function (event) {
    if (event.target.nodeName !== "BUTTON") {
      return;
    }
    let movieName = event.target.getAttribute("data-movieName");
    document.querySelector("#title-search-input").value = movieName;
  });

function addCharacterTextToLocalstorage(character) {
  let availableCharacters = window.localStorage.getItem("characterText");
  if (availableCharacters) {
    let parsedCharacter = JSON.parse(availableCharacters);
    if (!parsedCharacter.include(character)) {
      parsedCharacter.push(character);
      window.localStorage.setItem("characterText", JSON.stringify(parsedCharacter));
    }
  } else {
    windows.localStorage.setItem("characterText", JSON.stringify([character]));
  }
  appendCharacter();
}

function appendCharacter() {
  let availableCharacters = window.localStorage.getItem("characterText");
  if (availableCharacters) {
    let parsedCharacter = JSON.parse(availableCharacters);
    let buttonElement = "";
    for (let i = 0; i < parsedCharacter.length; i++) {
      buttonElement += ` <button class="button secondary custom-button" id="character-search-button" data-characterText="${parsedCharacter[i]}">
      ${parsedCharacter[i]}
    </button>`;
  }
    document.querySelector("#searched-character").innerHTML = buttonElement;
  }
}
appendCharacter();

document
  .querySelector("#searched-character")
  .addEventListener("click", function(event) {
    if (event.target.nodeName !== "BUTTON") {
      return;
    }
    let characterText = event.target.getAttribute("data-characterText");
    document.querySelector("#character-text").value = characterText;
  });
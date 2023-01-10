# __MARVEL MOVIE 3000__ 🦾🤖🎥


## __Table of Contents__ 🐜👨🏻
- [Overview](#overview-🕷👨)
 - [The Challenge](#the-challenge-👨😡💪🍏)
 - [Screenshots](#screenshots-🖐🏼🌀🧛🏻‍♂️)
 - [Links](#links-🩸🧙‍♀️)
- [Our Process](#our-process-⍟🦸‍♂️)
 - [Built With](#built-with-🦅👁)
 - [What We Learned](#what-we-learned-🔫👱‍♂️🎧🎶)
 - [Continued Development](#continued-development-⚫️👩🏻‍🦰)
 - [Useful Resources](#useful-resources-🙅🏿🐈‍⬛👨🏿‍🦱)
- [Authors](#authors-stan)
- [Acknowledgments](#acknowledgments-🚀🦝)

<br>
<hr>
<br>

## __Overview__ 🕷👨 
​MARVEL MOVIE 3000 allows the user to search for movies and characters related to the Marvel Universe.

<br>
<hr>
<br>

### __The Challenge__ 👨😡💪🍏
​
___Users should be able to___:
​
- Type a movie or a character from Marvel that they would like to get information about.

- Also, they should be able to click on the movie or character cards to generate information that way if they want to.

<br>
<hr>
<br>

### __Screenshots__ 🖐🏼🌀🧛🏻‍♂️
<br>

![main-page](./assets/img/Web%20capture_28-12-2022_211430_127.0.0.1.jpeg)

<br>
<hr>
<br>

![searched-movie](./assets/img/Web%20capture_28-12-2022_211452_127.0.0.1.jpeg)

<br>
<hr>
<br>

![character-page](/assets/img/Screenshot%202023-01-03%2017.40.18.png)

<br>
<hr>
<br>

### __Links__ 🩸🧙‍♀️

- Our Repository: [Github Repo](https://github.com/appleschaussaa/marvel-movies-3000)
- Published URL: [See it in Action!](https://appleschaussaa.github.io/marvel-movies-3000/)

<br>
​<hr>
<br>

## __Our Process__ ⍟🦸‍♂️

* Started off using Excalidraw to create a wireframe.
![wireframe](./assets/img/wireframe.png)

* Once the wireframing was done, we split up the work that needed to be done.

* An index.html and a character.html were created.

* We decided to use Foundation as our framework and started styling our pages.

* Once the html and styling were almost completed the javascript was started.

* Script files were created for the index page and as well as the character page. A third one was created as well which is titled md5.js and the reason for this file is to create a hash which is being used by the Marvel API.

* Once all the files were created, it was just a manner of finalizing/tweaking the code to get the desired effect for our webpage.

<br>
<hr>
<br>

### __Built with__ 🦅👁

- Semantic HTML5 markup
- CSS Custom Properties
- Foundation (Bootstrap Alternative)
- CSS Grid
- Javascript
- Mobile-first workflow
- [OMDB API](https://www.omdbapi.com/)
- [Marvel API](https://rapidapi.com/stefan.skliarov/api/Marvel/)

<br>
<hr>
<br>

### __What We learned__ 🔫👱‍♂️🎧🎶
​
The following are examples within our code that we learned from doing this project.
​
​
```html
HTML is done using Foundation Framework.

<input type="text" autocomplete="off"/>

<div class="cell large-10"></div>

<div class="grid-x grid-margin-x small-up-2 medium-up-3 pt15"></div>
```
​
```css
.pt15 {
  padding-top: 50px !important;
}
```
​
```js
await fetch(marvelApi)
.then(function (response) {
  return response.json();
 })
.then(function (data) {
  result = data;
});


let rottenTomatoes = movieDetails.Ratings.find(
 (rating) => rating.Source === "Rotten Tomatoes"
);


buttonElement += ` <button class="button secondary custom-button" id="search-movie-button" data-movieName="${parsedMovie[i]}">
    ${parsedMovie[i]}
    </button>`;
document.querySelector("#searched-movie").innerHTML = buttonElement;
```

<br>
<hr>
<br>

### __Continued Development__ ⚫️👩🏻‍🦰
​
After finishing our project, we understand things more clearly now. We also understand Foundation well enough now to be able to use it without too much of an issue. We have better understanding of CSS and Javascript and so for our future projects we hope to implement our knowledge into those future projects to make them better than what we have right now.

<br>
<hr>
<br>

### __Useful Resources__ 🙅🏿🐈‍⬛👨🏿‍🦱
​
- [Markdown Guide](https://github.com/darsaveli/Readme-Markdown-Syntax) - This really helps with the understanding of Markdown syntax for READMEs and it allowed us to create a nicely structured README.
- [Font Generator](https://www.fontgenerator.org/full-crazy) - Google Fonts was not able to provide the font that we wanted so we turned to this Font Generator to create special fonts. All we had to do was type in the words that we wanted to have generated and then we copied and pasted them into the html.
- [Hashing](https://lig-membres.imag.fr/donsez/cours/exemplescourstechnoweb/js_securehash/) - MD5 is a cryptographic hash function algorithm that takes the message as input of any length and changes it into a fixed-length message of 16 bytes. MD5 algorithm stands for the message-digest algorithm.

<br>
<hr>
<br>

## __Authors__ ![Stan](./assets/img/StanLee_Think.png)

- Sakthipriya Loganathan 
    *  GitHub - [SPloganathan](https://github.com/SPloganathan)
- Robert Schauss 
    *  GitHub - [Robert](https://github.com/appleschaussaa)
- Paull Shin 
    *  GitHub - [paullsshin](https://github.com/paullsshin)

<br>
<hr>
<br>

## __Acknowledgments__ 🚀🦝
​
Everyone in our group did an amazing job! We each split our work into sections that were manageable and whenever we needed help or someone saw something that could cause an issue, it was addressed almost right away. Everyone contributed so much of their time and effort and we are happy with what we created! Hope you guys enjoy!

<br>
<hr>
​


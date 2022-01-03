var APIKey = "a2a12eb8"
var titleEl = document.getElementById('title');
var timeEl = document.getElementById('release-time');
var writersEl = document.getElementById('writers');
var plotEl = document.getElementById('plot');
var similarEl = document.getElementById('similar-results');
var saveBtnEl = document.getElementById('save-btn');
var movieData = {};

displayInfo();
// generate data and put into info-page
function displayInfo() {
  // get info from query in url
  var queryString = document.location.search;
  var title = queryString.split("=")[1].trim();
  var year = queryString.split("=")[2].trim();

  // generate url
  var apiURL =
    "https://www.omdbapi.com/?i=tt3896198&apikey=" +
    APIKey +
    "&t=" +
    title +
    "&y=" +
    year +
    "&plot=full";

    // fetch detailed data from imdbID
    fetch(apiURL)
        .then(function (response) {
            if (!response.ok) {
              return;
            }
            return response.json();
          })
          .then(function (data) {
            if (data.Response == "True") {
                // display data in relevant fields
                // Title
                titleEl.innerHTML = data.Title;
                // time until release //TODO calculate
                timeEl.innerHTML = data.Released;
                // plot and description information
                plotEl.innerHTML = "Plot: " + data.Plot;
                writersEl.innerHTML = "Writers: " + data.Writer;

                getComicApi(title.split("&y")[0]);
                // Save info to localstorage
                createDataObject(data);
            }
          });
}

// Save title, release date, poster image, and plot to localstorage
function createDataObject(data) {
  var movieTitle = data.Title;
  var movieID = data.imdbID;
  var movieDate = data.Released;
  var movieImage = data.Poster;
  var moviePlot = data.Plot;
  movieData = {
    title: movieTitle,
    imdbID: movieID,
    date: movieDate,
    image: movieImage,
    plot: moviePlot
  };
}

// listen for "save" button click
saveBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  // Save currently displayed movie to storage
  saveToStorage();
})

function saveToStorage() {
  // get current array of saved movies
  var storedMovieArr = localStorage.getItem('movieData');
  if (storedMovieArr) {
    storedMovieArr = JSON.parse(storedMovieArr);
    // for each object in the array, parse it and add it back to the array
    for (var i = 0; i < storedMovieArr.length; i++) {
      storedMovieArr[i] = JSON.parse(storedMovieArr[i]);
    }
  } else {
    storedMovieArr = [];
  }
  // add current movie to list
  // check if movie is already on list
  for (var i = 0; i < storedMovieArr.length; i++) {
    if (storedMovieArr[i].imdbID === movieData.imdbID) {
      // if imdbID is already in the list return 
      return;
    }
  }
  // imdbID of the data is not in saved list already
  storedMovieArr.push(movieData);
  // re-stringify storedMoiveArr
  for (var i = 0; i <storedMovieArr.length; i++) {
    storedMovieArr[i] = JSON.stringify(storedMovieArr[i]);
  }
  storedMovieArr = JSON.stringify(storedMovieArr);
  localStorage.setItem('movieData', storedMovieArr);
}

// related content (fetching from 2nd AIP)

var comicApiPublicKey = "b6086cc7ddad64bdcdc0d9681c40e48d";
var comicApiPrivateKey = "171a555d8009414cf5e463747ef4a609ff79e0bd";
var ts = new Date();
var hashMD5 = CryptoJS.MD5(
  ts + comicApiPrivateKey + comicApiPublicKey
).toString();

// Marvel database search
function getComicApi(title) {
  var character = title.split(":")[0];
  var comicApiURL =
  "https://gateway.marvel.com:443/v1/public/comics?" +
  "ts=" +
  ts +
  "&titleStartsWith=" +
  character +
  "&format=comic&formatType=comic&noVariants=false&orderBy=title&limit=15&apikey=" +
  comicApiPublicKey +
  "&hash=" +
  hashMD5;
  fetch(comicApiURL)
    .then(function (response) {
      if (!response.ok) {
      }
      return response.json();
    })
    .then(function (data) {
      displaySimilarResults(data.data.results);
    });
}

// this function displays the comic cover photo and title
function displaySimilarResults(comicResults){
  var comic = document.createElement("p");
  for(let t=0; t<comicResults.length; t++){
    var comicEl = document.createElement("p");
    var comicPoster = document.createElement("img");
    comicPoster.src = comicResults[t].thumbnail.path + "." +comicResults[t].thumbnail.extension;
    comicPoster.onclick = function(){
      window.location.href = comicResults[t].urls[0].url;
    }
    comicPoster.style.maxHeight = "100%";
    comicPoster.style.maxWidth = "auto";
    comicPoster.style.height = "100%";
    comicPoster.style.width = "auto";
    comicEl.appendChild(comicPoster);
    var comicTitle = document.createElement("a");
    comicTitle.href = comicResults[t].urls[0].url;
    comicTitle.innerHTML = comicResults[t].title;
    comicEl.appendChild(comicTitle);
    comicEl.style.display = "flex";
    comicEl.style.flexDirection = "column";
    comicEl.style.flexBasis = "30%";
    comic.appendChild(comicEl)

  }
  comic.style.display = "flex";
  comic.style.flexDirection = "row";
  comic.style.width = "100%";
  comic.style.flexWrap = "wrap";
  comic.style.columnGap = "5%";
  similarEl.appendChild(comic);
  
}

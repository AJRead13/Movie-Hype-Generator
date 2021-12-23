var APIKey = "a5e84bc6";

var comicApiPublicKey = "b6086cc7ddad64bdcdc0d9681c40e48d";
var comicApiPrivateKey = "171a555d8009414cf5e463747ef4a609ff79e0bd";
var ts = new Date();
var hashMD5 = CryptoJS.MD5(
  ts + comicApiPrivateKey + comicApiPublicKey
).toString();
var comicApiURL =
  "https://gateway.marvel.com/v1/public/characters?ts=" +
  ts +
  "&orderBy=name&limit=10&apikey=" +
  comicApiPublicKey +
  "&hash=" +
  hashMD5;
// Creating selectors to capture search input
var searchFormEl = document.getElementById("search-form");
var searchInputEl = document.getElementById("search-input");
var yearInputEl = document.getElementById("year-input");
var p = 1;
var idArr = [];
// Fetching from the OMDB Api
function getOmdbApi(title, year) {
  var apiURL =
    "http://www.omdbapi.com/?i=tt3896198&apikey=" +
    APIKey +
    "&s=" +
    title +
    "&y=" +
    year +
    "&page=" +
    p +
    "&plot=full";

  fetch(apiURL)
    .then(function (response) {
      if (!response.ok) {
        return;
      }
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.Response == "True") {
        getSearchResults(data, title, year);
      }
    });
}
// Fetching Marvel Api
function getComicApi(apiURL) {
  fetch(apiURL)
    .then(function (response) {
      if (!response.ok) {
      }
      return response.json();
    })
    .then(function (data) {});
}
getComicApi(comicApiURL);

// Capturing search input
function getSearchInput() {
  var titleVal = searchInputEl.value.trim();
  var yearVal = yearInputEl.value.trim();
  if (!titleVal && !yearVal) {
    return;
  }
  getOmdbApi(titleVal, yearVal);
}

// Getting top ten most recent/future search results
function getSearchResults(data, title, year) {
  if (data.Response == "False") {
    return;
  }
  for (let i = 0; i < data.Search.length; i++) {
    idArr.push(data.Search[i].imdbID);
  }
  iteratePage(title, year);
}
function iteratePage(title, year) {
  p++;
  var pageApiURL =
    "http://www.omdbapi.com/?i=tt3896198&apikey=" +
    APIKey +
    "&s=" +
    title +
    "&y=" +
    year +
    "&page=" +
    p +
    "&plot=full";
  fetch(pageApiURL)
    .then(function (response) {
      if (!response.ok) {
        return;
      }
      return response.json();
    })
    .then(function (data) {
      if (data.Response == "True") {
        for (let i = 0; i < data.Search.length; i++) {
          idArr.push(data.Search[i].imdbID);
        }
        console.log(idArr);
      }
    });
}

searchFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("We are here");
  getSearchInput();
  if (idArr.length > 0) {
    console.log(idArr);
  }
});

var currentDay = document.querySelector("#currentDay");

var dateTime = function () {
  var today = moment().format("MMM Do YYYY");
  // currentDay.textContent = today;
};
setInterval(dateTime, 1000);

// Fetching from Marvel API



// Testing modal
var modalEl = document.getElementById('modal');
var searchButtonEl = document.getElementById('search-button');


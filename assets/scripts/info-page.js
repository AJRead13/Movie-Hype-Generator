var APIKey = "a2a12eb8";
var titleEl = document.getElementById("title");
var timeEl = document.getElementById("release-time");
var writersEl = document.getElementById("writers");
var plotEl = document.getElementById("plot");
var similarEl = document.getElementById("similar-results");

displayInfo();
// TODO generate data and put into info-page
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
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      if (data.Response == "True") {
        // TODO display data in relevant fields
        // Title
        titleEl.innerHTML = data.Title;
        // time until release //TODO calculate
        timeEl.innerHTML = data.Released;
        // plot and description information
        plotEl.innerHTML = "Plot: " + data.Plot;
        writersEl.innerHTML = "Writers: " + data.Writer;
        getComicApi(title.split("&y")[0]);
      }
    });
  // TODO related content (fetching from 2nd AIP)
  // Marvel database search
  // Fetching Marvel Api
  
}

var comicApiPublicKey = "b6086cc7ddad64bdcdc0d9681c40e48d";
  var comicApiPrivateKey = "171a555d8009414cf5e463747ef4a609ff79e0bd";
  var ts = new Date();
  var hashMD5 = CryptoJS.MD5(
    ts + comicApiPrivateKey + comicApiPublicKey
  ).toString();
  
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
        console.log(data.data.results);
        displaySimilarResults(data.data.results);
      });
  }
 
  function displaySimilarResults(comicResults){

    var comic = document.createElement("p");
  


  }
// Fetching from the OMDB Api

var APIKey = "a2a12eb8"

var apiURL = "http://www.omdbapi.com/?i=tt3896198&apikey="+ APIKey;

function getOmdbApi(apiURL){
  fetch(apiURL)
    .then(function(response){
      if(!response.ok){
      }
      return response.json();
    })
    .then(function (data){
    });
};

getOmdbApi(apiURL);









var currentDay = document.querySelector("#currentDay");

var dateTime = function () {
  var today = moment().format("MMM Do YYYY");
  currentDay.textConent = today;
};
setInterval(dateTime, 1000);

// Fetching from Marvel API

var comicApiPublicKey = "b6086cc7ddad64bdcdc0d9681c40e48d";
var comicApiPrivateKey = "171a555d8009414cf5e463747ef4a609ff79e0bd";
var ts = new Date();
var hashMD5 = CryptoJS.MD5(ts + comicApiPrivateKey + comicApiPublicKey).toString();
var comicApiURL = "https://gateway.marvel.com/v1/public/characters?ts="+ts+"&orderBy=name&limit=10&apikey="+comicApiPublicKey+"&hash="+hashMD5;

function getComicApi(apiURL){
  fetch(apiURL)
    .then(function(response){
      if(!response.ok){
      }
      return response.json();
    })
    .then(function (data){
    });
    
};

getComicApi(comicApiURL);

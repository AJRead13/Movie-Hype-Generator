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

// Fetching from Marvel API

var comicApiKey = "87a2a54f6a890d5ea11b4846f3ac4b6c5019ed2d";

var comicApiURL = "http://comicvine.gamespot.com/api/volumes/?api_key="+ comicApiKey + "&format=json";

function getComicApi(apiURL){
  fetch(apiURL)
    .then(function(response){
      if(!response.ok){
        console.log(response);
      }
      return response.json();
    })
    .then(function (data){
      console.log(data);
    });
    
};

getComicApi(comicApiURL);
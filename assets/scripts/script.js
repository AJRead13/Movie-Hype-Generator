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
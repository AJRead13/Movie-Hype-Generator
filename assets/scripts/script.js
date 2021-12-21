// Fetching from the OMDB Api

var APIKey = "a2a12eb8"

var apiURL = "http://www.omdbapi.com/?i=tt3896198&apikey="+ APIKey;

function getOmdbApi(apiURL){
  fetch(apiURL)
    .then(function(response){
      console.log(response.status);
      console.log(response);
      if(!response.ok){
        alert(response.status);
      }
      return response.json();
    })
    .then(function (data){
      console.log(data);
    });
};

getOmdbApi(apiURL);
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









var comicVINEAPIKey = "1c73a613612933ec05e589eae31bc83d97ed2e1c"

var getComics = function (user) {
    var comicAPI =  "https://comicvine.gamespot.com/api/volumes?api_key=1c73a613612933ec05e589eae31bc83d97ed2e1c"
  
    fetch(comicAPI)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayComics(data, user);
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Comic Vine');
      });
  };getComics();

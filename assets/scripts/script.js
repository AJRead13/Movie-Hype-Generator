var APIKey = "a2a12eb8"
var apiURL = "http://www.omdbapi.com/?i=tt3896198&apikey="+ APIKey;
var comicApiPublicKey = "b6086cc7ddad64bdcdc0d9681c40e48d";
var comicApiPrivateKey = "171a555d8009414cf5e463747ef4a609ff79e0bd";
var ts = new Date();
var hashMD5 = CryptoJS.MD5(ts + comicApiPrivateKey + comicApiPublicKey).toString();
var comicApiURL = "https://gateway.marvel.com/v1/public/characters?ts="+ts+"&orderBy=name&limit=10&apikey="+comicApiPublicKey+"&hash="+hashMD5;
// Creating selectors to capture search input
var searchFormEl = document.getElementById("search-form");
var searchInputEl = document.getElementById("search-input");
// Modal Elements
var modalEl = document.getElementById('modal'); // the whole modal
var searchButtonEl = document.getElementById('search-button'); // the search button in the nav bar (check which click listener for this is commented out)
var modalCloseBtnEl = document.getElementById('modal-close-btn'); // top right corner 'X' will close the modal


// Fetching from the OMDB Api
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
// Fetching Marvel Api
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
getOmdbApi(apiURL);
getComicApi(comicApiURL);

// Capturing search input
function getSearchInput(event){
  event.preventDefault();
  var inputVal = searchInputEl.value;
  if(!inputVal){
    return;
  }
}

// searchFormEl.addEventListener("submit", getSearchInput);



var currentDay = document.querySelector("#currentDay");

var dateTime = function () {
  var today = moment().format("MMM Do YYYY");
  // currentDay.textContent = today;
};
setInterval(dateTime, 1000);

// Fetching from Marvel API


// Modal display
// show modal
searchButtonEl.addEventListener('click', function (event) {
  event.preventDefault();
  modalEl.classList.add('is-active');
})
// close modal
modalCloseBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  modalEl.classList.remove('is-active');
});
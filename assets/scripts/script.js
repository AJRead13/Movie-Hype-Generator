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
var modalBackgroundEl = document.getElementById('modal-background'); // background of the modal (greyed out space)


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
function showModal(event){
  event.preventDefault();
  modalEl.classList.add('is-active');
}
searchButtonEl.addEventListener('click', showModal);
// close modal
function closeModal(event){
  event.preventDefault();
  modalEl.classList.remove('is-active');
}
modalCloseBtnEl.addEventListener('click', closeModal);
modalBackgroundEl.addEventListener('click', closeModal);

// TODO generate data and put into modal
// #modal-image
// #modal-title
// #modal-description

// TODO generate data and put into info-page
// #info-page-title
// #info-page-time
// #info-page-description-title
// #info-page-description
// #info-page-similar-results

// TODO pull from localstorage the cards that display on the home page
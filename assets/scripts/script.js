var APIKey = "a2a12eb8";
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
var j = 0;
// Modal Elements
var modalEl = document.getElementById("modal"); // the whole modal
var searchButtonEl = document.getElementById("search-button"); // the search button in the nav bar (check which click listener for this is commented out)
var modalCloseBtnEl = document.getElementById("modal-close-btn"); // top right corner 'X' will close the modal
var modalBackgroundEl = document.getElementById("modal-background"); // background of the modal (greyed out space)
var modPosterEl = document.getElementById("modal-image");
var modTitleEl = document.getElementById("modal-title");
var modDescriptionEl = document.getElementById("modal-description");
var nextBtn = document.getElementById("cycle-right");
var lastBtn = document.getElementById("cycle-left");

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
    var movieInfo = {
      imdb: data.Search[i].imdbID,
      title: data.Search[i].Title,
      poster: data.Search[i].Poster,
    };
    idArr.push(movieInfo);
  }
  if(data.Search.length < 10){
    displayPoster();
  }else{
    iteratePage(title, year);
  }
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
          var movieInfo = {
            imdb: data.Search[i].imdbID,
            title: data.Search[i].Title,
            poster: data.Search[i].Poster,
          };
          idArr.push(movieInfo);
        }
        displayPoster();
        
      }
    });
}

nextBtn.addEventListener("click", function (event) {
  event.preventDefault();
  j = j + 1;
  if (j >= idArr.length) {
    j = 0;
  }
  modPosterEl.dataset.slide = j;
  modTitleEl.dataset.slide = j;
  modDescriptionEl.dataset.slide = j;
  if(idArr[j].poster == "N/A"){
    modPosterEl.src = "assets/images/placeholder-image.png";
  }else{
    modPosterEl.src = idArr[j].poster;
  }
  modTitleEl.innerHTML = idArr[j].title;
});

lastBtn.addEventListener("click", function (event) {
  event.preventDefault();
  j = j - 1;
  if (j < 0) {
    j = idArr.length;
  }
  modPosterEl.dataset.slide = j;
  modTitleEl.dataset.slide = j;
  modDescriptionEl.dataset.slide = j;
  if(idArr[j].poster == "N/A"){
    modPosterEl.src = "assets/images/placeholder-image.png";
  }else{
    modPosterEl.src = idArr[j].poster;
  }
  modTitleEl.innerHTML = idArr[j].title;
});

// Display movie info on modal
function displayPoster() {
  console.log(j);
  modPosterEl.style.maxHeight = "100%";
  modPosterEl.style.maxWidth = "auto";
  if(idArr[j].poster == "N/A"){
    modPosterEl.src = "assets/images/placeholder-image.png";
  }else{
    modPosterEl.src = idArr[j].poster;
  }
  modTitleEl.innerHTML = idArr[j].title;
}

searchFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  showModal();
  getSearchInput();
});

//displaying date and time//
var currentDay = document.querySelector("#currentDay");
var dateTime = function () {
  var today = moment().format("MMM Do YYYY HH:mm a");
  currentDay.textContent = today;
};
setInterval(dateTime, 1000);

// Modal display
// show modal
function showModal() {
  modalEl.classList.add("is-active");
}
// close modal
function closeModal(event){
  modalEl.classList.remove('is-active');
}
modalCloseBtnEl.addEventListener("click", closeModal);
modalBackgroundEl.addEventListener("click", closeModal);

// TODO load detailed data to info-page
// testing
var modalImageEl = document.getElementById('modal-image');
modalImageEl.addEventListener('click', function (event) {
  event.preventDefault();
  var selectedMovie = event.target;
  console.log(selectedMovie);
  // get imdbID of the currently displayed movie (maybe a 'more info' button that has a value of the id)
  var movieID = 'test';

  closeModal();
  displayDetailedInfoPage(movieID);
})
// call this function when the user clicks on a specific movie in the modal
function displayDetailedInfoPage(imdbID) {
  // go to info_page
  window.location.assign('./info-page.html?q=' + imdbID);
}

// TODO pull from localstorage the cards that display on the home page

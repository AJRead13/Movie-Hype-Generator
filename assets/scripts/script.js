var APIKey = "a2a12eb8";
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
    "https://www.omdbapi.com/?i=tt3896198&apikey=" +
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
        // console.log(data);
        getSearchResults(data, title, year);
      }
    });
}

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
      type: data.Search[i].Type,
      year: data.Search[i].Year,
    };
    idArr.push(movieInfo);
  }
  if (data.Search.length < 10) {
    displayPoster();
  } else {
    iteratePage(title, year);
  }
}
function iteratePage(title, year) {
  p++;
  var pageApiURL =
    "https://www.omdbapi.com/?i=tt3896198&apikey=" +
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
            type: data.Search[i].Type,
            year: data.Search[i].Year,
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
  if (idArr[j].poster == "N/A") {
    modPosterEl.src = "assets/images/placeholder-image.png";
  } else {
    modPosterEl.src = idArr[j].poster;
  }
  modTitleEl.innerHTML = idArr[j].title;
  modDescriptionEl.innerHTML =
    "Year: " + idArr[j].year + "<br/>Format: " + idArr[j].type;
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
  if (idArr[j].poster == "N/A") {
    modPosterEl.src = "assets/images/placeholder-image.png";
  } else {
    modPosterEl.src = idArr[j].poster;
  }
  modTitleEl.innerHTML = idArr[j].title;
  modDescriptionEl.innerHTML =
    "Year: " + idArr[j].year + "<br/>Format: " + idArr[j].type;
});

// Display movie info on modal
function displayPoster() {
  modPosterEl.style.maxHeight = "100%";
  modPosterEl.style.maxWidth = "auto";
  if (idArr[j].poster == "N/A") {
    modPosterEl.src = "assets/images/placeholder-image.png";
  } else {
    modPosterEl.src = idArr[j].poster;
  }
  modTitleEl.innerHTML = idArr[j].title;
  modDescriptionEl.innerHTML =
    "Year: " + idArr[j].year + "<br/>Format: " + idArr[j].type;
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

// var releaseDay = "";
// var releaseCount = document.querySelector(".card-content");
// var timeToRelease = function () {
//   var timeLeft = moment.to(releaseDay).format()
//   releaseCount.innerHTML(timeLeft);
// };
// setInterval(timeToRelease);60000
// dd mm yyyy

// Modal display
// show modal
function showModal() {
  modalEl.classList.add("is-active");
}
// close modal
function closeModal(event) {
  modalEl.classList.remove("is-active");
}
modalCloseBtnEl.addEventListener("click", closeModal);
modalBackgroundEl.addEventListener("click", closeModal);

// TODO load detailed data to info-page
// testing
modPosterEl.addEventListener("click", function (event) {
  event.preventDefault();
  var selectedMovie = event.target;
  // get imdbID of the currently displayed movie (maybe a 'more info' button that has a value of the id)
  var title = modTitleEl.innerHTML; // test value
  var date = idArr[j].year; // year movie released

  closeModal();
  displayDetailedInfoPage(title, date);
});
// call this function when the user clicks on a specific movie in the modal
function displayDetailedInfoPage(title, year) {
  // go to info_page
  window.location.assign("./info-page.html?q=" + title + "&y=" + year);
}
// pull from localstorage the cards that display on the home page
function displaySavedMovies() {
  // getting json string from local storage
  var savedMovies = localStorage.getItem("movieData");
  var movieArr = [];
  // default visibility of cards is hidden until it is filled out with saved movie info
  for(let q=0; q<10; q++){
    document.getElementById("card-"+q).style.visibility = "hidden";
  }
  // checking if local storage has data
  if (savedMovies) {
    savedMovies = JSON.parse(savedMovies);
  }else{
    savedMovies = [];
  }
  // parsing json string into object of arrays
  for (let i = 0; i < savedMovies.length; i++) {
    movieArr.push(JSON.parse(savedMovies[i]));
  }
  // inserting saved movie info into card elements
  for(let t=0; t<movieArr.length; t++){
    document.getElementById("title-"+t).innerHTML = movieArr[t].title + "</br>" + "Release Date: " + movieArr[t].date;
    document.getElementById("img-"+t).src = movieArr[t].image;
    document.getElementById("desc-"+t).innerHTML = movieArr[t].plot;
    document.getElementById("card-"+t).style.visibility = "visible";
  } 
}
displaySavedMovies();

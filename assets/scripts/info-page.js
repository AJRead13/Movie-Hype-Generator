var APIKey = "a2a12eb8"
var titleEl = document.getElementById('title');
var timeEl = document.getElementById('release-time');
var writersEl = document.getElementById('writers');
var plotEl = document.getElementById('plot');
var similarEl = document.getElementById('similar-results');
var saveBtnEl = document.getElementById('save-btn');
var movieData = {};

displayInfo();
// TODO generate data and put into info-page
function displayInfo() {
    // get info from query in url
    var queryString = document.location.search;
    var title = queryString.split('=')[1].trim();
    var year = queryString.split('=')[2].trim();

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
                // display data in relevant fields
                // Title
                titleEl.innerHTML = data.Title;
                // time until release //TODO calculate
                timeEl.innerHTML = data.Released;
                // plot and description information
                plotEl.innerHTML = "Plot: " + data.Plot;
                writersEl.innerHTML = "Writers: " + data.Writer;

                // TODO Save info to localstorage
                createDataObject(data);
            }
          });
    // TODO related content (fetching from 2nd AIP)
    // Marvel database search
}

// Save title, release date, poster image, and plot to localstorage
function createDataObject(data) {
  var movieTitle = data.Title;
  var movieID = data.imdbID;
  var movieDate = data.Released;
  var movieImage = data.Poster;
  var moviePlot = data.Plot;
  movieData = {
    title: movieTitle,
    imdbID: movieID,
    date: movieDate,
    image: movieImage,
    plot: moviePlot
  };
}

// listen for "save" button click
saveBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  console.log(movieData);
  // Save currently displayed movie to storage
  saveToStorage();
})

function saveToStorage() {
  // get current array of saved movies
  // var storedMovieArr = localStorage.getItem('movieData');
  // var fullMovieArr = [];
  // if (storedMovieArr) {
  //   storedMovieArr = JSON.parse(storedMovieArr);
  //   // for each object in the array, parse it and add it back to the array
  //   for (var i = 0; i < storedMovieArr.length; i++) {
  //     fullMovieArr.push(JSON.parse(storedMovieArr[i]));
  //   }
  //   console.log(fullMovieArr);
  // }
  
  // stringify moviData object
  var stringMovieData = JSON.stringify(movieData);
  // fullMovieArr.push(stringMovieData);

  localStorage.setItem('movieData', stringMovieData);
}
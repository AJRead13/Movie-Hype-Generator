var APIKey = "a2a12eb8"
var titleEl = document.getElementById('title');
var timeEl = document.getElementById('release-time');
var writersEl = document.getElementById('writers');
var plotEl = document.getElementById('plot');
var similarEl = document.getElementById('similar-results');

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
                // TODO display data in relevant fields
                // Title
                titleEl.innerHTML = data.Title;
                // time until release //TODO calculate
                timeEl.innerHTML = data.Released;
                // plot and description information
                plotEl.innerHTML = "Plot: " + data.Plot;
                writersEl.innerHTML = "Writers: " + data.Writer;
                // TODO related content (fetching from 2nd AIP)

                    // #info-page-similar-results
            }
          });

    // Marvel database search
}

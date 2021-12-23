var APIKey = "a2a12eb8"
displayInfo();
// TODO generate data and put into info-page
function displayInfo() {
    // get info from query in url
    var queryString = document.location.search;
    var title = queryString.split('=')[1].trim();
    var year = queryString.split('=')[2].trim();
    console.log(imdbID);
    console.log(year);

    // generate url
    var apiURL =
    "http://www.omdbapi.com/?i=tt3896198&apikey=" +
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
            console.log(data);
            if (data.Response == "True") {
                // display data in relevant fields

                    // Title and time until release

                        // #info-page-title
                        // #info-page-time

                    // Description

                        // #info-page-description-title
                        // #info-page-description

                    // related content (fetching from 2nd AIP)

                        // #info-page-similar-results
            }
          });
}

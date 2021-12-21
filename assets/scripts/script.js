

































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
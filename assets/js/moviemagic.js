var searchInput = $('.search');
var cardWrapper = $('main');

function noMatch() {
    cardWrapper.html('<p class="no-search">No results found.</p>');
};

function displayMatches(matches){

    cardWrapper.html('');

    if (!matches) {
        noMatch();
    } else {
        for (var matchObj of matches){
            cardWrapper.append(`
                <div class="movie-card" style="background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${matchObj.Poster})">
                    <h3>${matchObj.Title}</h3>
                    <p>Release Year: ${matchObj.Year}</p>
                    <a href="https://www.imdb.com/title/${matchObj.imdbID}" target="_blank">View IMDB Page</a>
                </div>
            `);
        }
    };

 
}

function fetchMovies (event) {
    var keyCode = event.keyCode;
    //make data lowercase and trims out spaces
    var searchText = searchInput.val().trim();

    // console.log(searchText);

    if (keyCode === 13 && searchText){

        // var matches = [];

        // for (var movieObj of movieData) {
        //     //if the title partial matches title in movieData var then do something
        //     if (movieObj.title.toLowerCase().includes(searchText)){
                
        //         matches.push(movieObj);
        //     }
        // }

        //fetch info from omdbapi website based on searchText and return a promise obj
        // fetch(`https://www.omdbapi.com/?apikey=20dc4c7f&t=${searchText}`). then(function(responseObj) {

        //         var dataPromise = responseObj.json;

        //         dataPromise.then(function (data) {
        //             console.log(data);
        //         });
        // );

        $.get(`https://www.omdbapi.com/?apikey=20dc4c7f&s=${searchText}`)
          .then(function (data){
                // if (!data.length){
                    // noMatch();
                
                // } else {
                    console.log(data.Search);
                    displayMatches(data.Search);
                    searchInput.val('');
                // };
            });;

    //     responsePromise.then(function(responseObj) {

    //         //returns a json formated response object
    //         var dataPromise = responseObj.json();

    //         //
    //         dataPromise.then(function(data) {
    //             onsole.log(data);
    //         });
    //     });
    };

    // searchInput.value = '';
    // displayMatches(matches);
}; 



function init () {
    searchInput.keydown(fetchMovies);
}

init()



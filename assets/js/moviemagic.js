var searchInput = document.querySelector('.search');
var cardWrapper = document.querySelector('main');

function noMatch() {
    cardWrapper.innerHTML = '<p class="no-search">No results found.</p>';
};

function displayMatches(matches){

    cardWrapper.innerHTML = '';

    if (!matches) {
        noMatch();
    } else {
        for (var matchObj of matches){
            cardWrapper.insertAdjacentHTML('beforeend', `
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
    var searchText = searchInput.value.toLowerCase().trim();

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

        var responsePromise = fetch(`https://www.omdbapi.com/?apikey=20dc4c7f&s=${searchText}`);

    //     responsePromise.then(function(responseObj) {

    //         //returns a json formated response object
    //         var dataPromise = responseObj.json();

    //         //
    //         dataPromise.then(function(data) {
    //             onsole.log(data);
    //         });
    //     });

        function handleResponse(responseObj){
            return responseObj.json();
        };

        responsePromise
            .then(handleResponse)
            .then(function (data){
                // if (!data.length){
                    // noMatch();
                
                // } else {
                    console.log(data.Search);
                    displayMatches(data.Search);
                    searchInput.value = '';
                // };
            });
         


    };

    // searchInput.value = '';
    // displayMatches(matches);
}; 



function init () {
    searchInput.addEventListener('keydown', fetchMovies);
}

init()



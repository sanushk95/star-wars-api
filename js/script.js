let list = document.querySelector("#characterList");
let movieDetails = document.querySelector("#MovieDetails");

function fetchCharacters() {
    let seed = Math.floor(Math.random() * 9) + 1;

    //AJAX Object Init
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) 
        {
            //console.log(this.responseText);
            let characters = JSON.parse(this.responseText);
            let html = '';
            for(let i=0; i<characters.results.length; i++)
            {
                let seed2 = Math.floor(Math.random() * characters.results[i].films.length);

                html += '<li><a href="' + characters.results[i].films[seed2] + '">' + characters.results[i].name + '</a></li>';
            }

            list.innerHTML = html;

            attachEventListeners();
        }
    }

    xhttp.open("GET","https://swapi.co/api/people/?format=json&page=" + seed, true);
    xhttp.send();
}

function attachEventListeners() {
    let listItems = list.childNodes;

    listItems.forEach((l) => {
        l.addEventListener('click', fetchMovieDetails);
    });
}

function fetchMovieDetails() {
    event.preventDefault();
    
    console.log(event.target.href);

    //Cropping ID.
    let movie_id = event.target.href.substr(27, 1);
    console.log(movie_id);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            let Movie = JSON.parse(this.responseText);
            console.log(Movie);

            /**
             * The close link have inline attach event listener 'onclick' because its just a small function
             * and instead of writing the overhead code for attaching an event listener using "addEventListener"
             * I attached them using inline method. Also, the closeWindow() is just one-line function.
             */
            movieDetails.innerHTML = `
                <h1 class="movie_title">${Movie.title}</h1>
                <p class="movie_director">Directed By: ${Movie.director}</p>
                <div class="movie_poster">
                    <img src="./images/movie${movie_id}.jpg" alt="movie${movie_id}_poster">
                </div>
                <p class="movie_crawl">${Movie.opening_crawl}</p>
                <div><a href="#" class="close" onclick="closeWindow()"></a></div>
            `;
            movieDetails.classList.add("active");
        }
    }
    xhttp.open("GET",event.target.href);
    xhttp.send(); 
}

function closeWindow() {
    movieDetails.classList.remove("active");
}

fetchCharacters();
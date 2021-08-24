const getRandomMovies = document.querySelector('.get-random-movies'),
    movieContainer = document.querySelector('.movie-container'),
    getTopMovies = document.querySelector('.get-top-movies'),
    searchIcon = document.querySelector('.search-icon'),
    searchInput = document.querySelector('.search-input')

let state = {
    page: 'random',
}
const APIKEY = '3af1223f-79b2-499e-a396-340e8c7d5166'
const URL = `https://kinopoiskapiunofficial.tech/api/v2.1/films/2545`


async function getMovie(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": APIKEY
        }
    })
    const data = await response.json()

    let movieTitle, moviePoster, movieYear, movieAgeLimit, movieRating, movieCountry, movieLink, movieGenres


    if (state.page == 'random') {
        // console.log(data)
        let allGenres = ''
        for (let i = 0; i<data.data.genres.length; i++) {

            allGenres += `${data.data.genres[i].genre} `
        }
        movieGenres = allGenres
        movieTitle = data.data.nameRu
        moviePoster = data.data.posterUrl
        movieYear = `${data.data.year},`
        movieAgeLimit = data.data.ratingAgeLimits
        movieCountry = data.data.countries[0].country
        movieLink = data.data.webUrl

        if (movieTitle.length > 15) {
            movieTitle = movieTitle.slice(0, 15)+"..."
        }

        if (movieTitle) {
            let movieCard =
            `
            <div class="movie-card">
                <div class="movie-card-container">
            
                    <img class="movie-poster" src="${moviePoster}" alt="movie-poster">
                    <div class="movie-age-limit">${movieAgeLimit ? movieAgeLimit : 0}+</div>
                    
                    <a href="${movieLink}" class="movie-info">
                        <div class="movie-info__container">
                            <div class="movie-info__title">Название: ${data.data.nameRu}</div>
                            <div class="movie-info__seasons" > Сезонов: ${data.data.seasons.length}</div>
                            
                            <div class="movie-info__genres"> Жанры: ${movieGenres}</div>
                            
                        </div>
                    </a>

                </div>
                <a href="${movieLink}" class="movie-title">${movieTitle}</a>
                
                <div class="movie-card-bottom">
                    <div class="movie-year">${movieYear}</div>
                    <div class="movie-type">${movieCountry}</div>
                </div>
            </div>
            `
            movieContainer.innerHTML += movieCard
        }
        let moviePosterArray = document.querySelectorAll('.movie-poster')

        moviePosterArray.forEach(item => {
            item.addEventListener('mouseover', () => {
                item.parentElement.children[2].style.display = 'block'
            })
        })

        document.querySelectorAll('.movie-info').forEach(item => {
            item.addEventListener('mouseout', () => {
                item.style.display = 'none'
            })
        })

    }

    if (state.page == 'top') {
        for (let i = 0; i < data.films.length; i++) {
            
            let allGenres = ''

            for (let k = 0; k<data.films[i].genres.length; k++) {
                allGenres += `${data.films[i].genres[k].genre} `
            }

            movieGenres = allGenres
            movieTitle = data.films[i].nameRu
            moviePoster = data.films[i].posterUrl
            movieYear = `${data.films[i].year},`
            movieCountry = data.films[i].countries[0].country
            movieRating = `${data.films[i].rating}`
            movieLink = `https://www.kinopoisk.ru/film/${data.films[i].filmId}/`

            if (movieTitle.length > 15) {
                movieTitle = movieTitle.slice(0, 15)+"..."
            }

            let movieCard =
            `
            <div class="movie-card">
                <div class="movie-card-container">

                    <img class="movie-poster" src="${moviePoster}" alt="movie-poster">
                    <div class="movie-age-limit">${movieRating}</div>

                    <a href="${movieLink}" class="movie-info">
                        <div class="movie-info__container">
                        <div class="movie-info__title">Название: ${data.films[i].nameRu}</div>

                        <div class="movie-info__seasons" > Длительность: ${data.films[i].filmLength}</div>
                            
                        <div class="movie-info__genres"> Жанры: ${movieGenres}</div>
                            
                        </div>
                    </a>

                </div>
                <a href="${movieLink}" class="movie-title">${movieTitle}</a>

                <div class="movie-card-bottom">
                    <div class="movie-year">${movieYear}</div>
                    <div class="movie-type">${movieCountry}</div>
                </div>
            </div>
            `
            movieContainer.innerHTML += movieCard

            let moviePosterArray = document.querySelectorAll('.movie-poster')

            moviePosterArray.forEach(item => {
                item.addEventListener('mouseover', () => {
                    item.parentElement.children[2].style.display = 'block'
                })
            })

            document.querySelectorAll('.movie-info').forEach(item => {
                item.addEventListener('mouseout', () => {
                    item.style.display = 'none'
                })
            })
        }
        let moviePosterArray = document.querySelectorAll('.movie-poster')
        

        moviePosterArray.forEach(item => {
            item.addEventListener('mouseover', () => {
                item.parentElement.children[2].style.display = 'block'
            })

        })

        document.querySelectorAll('.movie-info').forEach(item => {
            item.addEventListener('mouseout', () => {
                item.style.display = 'none'
            })
        })
    }
}

function generateRandomMovie() {
    for (let i = 0; i<20; i++) {
        let rand = Math.round(Math.random()*400000)
        console.log(rand)
        getMovie(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${rand}`)
    }
}

generateRandomMovie()

getRandomMovies.addEventListener('click', () => {
    state.page = "random"
    movieContainer.innerHTML = ''
    generateRandomMovie()
})

getTopMovies.addEventListener('click', () => {
    state.page = "top"
    movieContainer.innerHTML = ''
    getMovie(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top`)
})

searchIcon.addEventListener('click', () => {
    searchInput.style.display = 'block'
})

searchInput.addEventListener('input', () => {
    let input = searchInput.value

    movieContainer.innerHTML = '';
    let url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${input}&page=1`
    searchMovie(url)
    
})

async function searchMovie(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": APIKEY
        }
    })
    const data = await response.json()

    for (let i = 0; i < data.films.length; i++) {
            
        let allGenres = ''

        for (let k = 0; k<data.films[i].genres.length; k++) {
            allGenres += `${data.films[i].genres[k].genre} `
        }

        movieGenres = allGenres
        movieTitle = data.films[i].nameRu
        moviePoster = data.films[i].posterUrl
        movieYear = `${data.films[i].year},`
        movieCountry = data.films[i].countries[0].country
        movieRating = `${data.films[i].rating}`
        movieLink = `https://www.kinopoisk.ru/film/${data.films[i].filmId}/`

        if (movieTitle.length > 15) {
            movieTitle = movieTitle.slice(0, 15)+"..."
        }

        let movieCard =
        `
        <div class="movie-card">
            <div class="movie-card-container">

                <img class="movie-poster" src="${moviePoster}" alt="movie-poster">
                <div class="movie-age-limit">${movieRating}</div>

                <a href="${movieLink}" class="movie-info">
                    <div class="movie-info__container">
                    <div class="movie-info__title">Название: ${data.films[i].nameRu}</div>

                    <div class="movie-info__seasons" > Длительность: ${data.films[i].filmLength}</div>
                        
                    <div class="movie-info__genres"> Жанры: ${movieGenres}</div>
                        
                    </div>
                </a>

            </div>
            <a href="${movieLink}" class="movie-title">${movieTitle}</a>

            <div class="movie-card-bottom">
                <div class="movie-year">${movieYear}</div>
                <div class="movie-type">${movieCountry}</div>
            </div>
        </div>
        `
        movieContainer.innerHTML += movieCard

        let moviePosterArray = document.querySelectorAll('.movie-poster')

        moviePosterArray.forEach(item => {
            item.addEventListener('mouseover', () => {
                item.parentElement.children[2].style.display = 'block'
            })
        })

        document.querySelectorAll('.movie-info').forEach(item => {
            item.addEventListener('mouseout', () => {
                item.style.display = 'none'
            })
        })
    }
    let moviePosterArray = document.querySelectorAll('.movie-poster')
    

    moviePosterArray.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.parentElement.children[2].style.display = 'block'
        })

    })

    document.querySelectorAll('.movie-info').forEach(item => {
        item.addEventListener('mouseout', () => {
            item.style.display = 'none'
        })
    })
}
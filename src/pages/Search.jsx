import "../Search.css"
import MovieCreationIcon from '@mui/icons-material/MovieCreation'
import SearchIcon from '@mui/icons-material/Search'
import { Link, useNavigate } from 'react-router-dom'
import "../NavSearch.css"
import "../LandingSearch.css"
import React, { useEffect, useState } from 'react'
import "../Movies.css"

const Search = () => {
    const navigate = useNavigate()
    const id = sessionStorage.getItem("searchId") || new Array([])
    const [movies, setMovies] = useState([])
    const [searchId, setSearchId] = useState(id)
    const [loading, setLoading] = useState(true)
    const [searchResults, setSearchResults] = useState([])

    function onSearch(){
        fetchMovies(searchId)
    }

    async function fetchMovies(e){
        try{
            setLoading(true)
            const movieData = await fetch(`http://www.omdbapi.com/?s=${e || id}&apikey=91e3de3a`)
            const moviesInfo = await movieData.json()
            const moviesArr = moviesInfo.Search.map((movie) => movie)
            setSearchResults(`"${e || id}"`)
            console.log(moviesArr)
            setMovies( moviesArr )
        }
        catch{
            if (e === undefined){
                setMovies([])
                return setSearchResults("")
                
            } else{
                setMovies([])
                return setSearchResults(`"${e}"`)
            }
        }
        finally{
            setLoading( false )
            sessionStorage.setItem("searchId", searchId)
        }
    }

    async function filterMovies(filter){
        const moviesData = await fetch(`http://www.omdbapi.com/?apikey=7ceed11f&s=${searchId || id}`);
        const moviesInfo = await moviesData.json();
        const moviesArr = moviesInfo.Search.map((movie) => movie)
        if (filter === "LEAST_RECENT"){
            moviesArr.sort((a, b) => (a.Year.slice(-4) - b.Year.slice(-4)));
            setMovies(moviesArr)
        }
        else if (filter === "MOST_RECENT"){
            moviesArr.sort((a, b) => (b.Year.slice(-4) - a.Year.slice(-4)));
            setMovies(moviesArr)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <nav className="find__nav">
            <div className='container'>
                <div className="row">
                    <div className="nav__wrapper">
                        <figure className="nav__logo--wrapper">
                            <MovieCreationIcon fontSize='large' className='nav__logo'/>
                            <span className="nav__logo--name find__nav--logo-name">FilmFinder</span>
                        </figure>
                        <ul className="nav__links">
                            <li className="nav__link find__nav--link">
                                <Link to="/" className="white">Home</Link>
                            </li>
                            <li className="nav__link find__nav--link">
                                <Link to="/Search" className="white">Search</Link>
                            </li>
                            <li className="nav__link find__nav--link">
                                <button className="btn-nav__link btn-find__nav--link">Contact</button>
                            </li>
                        </ul>
                    </div>
                    <header>
                        <h1 className="header__title">Browse Movies and Shows</h1>
                        <div className="search find__search">
                            <input type="text" value={searchId} placeholder='Search "Name or Keyword"' className="searchbar"
                            onChange={(event) => setSearchId(event.target.value)} />
                            <SearchIcon className='search__img' onClick={onSearch} />
                        </div>
                    </header>
                    <div className="find__landing">
                    <h2 className="find__landing--title">Search results for: <span className="blue">{searchResults}</span></h2>
                        <select id="filter" onChange={(event) => filterMovies(event.target.value)}>
                            <option value="" disabled selected>Sort</option>
                            <option value="MOST_RECENT">Most Recent</option>
                            <option value="LEAST_RECENT">Least Recent</option>
                        </select>
                    </div>
                    <div className="movie-list">
                        <div className="movies">
                            {loading ? (new Array(movies.length).fill(0).map((_, index) => (
                                    <div className="movie__container" key={index}>
                                        <div className="movie__img--skeleton"></div>
                                        <div className="movie__info">
                                            <div className="movie__title--skeleton"></div>
                                            <div className="movie__year--skeleton"></div>
                                            <div className="movie__id--skeleton"></div>
                                        </div>
                                    </div>
                                ))) : (movies.map((movie) => {
                                        return <div className="movie__container" key={movie.imdbID}  onClick={() => navigate(`${movie.imdbID}`)}>
                                            <img src={movie.Poster} alt="No Image Available" className="movie__img"/>
                                            <div className="movie__info">
                                                <div className="movie__title">{movie.Title}</div>
                                                <div className="movie__year">Year: {movie.Year}</div>
                                                <div className="movie__id">IMDB ID: {movie.imdbID}</div>
                                            </div>
                                        </div>
                                    }
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Search
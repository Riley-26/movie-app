import React from 'react'
import "../SearchInfo.css"
import MovieCreationIcon from '@mui/icons-material/MovieCreation'
import { Link, useParams, useNavigate } from "react-router-dom"
import "../NavSearch.css"
import "../SearchInfo.css"
import { useEffect } from 'react'
import { useState } from 'react'


function SearchInfo() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState([])

  async function fetchMovie(){
    setLoading( true )
    const movieData = await fetch(`http://www.omdbapi.com/?i=${ id }&apikey=91e3de3a`)
    const movieInfo = await movieData.json()
    setMovie(movieInfo)
    console.log(movieInfo)
    setLoading( false )
  }

  useEffect(() => {
    fetchMovie()
  }, [])

  return (
    <>
      <nav className='find__nav infoNav'>
        <div className='container'>
          <div className='row'>
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
          </div>
        </div>
      </nav>
      <section id='main'>
        <div className="container">
          <div className="row">
            <span className='back-btn' onClick={() => navigate("/Search")}>&larr; Back</span>
            <div className="movieInfo">
              {
                !loading ? (<>
                  <figure className='movieInfo__img--wrapper'>
                    <img src={movie.Poster} alt="Not Available" className='movieInfo__img' />
                  </figure>
                  <div className="movieInfo__info">
                    <h2 className="movieInfo__title">{movie.Title}</h2>
                    <p className='movieInfo__id'>{movie.imdbID}</p>
                    <hr />
                    <h3 className='movieInfo__released'>{movie.Released}</h3>
                    <p className='movieInfo__plot'>{movie.Plot}</p>
                    <p className='movieInfo__actors'><span className='info__style'>Actors: </span>{movie.Actors}</p>
                    <p className='movieInfo__director'><span className='info__style'>Director: </span>{movie.Director}</p>
                    <p className='movieInfo__genre'><span className='info__style'>Genre: </span>{movie.Genre}</p>
                    <p className='movieInfo__runtime'><span className='info__style'>Runtime: </span>{movie.Runtime}</p>
                    <p className='movieInfo__age'><span className='info__style'>Age Rating: </span>{movie.Rated}</p>
                    <p className='movieInfo__rating'><span className='info__style'>IMDB Rating: </span>{movie.imdbRating}</p>
                  </div>
                </>) : (
                  <figure>
                    <img src="" alt="" />
                  </figure>
                )
              }
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default SearchInfo
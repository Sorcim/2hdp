import {connect} from 'react-redux';
import React from "react";
import {addMovieLike, delMovieLike} from "./MovieAction";
import axios from "axios";
import './MovieDetail.css';
import Like from "../Button/Like";


const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.params)
  return {
    moviesLikeList: state.movies,
    idMovie: ownProps.match.params.idMovie
  };
};

const mapDispatchToProps = {
  addMovieLike,
  delMovieLike
};

const MovieDetailComponent = ({idMovie}) => {
  const [movie, setMovie] = React.useState(null);
  React.useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=c211dca87322b072a0bb88b269aa8cae&language=fr-FR&append_to_response=credits,videos,images`)
        .then(response => {
          setMovie(response.data)
        });
  }, [idMovie]);
  return ((movie === null && <div>Loading</div>) ||
    <div className="movie-info border-b border-gray-800">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
        <div className="flex-none">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster" className="w-64 lg:w-96"/>
        </div>
        <div className="md:ml-24">
          <h2 className="text-4xl mt-4 md:mt-0 font-semibold">{movie.title} | <Like movieId={movie.id}/></h2>
          <div className="flex flex-wrap items-center text-gray-400 text-sm">
            <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24">
              <g data-name="Layer 2">
                <path
                  d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                  data-name="star"/>
              </g>
            </svg>
            <span className="ml-1">{movie.vote_average}</span>
            <span className="mx-2">|</span>
            <span>{movie.release_date}</span>
            <span className="mx-2">|</span>
            <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
          </div>

          <p className="text-gray-300 mt-8">
            {movie.overview}
          </p>

          <div className="mt-12">
            <h4 className="text-white font-semibold">Featured Crew</h4>
            <div className="flex mt-4">
              {
                movie.credits.crew.slice(0, 2).map(crew => {
                  return <div className="mr-8" key={crew.id}>
                    <div>{crew.name}</div>
                    <div className="text-sm text-gray-400">{crew.job}</div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className="movie-cast border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-semibold">Cast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {
              movie.credits.cast.slice(0, 5).map(cast => {
                let poster;
                if (cast.profile_path)
                  poster = `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                else
                  poster = 'https://via.placeholder.com/500x750'
                return <div className="mt-8" key={cast.id}>
                  <img src={poster} alt="actor1"
                       className="hover:opacity-75 transition ease-in-out duration-150"/>
                  <div className="mt-2">
                    <p className="text-lg mt-2 hover:text-gray:300">{cast.name}</p>
                    <div className="text-sm text-gray-400">
                      {cast.character}
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
};

const MovieDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetailComponent);

export default MovieDetail;
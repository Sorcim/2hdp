import {connect} from 'react-redux';
import React from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Poster from "../Images/Poster";
import Like from "../Button/Like";
import See from "../Button/See";


const MovieComponent = ({id}) => {

  const [movie, setMovie] = React.useState(null);
  React.useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c211dca87322b072a0bb88b269aa8cae&language=fr-FR`)
      .then(response=>{
        setMovie(response.data)
      });
  }, [id]);
  let history = useHistory();
  if (movie){
    return (
      <div className="mt-8">
        <Poster path={movie.poster_path} movieId={movie.id}/>
        <div className="mt-2">
          <p onClick={()=>{history.push(`/movie/${movie.id}`)}}
             className="text-lg mt-2 hover:text-gray-300 cursor-pointer">{movie.original_title}</p>
          <Like movieId={movie.id}/> | <See movieId={movie.id}/>
          <div className="flex items-center text-gray-400 text-sm mt-1">
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
          </div>
          <div className="text-gray-400 text-sm">{movie.genres.map(genre => genre.name).join(', ')}</div>
        </div>
      </div>
    );
  } else {
    return null;
  }

};

const MovieItem = connect(
  null,
  null
)(MovieComponent);

export default MovieItem;
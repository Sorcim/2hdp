import {connect} from "react-redux";
import React from "react";
import {useHistory} from "react-router-dom";

const PosterComponent = ({path, movieId}) => {
  let history = useHistory();
  const poster = () => {
    let url;
    if (path)
      url = `https://image.tmdb.org/t/p/w500/${path}`
    else
      url = `https://via.placeholder.com/500x750`
    return <img className="hover:opacity-75 transition ease-in-out duration-150 cursor-pointer" src={url} onClick={()=>{history.push(`/movie/${movieId}`)}} alt="poster"/>
  }
  return poster()
}

const Poster = connect(
  null,
  null
)(PosterComponent);

export default Poster
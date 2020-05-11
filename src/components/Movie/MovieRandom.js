import {connect} from 'react-redux';
import React from "react";
import {useHistory} from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {
    moviesLikeList:state.movies
  };
};

const MovieRandomComponent = ({moviesLikeList}) => {
  let random = null;
  let history = useHistory();
  if (moviesLikeList.length){
    random = moviesLikeList[Math.floor(Math.random() * moviesLikeList.length)];
    history.push(`/movie/${random.id}`);
  }
  return <p>Pas de film</p>
};

const MovieRandom = connect(
  mapStateToProps
)(MovieRandomComponent);

export default MovieRandom;
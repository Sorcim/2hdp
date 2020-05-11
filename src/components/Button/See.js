import {connect} from "react-redux";
import {toggleMovieSee} from "../Movie/MovieAction";
import React from "react";

const mapStateToProps = (state, ownProps) => {
  return {
    moviesLikeList:state.movies,
    movieId:ownProps.movieId
  };
};

const mapDispatchToProps = {toggleMovieSee};

const SeeComponent = ({moviesLikeList,movieId,toggleMovieSee}) => {
  const movie = moviesLikeList.find(like=>(like.id===movieId));
  return (movie && <i className={'far cursor-pointer ' + (movie.done ? "fa-eye" : "fa-eye-slash")} onClick={() => {toggleMovieSee(movieId, !movie.done)}}/>) || null
}

const See = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeeComponent);

export default See
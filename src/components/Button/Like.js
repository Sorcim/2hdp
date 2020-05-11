import {connect} from "react-redux";
import {addMovieLike, delMovieLike} from "../Movie/MovieAction";
import React from "react";

const mapStateToProps = (state, ownProps) => {
  return {
    moviesLikeList:state.movies,
    movieId:ownProps.movieId
  };
};

const mapDispatchToProps = {
  addMovieLike,
  delMovieLike
};

const LikeComponent = ({moviesLikeList,movieId,addMovieLike,delMovieLike}) => {
  const isLike = moviesLikeList.find(like=>(like.id===movieId));
  return <i className={'fas fa-heart cursor-pointer ' + (isLike ? "loved" : "")} onClick={() => {isLike ? delMovieLike(movieId) : addMovieLike(movieId)}}/>
}

const Like = connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeComponent);

export default Like
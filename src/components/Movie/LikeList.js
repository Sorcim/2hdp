import React from "react";
import MovieItem from "./MovieItem";
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    moviesLikeList:state.movies,
    dispatch:state.dispatch
  };
};

const LikeListComponent = ({moviesLikeList, dispatch}) => {

  return (
    <div className="container mx-auto px-4 pt-16">
      <div className="popular-tv">
        <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">Like List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {
            moviesLikeList && moviesLikeList.map(movie=>(
              <MovieItem key={movie.id} id={movie.id}/>
            ))
          }
        </div>
      </div>
    </div>
  )
};

const LikeList = connect(
  mapStateToProps
)(LikeListComponent);


export default LikeList;
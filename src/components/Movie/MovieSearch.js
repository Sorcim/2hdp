import React from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import {connect} from "react-redux";
import {searchAction} from "../Search/SearchAction";

const mapStateToProps = (state, ownProps) => {
  return {
    search:state.search,
    query:ownProps.match.params.query
  };
};

const mapDispatchToProps = {
  searchAction
};

const MovieSearchComponent = ({query, search, searchAction}) => {
  const [movies, setMovies] = React.useState(null);
  if (search !== query){
    searchAction(query)
  }

  React.useEffect(()=>{
    if (search !== ''){
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c211dca87322b072a0bb88b269aa8cae&language=fr-FR&query=${search}&page=1`)
        .then(response=>{
          setMovies(response.data)
        });
    }
  }, [search]);

  return (
    <div className="container mx-auto px-4 pt-16">
      <div className="popular-tv">
        <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">Recherche : {search}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {
            movies && movies.results.map(movie=>(
              <MovieItem key={movie.id} data={movie} id={movie.id}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

const MovieSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieSearchComponent);

export default MovieSearch;
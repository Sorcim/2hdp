import React from 'react';
import './App.css';
import axios from "axios";
import MovieItem from "./Movie/MovieItem";

const App = () => {

  const [popularMovies, setPopularMovies] = React.useState(null);
  const [nowPlayingMovies, setNowPlayingMovies] = React.useState(null);
  React.useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c211dca87322b072a0bb88b269aa8cae&language=fr-FR`)
      .then(response => {
        setPopularMovies(response.data)
      });
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=c211dca87322b072a0bb88b269aa8cae&language=fr-FR`)
      .then(response => {
        setNowPlayingMovies(response.data)
      });
  }, []);


  return <div className="container mx-auto px-4 pt-16">
    <div className="popular-tv">
      <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">Popular Shows</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {
          popularMovies && popularMovies.results.map(movie=>(
            <MovieItem key={movie.id} data={movie} id={movie.id}/>
          ))
        }
      </div>
    </div>

    <div className="top-rated-shows py-24">
      <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">Top Rated Shows</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {
          nowPlayingMovies && nowPlayingMovies.results.map(movie=>(
            <MovieItem key={movie.id} data={movie} id={movie.id}/>
          ))
        }
      </div>
    </div>
  </div>;
};

export default App;

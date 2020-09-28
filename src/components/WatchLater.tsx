import MovieResult from '../types/MovieResult';
import MovieResults from './MovieResults';
import React from 'react';
import axiosConfig from '../util/axios';

export interface WatchLaterProps {
  watchLaterIds: number[];
  watchLaterMovies: MovieResult[];
}

const WatchLater: React.FC<WatchLaterProps> = (props) => {
  const [movies, setMovies] = React.useState<MovieResult[]>([]);

  console.log(props.watchLaterIds);

  const id = props.watchLaterIds.length > 0 ? props.watchLaterIds[0] : 11;

  console.log(id);

  if (movies.find((movie) => movie.id === id)) {
    console.log('Got it');
  } else {
    console.log('dont got it');
  }

  // axiosConfig
  //   .get(
  //     `movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  //   )
  //   .then((res) => {
  //     const { data: movieResult } = res;

  //     console.log(movieResult);

  //     setMovies(movieResult);
  //   })
  //   .catch((err) => {
  //     console.log('Something went wrong!', err);
  //   });

  return (
    <div>
      Watch Later
      <MovieResults movies={props.watchLaterMovies} />
    </div>
  );
};

export default WatchLater;

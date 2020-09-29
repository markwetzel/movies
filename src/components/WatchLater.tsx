import MovieResult from '../types/MovieResult';
import MovieResults from './MovieResults';
import React from 'react';

export interface WatchLaterProps {
  watchLaterIds: number[];
  watchLaterMovies: MovieResult[];
}

const WatchLater: React.FC<WatchLaterProps> = (props) => {
  return (
    <>
      <MovieResults movies={props.watchLaterMovies} />
    </>
  );
};

export default WatchLater;

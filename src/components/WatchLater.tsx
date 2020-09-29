import MovieResult from '../types/MovieResult';
import React from 'react';
import WatchLaterResults from './WatchLaterResults';

export interface WatchLaterProps {
  onRemoveClick(movieResultId: number): void;
  watchLaterMovies: MovieResult[];
}

const WatchLater: React.FC<WatchLaterProps> = (props) => {
  return (
    <>
      <WatchLaterResults
        movies={props.watchLaterMovies}
        onRemoveClick={props.onRemoveClick}
      />
    </>
  );
};

export default WatchLater;

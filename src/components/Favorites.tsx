import MovieResult from '../types/MovieResult';
import React from 'react';
import WatchLaterResults from './WatchLaterResults';

export interface FavoritesProps {
  onRemoveClick(movieResultId: number): void;
  favoriteMovies: MovieResult[];
}

const Favorites: React.FC<FavoritesProps> = (props) => {
  return (
    <>
      <WatchLaterResults
        movies={props.favoriteMovies}
        onRemoveClick={props.onRemoveClick}
      />
    </>
  );
};

export default Favorites;

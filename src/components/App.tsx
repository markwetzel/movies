/* eslint-disable react/jsx-pascal-case */

import * as React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import API from '../api';
import Config from '../types/Config';
import Favorites from './Favorites';
import Header from './Header';
import MovieResult from '../types/MovieResult';
import MovieResults from './MovieResults';
import NavBar from './BottomNav';
import Search from './Search';
import TopNav from './TopNav';
import WatchLater from './WatchLater';
import styled from '@emotion/styled/macro';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [movies, setMovies] = React.useState<MovieResult[]>([]);
  const [watchLater, setWatchLater] = React.useState<MovieResult[]>([]);
  const [favorites, setFavorites] = React.useState<MovieResult[]>([]);

  const [tmdbConfig, setTmdbConfig] = React.useState<Config>();

  const $Container = styled.div`
    padding: 1em;
  `;

  // Get the TMDB configuration
  React.useEffect(() => {
    API.fetchConfig()
      .then((config) => {
        setTmdbConfig(config);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get current movies from localStorage
    const currentWatchLaterRaw = localStorage.getItem('watch-later');

    let currentWatchLaterJson;

    if (currentWatchLaterRaw) {
      currentWatchLaterJson = JSON.parse(currentWatchLaterRaw) as MovieResult[];
    }

    if (currentWatchLaterJson) {
      setWatchLater(currentWatchLaterJson);
    }

    // Get current movies from localStorage
    const currentFavoritesRaw = localStorage.getItem('favorites');

    let currentFavoritesJson;

    if (currentFavoritesRaw) {
      currentFavoritesJson = JSON.parse(currentFavoritesRaw) as MovieResult[];
    }

    if (currentFavoritesJson) {
      setFavorites(currentFavoritesJson);
    }
  }, []);

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    query: string
  ) => {
    event.preventDefault();

    const movieResults = await API.searchMovies(query);

    if (movieResults) {
      setMovies(movieResults);
    }
  };

  const handleFavoriteClick = async (movieResultId: number) => {
    if (!favorites.find((movie: MovieResult) => movie.id === movieResultId)) {
      const movieResult = await API.fetchMovie(movieResultId);
      if (movieResult) {
        const newFavorites = favorites.concat(movieResult);

        setFavorites(newFavorites);

        // Persist to localStorage
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
      }
    }
  };

  const handleWatchLaterClick = async (movieResultId: number) => {
    if (!watchLater.find((movie: MovieResult) => movie.id === movieResultId)) {
      const movieResult = await API.fetchMovie(movieResultId);
      if (movieResult) {
        const newWatchLater = watchLater.concat(movieResult);

        setWatchLater(newWatchLater);

        // Persist to localStorage
        localStorage.setItem('watch-later', JSON.stringify(newWatchLater));
      }
    }
  };

  const handleRemoveWatchLaterClick = (movieResultId: number) => {
    const newWatchLater = watchLater.filter(
      (movie) => movie.id !== movieResultId
    );

    setWatchLater(newWatchLater);

    // Persist to localStorage
    localStorage.setItem('watch-later', JSON.stringify(newWatchLater));
  };

  const handleRemoveFavoriteClick = (movieResultId: number) => {
    const newFavorites = favorites.filter(
      (movie) => movie.id !== movieResultId
    );

    setFavorites(newFavorites);

    // Persist to localStorage
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#f9bc50',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <TopNav />
        <$Container>
          <Header title='Cinemate' />
          <Switch>
            <Route path='/favorites'>
              <Favorites
                onRemoveClick={handleRemoveFavoriteClick}
                favoriteMovies={favorites}
              />
            </Route>
            <Route path='/later'>
              <WatchLater
                onRemoveClick={handleRemoveWatchLaterClick}
                watchLaterMovies={watchLater}
              />
            </Route>
            <Route path='/'>
              <Search onSubmit={handleSearchSubmit} />
              <MovieResults
                movies={movies}
                onFavoriteClick={handleFavoriteClick}
                onWatchLaterClick={handleWatchLaterClick}
                tmdbConfig={tmdbConfig}
              />
            </Route>
          </Switch>
        </$Container>
        <NavBar />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

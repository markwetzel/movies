/* eslint-disable react/jsx-pascal-case */

import * as React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Config from '../types/Config';
import Favorites from './Favorites';
import Header from './Header';
import MovieResult from '../types/MovieResult';
import MovieResults from './MovieResults';
import NavBar from './BottomNav';
import Search from './Search';
import TopNav from './TopNav';
import WatchLater from './WatchLater';
import axiosConfig from '../util/axios';
import styled from '@emotion/styled/macro';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [movies, setMovies] = React.useState<MovieResult[]>([]);
  const [watchLaterIds, setWatchLaterIds] = React.useState<number[]>([]);
  const [watchLater, setWatchLater] = React.useState<MovieResult[]>([]);

  const [tmdbConfig, setTmdbConfig] = React.useState<Config>();

  const $Container = styled.div`
    padding: 1em;
  `;

  // Get the TMDB configuration
  React.useEffect(() => {
    axiosConfig
      .get(`configuration?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
      .then((res) => {
        const config = res.data as Config;
        setTmdbConfig(config);
      })
      .catch(() => {
        console.log('Error retrieving config');
      });
  }, []);

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    query: string
  ) => {
    event.preventDefault();

    const movieResults = await searchMovies(query);
    console.log(movieResults);

    if (movieResults) {
      setMovies(movieResults);
    }
  };

  const handleFavoriteClick = (movieResultId: number) => {
    console.log('Favorite click', movieResultId);
  };

  const fetchMovie = async (
    movieId: number
  ): Promise<MovieResult | undefined> => {
    try {
      const res = await axiosConfig.get(
        `movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );

      return res.data as MovieResult;
    } catch (error) {
      console.log('Something went wrong!', error);
    }
  };

  const searchMovies = async (
    query: string
  ): Promise<MovieResult[] | undefined> => {
    try {
      const res = await axiosConfig.get(
        `search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      );

      return res.data.results as MovieResult[];
    } catch (error) {
      console.log('Something went wrong!', error);
    }
  };

  const handleWatchLaterClick = async (movieResultId: number) => {
    if (!watchLater.find((movie: MovieResult) => movie.id === movieResultId)) {
      const movieResult = await fetchMovie(movieResultId);
      if (movieResult) {
        setWatchLater(watchLater.concat(movieResult));
      }
    }
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
              <Favorites />
            </Route>
            <Route path='/later'>
              <WatchLater
                watchLaterIds={watchLaterIds}
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

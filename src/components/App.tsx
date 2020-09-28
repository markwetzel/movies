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

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    query: string
  ) => {
    event.preventDefault();
    axiosConfig
      .get(
        `search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      )
      .then((res) => {
        const { results: movieResults } = res.data;
        setMovies(movieResults);
      })
      .catch((err) => {
        console.log('Something went wrong!', err);
      });
  };

  const handleFavoriteClick = () => {
    console.log('Favorite click');
  };

  const handleWatchLaterClick = () => {
    console.log('Watch later click');
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
              <WatchLater />
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

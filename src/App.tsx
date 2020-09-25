import * as React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Config from './Config';
import Favorites from './Favorites';
import Header from './Header';
import MovieResult from './MovieResult';
import MovieResults from './MovieResults';
import NavBar from './BottomNav';
import Search from './Search';
import WatchLater from './WatchLater';
import axiosConfig from './axios';
import css from '@emotion/css/macro';
import styled from '@emotion/styled/macro';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [movies, setMovies] = React.useState<MovieResult[]>([]);

  const [tmdbConfig, setTmdbConfig] = React.useState<Config>();

  const Container = styled.div`
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

  return (
    <BrowserRouter>
      <Container>
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
            <MovieResults tmdbConfig={tmdbConfig} movies={movies} />
          </Route>
        </Switch>
      </Container>
      <NavBar />
    </BrowserRouter>
  );
};

export default App;

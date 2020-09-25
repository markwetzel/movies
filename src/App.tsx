import * as React from 'react';

import Config from './Config';
import Header from './Header';
import MovieResult from './MovieResult';
import MovieResults from './MovieResults';
import Search from './Search';
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
    <Container>
      <Header title='Cinemate' />
      <Search onSubmit={handleSearchSubmit} />
      <MovieResults tmdbConfig={tmdbConfig} movies={movies} />
    </Container>
  );
};

export default App;

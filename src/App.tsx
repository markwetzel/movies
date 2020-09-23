import * as React from 'react';

import MovieResult from './MovieResult';
import axiosConfig from './axios';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  const [movies, setMovies] = React.useState<MovieResult[]>([]);

  React.useEffect(() => {
    axiosConfig
      .get(
        `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=boondock&page=1&include_adult=false`
      )
      .then((res) => {
        const { results: movieResults } = res.data;
        console.log(movieResults);
        setMovies(movieResults);
      });
  }, []);

  return (
    <div>
      Movies
      {movies.map((movie) => (
        <article key={movie.id}>{movie.title}</article>
      ))}
    </div>
  );
};

export default App;

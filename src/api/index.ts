import Config from '../types/Config';
import MovieResult from '../types/MovieResult';
import axiosConfig from '../util/axios';

export default class API {
  static fetchConfig = async (): Promise<Config | undefined> => {
    try {
      const res = await axiosConfig.get(
        `configuration?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );

      return res.data as Config;
    } catch (error) {
      console.log('Something went wrong!', error);
    }
  };

  static fetchMovie = async (
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

  static searchMovies = async (
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
}

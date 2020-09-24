import React from 'react';
import { TextField } from '@material-ui/core';

export interface SearchProps {
  onSubmit(event: React.FormEvent<HTMLFormElement>, query: string): void;
}

const Search: React.FunctionComponent<SearchProps> = (props) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    props.onSubmit(event, query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoComplete='off'
        fullWidth={true}
        id='movie-name'
        label='Search movies...'
        name='movie-name'
        onChange={(e) => setQuery(e.target.value)}
        type='search'
        value={query}
      />
      <button>Search</button>
    </form>
  );
};

export default Search;

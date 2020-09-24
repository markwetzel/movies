import { IconButton, InputAdornment, TextField } from '@material-ui/core';

import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

export interface SearchProps {
  onSubmit(event: React.FormEvent<HTMLFormElement>, query: string): void;
}

const Search: React.FunctionComponent<SearchProps> = (props) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    props.onSubmit(event, query);
    setQuery('');
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
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton aria-label='search' type='submit'>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default Search;

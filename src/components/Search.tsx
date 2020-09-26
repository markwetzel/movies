/* eslint-disable react/jsx-pascal-case */

import { IconButton, InputAdornment, TextField } from '@material-ui/core';

import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styled from '@emotion/styled/macro';

const $Form = styled.form`
  margin: 1em 0;
`;

export interface SearchProps {
  onSubmit(event: React.FormEvent<HTMLFormElement>, query: string): void;
}

const Search: React.FunctionComponent<SearchProps> = (props) => {
  const [query, setQuery] = React.useState('');

  const isQueryEmpty = () => query.trim().length === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isQueryEmpty()) {
      event.preventDefault();
      return;
    }

    props.onSubmit(event, query);
    setQuery('');
  };

  return (
    <$Form onSubmit={handleSubmit}>
      <TextField
        autoComplete='off'
        fullWidth={true}
        id='movie-name'
        label='Search movies...'
        name='movie-name'
        onChange={(e) => setQuery(e.target.value)}
        type='search'
        value={query}
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='search'
                disabled={isQueryEmpty()}
                type='submit'
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </$Form>
  );
};

export default Search;

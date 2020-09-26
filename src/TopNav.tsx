/* eslint-disable react/jsx-pascal-case */

import { NavLink } from 'react-router-dom';
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import styled from '@emotion/styled/macro';

const theme = createMuiTheme();

const $Nav = styled.nav`
  ${theme.breakpoints.down('xs')} {
    display: none !important;
  }
`;

const $Ul = styled.ul`
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
`;

const $NavLink = styled(NavLink)`
  color: #000;
  font-size: 1.3em;
  font-weight: 400;
  text-decoration: none;
  &.active {
    color: #f9bc50;
    font-weight: 500;
  }
`;

export interface TopNavProps {}

const TopNav: React.FC<TopNavProps> = (props) => {
  return (
    <$Nav>
      <$Ul>
        <li>
          <$NavLink activeClassName='active' exact to='/'>
            Search
          </$NavLink>
        </li>
        <li>
          <$NavLink activeClassName='active' to='/later'>
            Watch Later
          </$NavLink>
        </li>
        <li>
          <$NavLink activeClassName='active' to='/favorites'>
            Favorites
          </$NavLink>
        </li>
      </$Ul>
    </$Nav>
  );
};

export default TopNav;

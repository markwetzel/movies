/* eslint-disable react/jsx-pascal-case */

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { createMuiTheme } from '@material-ui/core/styles';
import styled from '@emotion/styled/macro';
import { useHistory } from 'react-router-dom';

const theme = createMuiTheme();

const $BottomNavigation = styled(BottomNavigation)`
  bottom: 0;
  position: fixed;
  width: 100%;

  ${theme.breakpoints.up('sm')} {
    display: none !important;
  }
`;

const BottomNav: React.FC = (props) => {
  const history = useHistory();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    switch (newValue) {
      case 0:
        history.push('/');
        break;
      case 1:
        history.push('/later');
        break;
      case 2:
        history.push('/favorites');
        break;
      default:
        history.push('/');
        break;
    }
    setValue(newValue);
  };

  return (
    <$BottomNavigation onChange={handleChange} showLabels value={value}>
      <BottomNavigationAction icon={<SearchIcon />} label='Search' />
      <BottomNavigationAction icon={<WatchLaterIcon />} label='Watch Later' />
      <BottomNavigationAction icon={<FavoriteIcon />} label='Favorites' />
    </$BottomNavigation>
  );
};

export default BottomNav;

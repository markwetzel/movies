import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
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
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label='Search' icon={<SearchIcon />} />
      <BottomNavigationAction label='Watch Later' icon={<WatchLaterIcon />} />
      <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
    </BottomNavigation>
  );
}

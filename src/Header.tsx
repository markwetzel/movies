import React from 'react';
import { Typography } from '@material-ui/core';
import logo from './logo.png';

export interface HeaderProps {
  title: string;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { title } = props;
  return (
    <header>
      <img src={logo} alt='Logo' />
      <Typography component='h1' variant='h2'>
        {title}
      </Typography>
    </header>
  );
};

export default Header;

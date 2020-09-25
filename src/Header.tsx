import React from 'react';
import { Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import css from '@emotion/css/macro';
import logo from './logo.png';
import styled from '@emotion/styled/macro';

export interface HeaderProps {
  title: string;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { title } = props;

  const theme = createMuiTheme();

  const Header = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;

    /* ${theme.breakpoints.down(
      'sm'
    )} {
      justify-content: space-around;
    } */
  `;

  return (
    <Header>
      <img src={logo} alt='Logo' height='100px' />
      <Typography component='h1' variant='h2'>
        {title}
      </Typography>
    </Header>
  );
};

export default Header;

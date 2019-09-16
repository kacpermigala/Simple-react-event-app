import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import logo from '../logo.png';

const Layout = ({ children }) => (
  <Container className="App">
    <Link to="/" className="logo-wrapper">
      <img src={logo} alt="logo" />
    </Link>
    {children}
  </Container>
);

export default Layout;

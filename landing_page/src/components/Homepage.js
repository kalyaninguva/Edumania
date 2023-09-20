import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './Header';
import PlaceToVisit from './PlaceToVisit';
import Navbar from './Navbar';
import NavbarHome from './NavbarHome';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/homepage.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
const  Homepage = () => {
  const classes = useStyles();
  return (
      <div className={classes.root}>
      <NavbarHome/>
      <CssBaseline />
      <Header />
      <PlaceToVisit />
    </div>
  );
}

export default Homepage

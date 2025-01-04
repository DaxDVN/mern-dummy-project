import React from 'react';
import Navigation from "./Navigation.jsx";
import {Outlet} from 'react-router-dom'

function Layout(props) {
  return (
    <>
      <Navigation />
      <Outlet/>
    </>
  );
}

export default Layout;
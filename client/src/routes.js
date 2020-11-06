import React from "react";

import Home from 'containers/Home';
import Profile from 'containers/Profile';



const routes = [
  // TODO: move new routes to separate section
  {
    path: "/",
    exact: true,
    name: "App Entry Point",
    component: Home
  },
  // {
  //   path: "/login",
  //   exact: true,
  //   name: "Login",
  //   component: Login,
  // },
  {
    path: "/home",
    exact: true,
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
];

export default routes;

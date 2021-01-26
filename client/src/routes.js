import Home from "containers/Home";
import Profile from "containers/Profile";
import Friends from "containers/Friends";

const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   name: "App Entry Point",
  //   component: Home,
  // },
  {
    path: "/home",
    exact: true,
    name: "Home",
    component: Home,
  },
  {
    path: "/user/:id",
    exact: true,
    name: "Profile",
    component: Profile,
  },
  {
    path: "/user/:id/followers",
    exact: true,
    name: "Followers",
    component: Friends,
  },
  {
    path: "/user/:id/following",
    exact: true,
    name: "Following",
    component: Friends,
  },
];

export default routes;

import React from 'react';
import {About, User, SuperMarket, Profile} from './withSplitting';

const path = [
  {
    path: "/",
    exact: true,
    component: () => <h2>Home</h2>
  }, {
    path: "/user",
    component: User
  }, {
    path: "/about",
    component: About
  }, {
    path: "/will-match",
    component: () => <h2>will-match</h2>
  }, {
    path: "/superMarket",
    component: SuperMarket
  }, {
    path: "/profile",
    component: () => <Profile username="moi" name="김유경"/>
  }
];

export default path;

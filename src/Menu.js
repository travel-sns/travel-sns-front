import React from 'react';
import {Link} from "react-router-dom";
const Menu = () => {
    return (<nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
        <li>
          <Link to="/user/">Users</Link>
        </li>
        <li>
          <Link to="/superMarket/">SuperMarket</Link>
        </li>
        <li>
          <Link to="/profile/">Profile</Link>
        </li>
        <li>
          <Link to="/will-match/">Will Match</Link>
        </li>
        <li>
          <Link to="/old-match/">Old Match, to be redirected</Link>
        </li>
        <li>
          <Link to="/nomatch/">nomatch</Link>
        </li>
      </ul>
    </nav>);
}

export default Menu;

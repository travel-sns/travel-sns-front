import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import path from "Src/path"
const RoutePage = () => {
    return (<Switch>
      {
        path.map((obj, index) => {
          return <Route key={index} path={obj.path} exact={obj.exact} component={obj.component}/>
        })
      }
      <Redirect from="/old-match" to="/will-match"/>
      <Route component={NoMatch}/>
    </Switch>);
}

function NoMatch() {
  return <h2>404</h2>;
}

export default RoutePage;

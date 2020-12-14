import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Routes from '../routes';

const RoutedMain = () => {
  return (
    <main>
      <Switch>
        {
          Routes.map((route, i) => {
            return (
              <Route key={i} path={route.path} children={route.component} />
            )
          })
        }
      </Switch>
    </main>
  );
}

export default RoutedMain;

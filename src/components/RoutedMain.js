import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AuthContext from '../context/AuthContext'

import Routes from '../routes'

const RoutedMain = () => {
  const auth = useContext(AuthContext)

  const routes = auth.isAuthentificated ? Routes.filter((x) => !x.hideIfLoggedIn) : Routes

  return (
    <main>
      <Switch>
        {
          routes.map((route, i) => {
            return (
              <Route key={i} path={route.path} children={route.component} />
            )
          })
        }
        <Redirect to='/events' />
      </Switch>
    </main>
  )
}

export default RoutedMain

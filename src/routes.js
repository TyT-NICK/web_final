// eslint-disable-next-line no-unused-vars
import React from 'react'

import AllAlbumsPage, { AlbumPage } from './components/_Albums/Albums'
import Sandbox from './components/sandbox/sandbox'
import AboutPage from './components/_About/about'
import { AllNews, NewsPage } from './components/_News/News'
import AuthPage from './components/_Auth/auth'
import { Redirect, Route, Switch } from 'react-router'
import EventsPage, { EventPage } from './components/_Events/Events'

export const useRoutes = (isAuthenticated) => {
  return (
    <Switch>
      <Route path="/albums" exact>
        <AllAlbumsPage />
      </Route>
      <Route path="/albums/:id" exact>
        <AlbumPage />
      </Route>
      <Route path="/albums/add" exact>
        <p>adding</p>
      </Route>
      <Route path="/events" exact>
        <EventsPage />
      </Route>
      <Route path="/events/:id" exact>
        <EventPage />
      </Route>
      <Route path="/news" exact>
        <AllNews />
      </Route>
      <Route path="/news/:id" exact>
        <NewsPage />
      </Route>
      <Route path="/shop" exact>
        {null}
      </Route>
      <Route path="/contacts" exact>
        {null}
      </Route>
      <Route path="/sandbox" exact>
        <Sandbox />
      </Route>
      <Route path="/about" exact>
        <AboutPage />
      </Route>
      {isAuthenticated ?
        <Route path="/addAdmin" exact>
          {null}
        </Route> :
        <Redirect to="/events" />
      }
      {!isAuthenticated ?
        <Route path="/login" exact>
          <AuthPage />
        </Route> :
        <Redirect to="/events" />
      }
      <Redirect to="/events" />
    </Switch>
  )
}

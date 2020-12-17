// eslint-disable-next-line no-unused-vars
import React from 'react'

import AllAlbumsPage, { AlbumPage } from './components/_Albums/Albums'
import Sandbox from './components/sandbox/sandbox'
import AboutPage, { EditAboutGroup } from './components/_About/about'
import { AllNews, NewsPage } from './components/_News/News'
import AuthPage from './components/_Auth/auth'
import { Redirect, Route, Switch } from 'react-router'
import EventsPage, { EventPage } from './components/_Events/Events'
import { Shop } from './components/_Shop/Shop'
import { ContactPage } from './components/_Contact/contact'

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
        <Shop />
      </Route>
      <Route path="/contacts" exact>
        <ContactPage />
      </Route>

      <Route path="/about" exact>
        <AboutPage />
      </Route>
      {
        isAuthenticated &&
        <Route path="/sandbox" exact>
          <Sandbox />
        </Route>
      }
      {
        isAuthenticated &&
          <Route path="/addAdmin" exact>
            {null}
          </Route>
      }
      {
        isAuthenticated &&
          <Route path="/about/editgroup">
            <EditAboutGroup />
          </Route>

      }
      { !isAuthenticated &&
          <Route path="/login" exact>
            <AuthPage />
          </Route>
      }
      <Redirect to="/news" />
    </Switch>
  )
}

// eslint-disable-next-line no-unused-vars
import React from 'react'

import AllAlbumsPage, { AlbumPage } from './components/_Albums/Albums'
import Events from './components/_Events/Events'
import Sandbox from './components/sandbox/sandbox'
import AboutPage from './components/_About/about'
import { AllNews, NewsPage } from './components/_News/News'
import AuthPage from './components/_Auth/auth'
import { Redirect, Route, Switch } from 'react-router'
import EventsPage from './components/_Events/Events'

// const Routes = [
//   new Route('/events', 'Афиша', <Events />),
//   new Route('/news/:id', 'Новость', <NewsPage />),
//   new Route('/news', 'Новости', <AllNews />),
//   new Route('/albums', 'Альбомы', <AlbumPage />),
//   new Route('/shop', 'Магазин', null),
//   new Route('/contacts', 'Контакты', null),
//   new Route('/about', 'О нас', <AboutPage />),
//   new Route('/sandbox', 'Песочница', <Sandbox />),
//   new Route('/login', 'Войти', <AuthPage />, true),
// ]

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
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
          <Events />
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
}

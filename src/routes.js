// eslint-disable-next-line no-unused-vars
import React from 'react'

import AllAlbumsPage, { AlbumPage } from './components/_Albums/Albums'
import Sandbox from './components/sandbox/sandbox'
import AboutPage, { EditAboutGroup, EditMember } from './components/_About/about'
import { AllNews, NewsPage } from './components/_News/News'
import AuthPage from './components/_Auth/auth'
import { Redirect, Route, Switch } from 'react-router'
import EventsPage, { EventPage } from './components/_Events/Events'
import { Shop, EditMerchCategory } from './components/_Shop/Shop'
import { ContactPage } from './components/_Contact/contact'

export const useRoutes = (isAuthenticated) => {
  return (
    <Switch>

      {/* ALBUM routes */}
      <Route path="/albums" exact>
        <AllAlbumsPage />
      </Route>
      <Route path="/albums/:id" exact>
        <AlbumPage />
      </Route>
      <Route path="/albums/add" exact>
        <p>adding</p>
      </Route>

      {/* NEWS routes */}
      <Route path="/events" exact>
        <EventsPage />
      </Route>
      <Route path="/events/:id" exact>
        <EventPage />
      </Route>

      {/* NEWS routes */}
      <Route path="/news" exact>
        <AllNews />
      </Route>
      <Route path="/news/:id" exact>
        <NewsPage />
      </Route>

      {/* SHOP routes */}
      <Route path="/shop" exact>
        <Shop />
      </Route>
      {
        isAuthenticated &&
        <Route path="/shop/item/:id?">
          <EditMerchCategory />
        </Route>
      }

      {/* CONTACT route */}
      <Route path="/contacts" exact>
        <ContactPage />
      </Route>

      {/* ABOUT routes */}
      <Route path="/about" exact>
        <AboutPage />
      </Route>
      {
        isAuthenticated &&
        <Route path="/about/member/:id?">
          <EditMember />
        </Route>
      }
      {
        isAuthenticated &&
        <Route path="/about/editgroup">
          <EditAboutGroup />
        </Route>
      }

      {/* MANAGING */}
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
<<<<<<< HEAD
        </Route>
=======
        </Route> :
        <Redirect to="/news" />
>>>>>>> origin/fix/fixed_logo
      }

      { !isAuthenticated &&
        <Route path="/login" exact>
          <AuthPage />
<<<<<<< HEAD
        </Route>
=======
        </Route> :
        <Redirect to="/news" />
>>>>>>> origin/fix/fixed_logo
      }
      <Redirect to="/news" />
    </Switch>
  )
}

import React from 'react'

import AllAlbumsPage, { AlbumPage, EditAlbum } from './components/_Albums/Albums'
import Sandbox from './components/sandbox/sandbox'
import AboutPage, { EditAboutGroup, EditMember } from './components/_About/about'
import { AllNews, NewsPage, EditNews } from './components/_News/News'
import AuthPage from './components/_Auth/auth'
import { Redirect, Route, Switch } from 'react-router'
import EventsPage, { EditEvent, EventPage } from './components/_Events/Events'
import { Shop, EditMerchCategory } from './components/_Shop/Shop'
import { ContactPage } from './components/_Contact/contact'

export const useRoutes = (isAuthenticated) => {
  return (
    <Switch>

      {/* ALBUM routes */}
      <Route path="/albums" exact>
        <AllAlbumsPage />
      </Route>
      {
        isAuthenticated &&
        <Route path="/albums/edit/:id?">
          <EditAlbum />
        </Route>
      }
      <Route path="/albums/album/:id" exact>
        <AlbumPage />
      </Route>

      {/* EVENTS routes */}
      <Route path="/events" exact>
        <EventsPage />
      </Route>
      {
        isAuthenticated &&
        <Route path="/events/edit/:id?">
          <EditEvent />
        </Route>
      }
      <Route path="/events/event/:id" exact>
        <EventPage />
      </Route>

      {/* NEWS routes */}
      <Route path="/news" exact>
        <AllNews />
      </Route>
      {
        // isAuthenticated &&
        <Route path="/news/edit/:id?">
          <EditNews />
        </Route>
      }
      <Route path="/news/news/:id" exact>
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

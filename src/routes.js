// eslint-disable-next-line no-unused-vars
import React from 'react'

import AlbumPage from './components/_Albums/Albums'
import Events from './components/_Events/Events'
import Sandbox from './components/sandbox/sandbox'
import AboutPage from './components/_About/about'
import { AllNews, NewsPage } from './components/_News/News'
import AuthPage from './components/_Auth/auth'

class Route {
  constructor(path, title, component, hideIfLoggedIn=false) {
    this.path = path
    this.title = title
    this.component = component
    this.hideIfLoggedIn = hideIfLoggedIn
  }
}

const Routes = [
  new Route('/events', 'Афиша', <Events />),
  new Route('/news/:id', 'Новость', <NewsPage />),
  new Route('/news', 'Новости', <AllNews />),
  new Route('/albums', 'Альбомы', <AlbumPage />),
  new Route('/shop', 'Магазин', null),
  new Route('/contacts', 'Контакты', null),
  new Route('/about', 'О нас', <AboutPage />),
  new Route('/sandbox', 'Песочница', <Sandbox />),
  new Route('/login', 'Войти', <AuthPage />, true),
]

export default Routes

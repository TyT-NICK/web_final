import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  const imgUrl =
  'https://raw.githubusercontent.com/TyT-NICK/web_final/main/public/resources/logo.png?token=AMZCV6WPCPKRN3BI64W2TSS73HTMY'
  return (
    <header>
      <div className="content-container">
        <img className="header-logo" src={imgUrl} alt="" />
        <nav className="header-nav">
          <NavLink to="/events">Афиша</NavLink>
          <NavLink to="/news">Новости</NavLink>
          <NavLink to="/albums">Альбомы</NavLink>
          <NavLink to="/shop">Магазин</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
          <NavLink to="/about">О нас</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header

import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  const imgUrl = 'https://i.ibb.co/yssSp8b/logo.png'

  return (
    <header>
      <div className="content-container">
        <img className="header-logo" src={imgUrl} alt="" />
        <nav className="header-nav">
          <NavLink to="/news">Новости</NavLink>
          <NavLink to="/events">Афиша</NavLink>
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

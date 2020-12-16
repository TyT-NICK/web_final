import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  const imgUrl =
  'https://vk.com/doc172967407_580004196?hash=3a9a24a8c2e5117187&dl=26ce2e3a8c09656e77'
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

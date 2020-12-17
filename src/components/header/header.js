import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  const imgUrl =
    'https://psv4.userapi.com/c856332/u172967407/docs/d8/92480309c42a/' +
    'logo.png?extra=D9mZOKJZwltq9y3r4QfXyRn5QmM1Y_ZnNCNWykEKfmGQ5qdGIM7dY' +
    '3QzWyovEBo7VUaskXpqiFjHgKlcXZa79GEAByWDtqC0icfwOc7Zx0biDWyfKu0YeqG8VQsXBk5jJ6B2PVzMvbFG4tz_l5mECSYiwQ'
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

import React from 'react';
import { NavLink } from 'react-router-dom';
// import logo from './logo.svg';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <div className="content-container">
        <img className="header-logo" src="./resources/logo.png" alt="" />
        <nav className="header-nav">
          <NavLink to="/events">Афиша</NavLink>
          <NavLink to="/news">Новости</NavLink>
          <NavLink to="/albums">Альбомы</NavLink>
          <NavLink to="/shop">Магазин</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
          <NavLink to="/about">О нас</NavLink>
          {/* <NavLink to="/sandbox">Песочница</NavLink> */}
        </nav>
      </div>
    </header>
  )
}

export default Header;
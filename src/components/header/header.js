import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'
import { push as Menu } from 'react-burger-menu'

const NavBar = () => {
  return (
    <>
      <nav className="header-nav">
        <NavLink to="/news">Новости</NavLink>
        <NavLink to="/events">Афиша</NavLink>
        <NavLink to="/albums">Альбомы</NavLink>
        <NavLink to="/shop">Магазин</NavLink>
        <NavLink to="/contacts">Контакты</NavLink>
        <NavLink to="/about">О нас</NavLink>
      </nav>
    </>
  )
}

const MobileNavBar = () => {
  const imgUrl2 =
    'https://psv4.userapi.com/c505536/u172967407/docs/d11/847812c930eb/588a64d2d06f6719692a2d0e.png?extra=LG' +
    '-oM2gDQQN7gCQrXp2UXHxy9YLarNVW_BWPcLNTDvp0ZjrTsWE232IPuL - m6OByLMv4OwDpdDtcja2n - fKL4bEJmNe6Gddz7DKbZlqj' +
    '5a20AMM7dXcViubpad0hb - egxLJTMNMi3jIoRJoPztp6A4k'
  const [ state, setState ] = useState(false)
  const closeMenu = () => {
    setState({ menuOpen: false })
  }
  return (
    <>
      <Menu isOpen={state} pageWrapId={ 'page-wrap' } customBurgerIcon={ <img className="burger" src={imgUrl2} /> }>
        <NavLink onClick={() => closeMenu()} to="/news">Новости</NavLink>
        <NavLink onClick={() => closeMenu()} to="/events">Афиша</NavLink>
        <NavLink onClick={() => closeMenu()} to="/albums">Альбомы</NavLink>
        <NavLink onClick={() => closeMenu()} to="/shop">Магазин</NavLink>
        <NavLink onClick={() => closeMenu()} to="/contacts">Контакты</NavLink>
        <NavLink onClick={() => closeMenu()} to="/about">О нас</NavLink>
      </Menu>
    </>
  )
}

const Header = () => {
  const imgUrl =
    'https://psv4.userapi.com/c856332/u172967407/docs/d8/92480309c42a/' +
    'logo.png?extra=D9mZOKJZwltq9y3r4QfXyRn5QmM1Y_ZnNCNWykEKfmGQ5qdGIM7dY' +
    '3QzWyovEBo7VUaskXpqiFjHgKlcXZa79GEAByWDtqC0icfwOc7Zx0biDWyfKu0YeqG8VQsXBk5jJ6B2PVzMvbFG4tz_l5mECSYiwQ'
  return (
    <header>
      <div className="content-container">
        <img className="header-logo" src={imgUrl} alt="" />

        <div className="mobile">
          <MobileNavBar />
        </div>

        <div className="desctop">
          <NavBar />
        </div>
        {/* <MobileNavBar /> */}
        {/* <nav className="header-nav">
          <NavLink to="/news">Новости</NavLink>
          <NavLink to="/events">Афиша</NavLink>
          <NavLink to="/albums">Альбомы</NavLink>
          <NavLink to="/shop">Магазин</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
          <NavLink to="/about">О нас</NavLink>
        </nav> */}
      </div>
    </header>
  )
}

export default Header

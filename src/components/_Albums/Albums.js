import React from 'react'
import { NavLink } from 'react-router-dom'

import './Albums.scss'

import Button from '../button/Button'

export const AlbumPage = (props) => {
  const album = props.album

  return (
    <div className="content-container">

    </div>
  )
}

const AlbumItem = (props) => {
  const album = props.album
  const path = `/albums/${album.id}`

  return (
    <div className="album-item">
      <figure>
        <img src="https://via.placeholder.com/170x170" alt="123" />
        <figcaption><NavLink to={path}>{album.name}</NavLink></figcaption>
      </figure>
      <Button caption='слушать' action={() => alert(123)} />
    </div>
  )
}

const album = {
  id: 1,
  name: '12asdasdasd asdasda asd a3',
}

const AllAlbumsPage = (props) => {
  return (
    <div className="content-container">
      <section className="albums">
        <h2 className="main-title"><span>Наши релизы</span></h2>
        {/* <h1>Альбомы</h1> */}
        <div className="albums-container">
          <AlbumItem album={album} />
          <AlbumItem album={album} />
          <AlbumItem album={album} />
          <AlbumItem album={album} />
        </div>
      </section>
    </div>
  )
}

export default AllAlbumsPage

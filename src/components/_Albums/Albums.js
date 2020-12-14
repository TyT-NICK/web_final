import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './Albums.scss'
import { useHttp } from '../../hooks/http.hook'
import { Preloader } from '../preloader/preloader'

export const AlbumPage = () => {
  const { request, loading } = useHttp()
  const { id } = useParams()
  const [ album, setAlbum ] = useState('')

  useEffect(() => {
    const fetching = async () => {
      console.log(id)
      const fetched = await request(`/api/album/${id}`, 'GET', null)
      setAlbum(fetched)
    }
    fetching()
  }, [])

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <section className="about-group">
          <h1 className="main-title"><span>{album.title}</span></h1>
          <figure className="">
            <div className="img"><img src={album.imgUrl} alt="" /></div>
            <figcaption><p>{album.caption}</p></figcaption>
          </figure>
        </section>
      </div>
  )
}

const AlbumItem = (props) => {
  const album = props.album
  const path = `/albums/${album._id}`

  return (
    <Link to={path}>
      <div className="album-item">
        <figure>
          <img src="https://via.placeholder.com/170x170" alt="123" />
          <figcaption>{album.title}</figcaption>
        </figure>
      </div>
    </Link>
  )
}

const album = {
  id: 1,
  title: '12asdasdasd asdasda asd a3',
}

const AllAlbumsPage = (props) => {
  const { request, loading } = useHttp()
  const [ albums, setAlbums ] = useState([])
  const auth = useContext(AuthContext)
  const isAuthenticated = auth.isAuthenticated

  useEffect(() => {
    const fetching = async () => {
      const fetched = await request('/api/album/', 'GET', null)
      setAlbums(fetched)
    }
    fetching()
  }, [])

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <section className="albums">
          {
            isAuthenticated ?
              <Link to="/albums/add" /> :
              null
          }
          <h2 className="main-title"><span>Наши релизы</span></h2>
          <div className="albums-container">
            {
              albums.map((x, i) => <AlbumItem key={i} album={x} />)
            }
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

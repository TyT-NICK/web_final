import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './Albums.scss'
import { useHttp } from '../../hooks/http.hook'
import { Preloader } from '../preloader/preloader'

export const AlbumPage = () => {
  const { request, loading } = useHttp()
  const { id } = useParams()
  const [ album, setAlbum ] = useState({ })

  useEffect(() => {
    const fetching = async () => {
      console.log(id)
      const fetched = await request(`/api/album/${id}`, 'GET', null)
      setAlbum(fetched)
    }
    fetching()
  }, [ id, request ])

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

        <section className="album-info">
          <div className="album-tracks">
            <h1 className="sub-title"><span>Список песен</span></h1>
            <ul>
              {
                !album.Tracks ? null :
                  album.Tracks.map((x, i) => <li key={i}>{x}</li>)
              }
            </ul>
          </div>
          <div className="album-right-bar">
            <h2 className="sub-title"><span>Слушать</span></h2>
            <ul>
              {
                !album.AlbumServices ? null :
                  album.AlbumServices.map((x, i) => <li key={i}>{x}</li>)
              }
            </ul>
            <h2 className="sub-title"><span>Авторы</span></h2>
            <ul>
              {
                !album.AlbumAuthors ? null :
                  album.AlbumAuthors.map((x, i) => <li key={i}>{x}</li>)
              }
            </ul>
          </div>
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
          <div className="img">
            <img src="https://via.placeholder.com/100x300" alt="123" />
          </div>
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
  }, [ request ])

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

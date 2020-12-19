import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Preloader } from '../preloader/preloader'

import './Albums.scss'

export const EditAlbum = () => {
  const [ input, setInput ] = useState({
    title: '',
    caption: '',
    imgUrl: '',
    AlbumAuthors: [ { name: '', socialLink: '' } ],
    AlbumServices: [ { title: '', link: '' } ],
    Tracks: [ '' ],
  })

  const { id } = useParams()
  const { loading, request } = useHttp()

  const path = '/api/album'

  useEffect(() => {
    const fetching = async () => {
      const fetched = await request(`${path}/${id}`, 'GET')
      setInput(fetched)
    }

    id && fetching()
  }, [ id, path, request ])

  const formSubmitHandler = (e) => {
    e.preventDefault()
    console.log(input)

    id ?
      request(`${path}/${id}`, 'PUT', input) :
      request(`${path}/add`, 'POST', input)
  }

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  // AUTHORS manipulation
  const authorsChangeHandler = (index, e) => {
    setInput({ ...input, AlbumAuthors: input.AlbumAuthors.map((x, i) => {
      return i === index ? { ...x, [e.target.name]: e.target.value } : x
    }) })
  }
  const authorsAddHandler = () => {
    setInput({ ...input, AlbumAuthors: [ ...input.AlbumAuthors, { name: '', socialLink: '' } ] })
  }
  const authorDeleteHandler = (e, i) => {
    e.preventDefault()

    const newArray = [ ...input.AlbumAuthors ]
    newArray.splice(i, 1)
    setInput({ ...input, AlbumAuthors: newArray })
  }

  // SERVICES manipulation
  const servicesChangeHandler = (index, e) => {
    setInput({ ...input, AlbumServices: input.AlbumServices.map((x, i) => {
      return i === index ? { ...x, [e.target.name]: e.target.value } : x
    }) })
  }
  const serviceAddHandler = () => {
    setInput({ ...input, AlbumServices: [ ...input.AlbumServices, { title: '', link: '' } ] })
  }
  const serviceDeleteHandler = (e, i) => {
    e.preventDefault()

    const newArray = [ ...input.AlbumServices ]
    newArray.splice(i, 1)
    setInput({ ...input, AlbumServices: newArray })
  }

  // TRACKS manipulation
  const tracksChangeHandler = (index, e) => {
    setInput({ ...input, Tracks: input.Tracks.map((x, i) => {
      return i === index ? e.target.value : x
    }) })
  }
  const tracksAddHandler = () => {
    setInput({ ...input, Tracks: [ ...input.Tracks, '' ] })
  }
  const tracksDeleteHandler = (e, i) => {
    e.preventDefault()

    const newArray = [ ...input.Tracks ]
    newArray.splice(i, 1)
    setInput({ ...input, Tracks: newArray })
  }

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <form action="" className="edit-form" onSubmit={formSubmitHandler}>
          <div className="form-item">
            <label htmlFor="title">Название альбома</label>
            <input
              type="text"
              name="title"
              id="title"
              value={input.title}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-item">
            <label htmlFor="caption">Описание альбома</label>
            <textarea
              name="caption"
              id="caption"
              value={input.caption}
              onChange={inputChangeHandler} />
          </div>

          <div className="form-item">
            <label htmlFor="imgUrl">Ссылка на обложку</label>
            <input
              type="text"
              name="imgUrl"
              id="imgUrl"
              value={input.imgUrl}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-item">
            <label>Авторы альбома</label>
            {
              input.AlbumAuthors.map((x, i) => {
                return (
                  <div key={i} className="flex-pair">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Имя автора"
                      value={x.name}
                      onChange={(e) => authorsChangeHandler(i, e)}
                    />
                    <input
                      type="text"
                      name="socialLink"
                      id="socialLink"
                      placeholder="Ссылка на соцсети"
                      value={x.socialLink}
                      onChange={(e) => authorsChangeHandler(i, e)}
                    />
                    {
                      input.AlbumAuthors.length !== 1 &&
                      <button onClick={(e) => authorDeleteHandler(e, i)}>Удалить</button>
                    }
                    {
                      input.AlbumAuthors.length - 1 === i &&
                      <button onClick={() => authorsAddHandler()}>Добавить</button>
                    }
                  </div>
                )
              })
            }
          </div>

          <div className="form-item">
            <label>Где послушать</label>
            {
              input.AlbumServices.map((x, i) => {
                return (
                  <div key={i} className="flex-pair">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Название сервиса"
                      value={x.title}
                      onChange={(e) => servicesChangeHandler(i, e)}
                    />
                    <input
                      type="text"
                      name="link"
                      id="link"
                      placeholder="Ссылка на альбом"
                      value={x.link}
                      onChange={(e) => servicesChangeHandler(i, e)}
                    />
                    {
                      input.AlbumServices.length !== 1 &&
                      <button onClick={(e) => serviceDeleteHandler(e, i)}>Удалить</button>
                    }
                    {
                      input.AlbumServices.length - 1 === i &&
                      <button onClick={() => serviceAddHandler()}>Добавить</button>
                    }
                  </div>
                )
              })
            }
          </div>

          <div className="form-item">
            <label>Список треков</label>
            {
              input.Tracks.map((x, i) => {
                return (
                  <div key={i}>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Название трека"
                      value={x}
                      onChange={(e) => tracksChangeHandler(i, e)}
                    />
                    {
                      input.Tracks.length !== 1 &&
                      <button onClick={(e) => tracksDeleteHandler(e, i)}>Удалить</button>
                    }
                    {
                      input.Tracks.length - 1 === i &&
                      <button onClick={() => tracksAddHandler()}>Добавить</button>
                    }
                  </div>
                )
              })
            }
          </div>

          <div className="form-item">
            <input type="submit" />
          </div>
        </form>
      </div>
  )
}

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
                  album.AlbumServices.map((x, i) => {
                    return <li key={i}>
                      <a href={x.link}>{x.title}</a>
                    </li>
                  })
              }
            </ul>
            <h2 className="sub-title"><span>Авторы</span></h2>
            <ul>
              {
                !album.AlbumAuthors ? null :
                  album.AlbumAuthors.map((x, i) => {
                    return <li key={i}>
                      <a href={x.socialLink}>{x.name}</a>
                    </li>
                  })
              }
            </ul>
          </div>
        </section>
      </div>
  )
}

const AlbumItem = (props) => {
  const album = props.album
  const editPath = `/albums/edit/${album._id}`
  const path = `/albums/album/${album._id}`

  const auth = useContext(AuthContext)
  const { request } = useHttp()

  const deleteItemClickHandle = async (e) => {
    e.preventDefault()
    if (window.confirm(`Действительно удалить альбом ${album.title}?`)) {
      await request(`/api/album/${album._id}`, 'DELETE')
      window.location.reload()
    }
  }


  return (
    <Link to={path}>
      <div className="album-item">
        <figure>
          <div className="img">
            <img src={album.imgUrl} alt="123" />
          </div>
          <figcaption>{album.title}</figcaption>
        </figure>
        {
          auth.isAuthenticated &&
          <div className="admin-panel">
            <Link to={editPath} className="button">изменить</Link>
            <Link className="button" onClick={deleteItemClickHandle}>удалить</Link>
          </div>
        }
      </div>
    </Link>
  )
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
          </div>
          {
            auth.isAuthenticated &&
            <div className="admin-panel">
              <Link className="button" to="/albums/edit/">добавить</Link>
            </div>
          }
        </section>
      </div>
  )
}

export default AllAlbumsPage

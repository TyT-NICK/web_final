import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './Albums.scss'
import { useHttp } from '../../hooks/http.hook'
import { Preloader } from '../preloader/preloader'


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
  console.log(id)
  const { loading, request } = useHttp()

  const path = '/api/album'

  useEffect(() => {
    const fetching = async () => {
      const fetched = await request(`${path}/${id}`, 'GET')
      setInput(fetched)
    }

    id && fetching()
  }, [ path, request ])

  const formSubmitHandler = (e) => {
    e.preventDefault()

    id ?
      request(path, 'PUT', input) :
      request(`${path}/add`, 'POST', input)
  }

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    console.log(input)
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
  const authorDeleteHandler = (i) => {
    setInput({ ...input, AlbumAuthors: input.AlbumAuthors.splice(i, 1) })
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
  const serviceDeleteHandler = (i) => {
    setInput({ ...input, AlbumServices: input.AlbumServices.splice(i, 1) })
  }

  // TRACKS manipulation
  const tracksChangeHandler = (index, e) => {
    setInput({ ...input, Tracks: input.Tracks.map((x, i) => {
      return i === index ? { ...x, [e.target.name]: e.target.value } : x
    }) })
  }
  const tracksAddHandler = () => {
    setInput({ ...input, Tracks: [ ...input.Tracks, '' ] })
  }
  const tracksDeleteHandler = (i) => {
    setInput({ ...input, Tracks: input.Tracks.splice(i, 1) })
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
                      value={x.name}
                      onChange={(e) => authorsChangeHandler(i, e)}
                    />
                    <input
                      type="text"
                      name="socialLink"
                      id="socialLink"
                      value={x.socialLink}
                      onChange={(e) => authorsChangeHandler(i, e)}
                    />
                    {
                      input.AlbumAuthors.length !== 1 &&
                      <button onClick={() => authorDeleteHandler(i)}>Удалить</button>
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
          {
            auth.isAuthenticated &&
            <div className="admin-panel">
              <Link className="button" to="/albums/edit">добавить</Link>
            </div>
          }
        </section>
      </div>
  )
}

export default AllAlbumsPage

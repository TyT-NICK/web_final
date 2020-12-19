import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import Moment from 'moment'

import { useHttp } from '../../hooks/http.hook'
import AuthContext from '../../context/AuthContext'
import { Preloader } from '../preloader/preloader'

import './News.scss'

export const EditNews = () => {
  const [ input, setInput ] = useState({
    title: '',
    previewUrl: '',
    content: '',
    date: Moment.now(),
  })

  const { id } = useParams()
  const { loading, request } = useHttp()

  const path = '/api/news'

  useEffect(() => {
    const fetching = async () => {
      const fetched = await request(`${path}/${id}`, 'GET')
      setInput({ ...fetched, date: Moment(fetched.date) })
    }

    id && fetching()
  }, [ id, path, request ])

  const formSubmitHandler = (e) => {
    e.preventDefault()
    console.log(input)

    id ?
      request(`${path}/${id}`, 'PUT', input) :
      request(`${path}/add`, 'POST', { ...input, date: Moment.now() })
  }

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <form action="" className="edit-form" onSubmit={formSubmitHandler}>
          <div className="form-item">
            <label htmlFor="title">Заголовок новости</label>
            <input
              type="text"
              name="title"
              id="title"
              value={input.title}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-item">
            <label htmlFor="caption">Ссылка на изображение</label>
            <input
              type="text"
              name="previewUrl"
              id="previewUrl"
              value={input.previewUrl}
              onChange={inputChangeHandler}
            />

          </div>

          <div className="form-item">
            <label htmlFor="imgUrl">Текст новости</label>
            <input
              type="text"
              name="content"
              id="content"
              value={input.content}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-item">
            <input type="submit" />
          </div>
        </form>
      </div>
  )
}

export const NewsPage = () => {
  const { id } = useParams()
  const [ news, setNews ] = useState({})
  const { loading, request } = useHttp()

  const path = `/api/news/${id}/`

  useEffect(()=> {
    const fetching = async () => {
      const fetched = await request(path, 'GET')
      setNews(fetched)
    }

    fetching()
  }, [ path, request ])

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <section>
          <h2 className="main-title"><span>{news.title}</span></h2>
          <div className="content">
            <div className="img news-img">
              <img src={news.previewUrl} alt="" />
            </div>
            <p className="content">
              {news.content}
            </p>
          </div>
          <span className="date">
            {Moment(news.date).format('DD.MM.YYYY')}
          </span>
        </section>
      </div>
  )
}

const NewsItem = (props) => {
  const news = props.news
  const path = `/news/news/${news._id}`
  const editPath = `/news/edit/${news._id}`

  const auth = useContext(AuthContext)
  const { request } = useHttp()

  const deleteItemClickHandle = async (e) => {
    e.preventDefault()
    if (window.confirm(`Действительно удалить новость ${news.title}?`)) {
      await request(`/api/news/${news._id}`, 'DELETE')
      window.location.reload()
    }
  }

  return (
    <Link to={path}>
      <section className="news-item">
        {/* <div className="img"><img src={'https://via.placeholder.com/170x170'} alt="" /></div> */}
        <div className="img item-img"><img src={news.previewUrl} alt="" /></div>
        <div className="flex-filler news-title">
          <h2 className="sub-title news-item-title">
            <span>{news.title}</span>
          </h2>
        </div>
        <span className="date">
          { Moment(news.date).format('DD.MM.YYYY') }
        </span>
      </section>
      {
        auth.isAuthenticated &&
          <div className="admin-panel">
            <Link to={editPath} className="button">изменить</Link>
            <Link className="button" onClick={deleteItemClickHandle}>удалить</Link>
          </div>
      }
    </Link>
  )
}

export const AllNews = () => {
  const [ news, setNews ] = useState([])
  const { loading, request } = useHttp()
  const auth = useContext(AuthContext)

  const path = '/api/news/'

  useEffect(()=> {
    const fetching = async () => {
      const fetched = await request(path, 'GET')
      fetched.reverse()
      setNews(fetched)
    }

    fetching()
  }, [ path, request ])

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        {
          auth.isAuthenticated &&
            <div className="admin-panel">
              <Link className="button" to="/news/edit/">добавить</Link>
            </div>
        }
        <h1 className="main-title"><span>Новости</span></h1>
        {
          news.map((x, i) => <NewsItem news={x} key={i} />)
        }
      </div>
  )
}

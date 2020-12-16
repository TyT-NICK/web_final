import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Moment from 'moment'

import { useHttp } from '../../hooks/http.hook'

import { Preloader } from '../preloader/preloader'

import './News.scss'

export const NewsPage = () => {
  const { id } = useParams()
  const [ news, setNews ] = useState({})
  const { loading, request } = useHttp()

  useEffect(() => {
    async function getReq() {
      const fetched = await request(`http://a0490648.xsph.ru/api/news/${id}`)
      setNews(fetched)
    }

    getReq()
  }, [ id, request ])

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <section>
          <h2 className="main-title"><span>{news.title}</span></h2>
          <div className="content">
            <div className="img news-img">
              {/* <img src={news.previewUrl} alt="" /> */}
              <img src="https://via.placeholder.com/170x600" alt="" />
            </div>
            <p>
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
  const path = `/news/${news._id}`

  return (
    <Link to={path}>
      <section className="news-item">
        <div className="img"><img src={'https://via.placeholder.com/170x170'} alt="" /></div>
        {/* <div className="img"><img src={news.previewUrl} alt="" /></div> */}
        <div className="flex-filler news-title">
          <h2 className="sub-title news-item-title">
            <span>{news.title}</span>
          </h2>
        </div>
        <span className="date">
          { Moment(news.date).format('DD.MM.YYYY') }
        </span>
      </section>
    </Link>
  )
}

export const AllNews = () => {
  const [ isReady, setReady ] = useState(false)
  const [ news, setNews ] = useState([])

  useEffect(() => {
    fetch('http://a0490648.xsph.ru/api/news')
      .then((res) => res.json())
      .then((resNews) => {
        setReady(true)
        setNews(resNews)
      })
      .catch((e) => console.error(e))
  }, [])

  if (isReady) {
    console.log(news)
    return (
      <div className="content-container">
        <h1 className="main-title"><span>Новости</span></h1>
        {
          news.map((x, i) => <NewsItem news={x} key={i} />)
        }
      </div>
    )
  } else {
    return (<Preloader />)
  }
}

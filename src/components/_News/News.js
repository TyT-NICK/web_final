import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import { Preloader } from '../preloader/preloader'

import './News.scss'

// ----
class News {
  constructor(id, title, previewUrl, content, date) {
    this.id = id
    this.title = title
    this.previewUrl = previewUrl
    this.content = content
    this.date = date
    this.dateString = `${this.date.getDate()}.${this.date.getMonth() + 1}.${this.date.getFullYear()}`
  }
}

const newsContentSample = (
  <section>
    <p>News Text From a Nearest Future</p>
    <p>... and another paragraph</p>
  </section>
)
const newsArray = [
  new News(0, 'title 1', 'https://via.placeholder.com/170x170', newsContentSample, new Date(Date.now())),
  new News(2, 'title 2', 'https://via.placeholder.com/170x170', newsContentSample, new Date(Date.now())),
  new News(3, 'title 3', 'https://via.placeholder.com/170x170', newsContentSample, new Date(Date.now())),
]
// ----

export const NewsPage = () => {
  const { id } = useParams()
  const [ isReady, setReady ] = useState(false)
  const [ news, setNews ] = useState({})

  useEffect(() => {
    fetch(`http://a0490648.xsph.ru/api/news/${id}`)
      .then((res) => res.json())
      .then((resNews) => {
        setReady(true)
        setNews(resNews)
      })
      .catch((e) => console.error(e))
  }, [])

  return (
    !isReady ? <Preloader /> :
      <div className="content-container">
        <h2><span>{news.title}</span></h2>

        <img src={news.previewUrl} />
        {news.content}

      </div>
  )
}

const NewsItem = (props) => {
  const news = props.news
  const path = `/news/${news._id}`

  return (
    <Link to={path}>
      <section className="news-item">
        <img src={news.previewUrl} />
        <h2 className="sub-title"><span>{news.title}</span></h2>
        <span className="date">
          {news.date}
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

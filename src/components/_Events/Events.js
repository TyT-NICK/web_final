import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'

import Moment from 'moment'
import Datetime from 'react-datetime'

import AuthContext from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Preloader } from '../preloader/preloader'

import './Events.scss'
import 'react-datetime/css/react-datetime.css'

export const EditEvent = () => {
  const [ input, setInput ] = useState({
    name: '',
    date: Moment.now(),
    previewUrl: '',
    content: '',
    place: '',
    link: '',
  })

  const { id } = useParams()
  const { loading, request } = useHttp()

  const path = '/api/event'

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
      request(`${path}/add`, 'POST', input)
  }

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const dateChangeHandler = (e) => {
    console.log(e)
    setInput({ ...input, date: e })
  }

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <form action="" className="edit-form" onSubmit={formSubmitHandler}>
          <div className="form-item">
            <label htmlFor="title">Название события</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Название события"
              value={input.name}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-item">
            <label htmlFor="caption">Дата</label>
            <Datetime
              name="date"
              id="date"
              value={input.date}
              onChange={dateChangeHandler} />
          </div>

          <div className="form-item">
            <label htmlFor="imgUrl">Ссылка на превью</label>
            <input
              type="text"
              name="previewUrl"
              id="previewUrl"
              placeholder="Ссылка на превью"
              value={input.previewUrl}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-item">
            <label htmlFor="content">Описание</label>
            <input
              type="text"
              name="content"
              id="content"
              placeholder="Описание события"
              value={input.content}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-item">
            <label htmlFor="place">Город</label>
            <input
              type="text"
              name="place"
              id="place"
              placeholder="Город"
              value={input.place}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-item">
            <label htmlFor="link">Ссылка на мероприятие</label>
            <input
              type="text"
              name="link"
              id="link"
              placeholder="Ссылка на мероприятие"
              value={input.link}
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

export const EventPage = () => {
  const { request, loading } = useHttp()
  const { id } = useParams()
  const [ event, setEvent ] = useState({ })

  useEffect(() => {
    const fetching = async () => {
      const fetched = await request(`/api/event/${id}`, 'GET', null)
      setEvent(fetched)
    }
    fetching()
  }, [ id, request ])

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <section>
          <h1 className="main-title"><span>{event.name}</span></h1>
          <div className="album-info">
            <div className="album-tracks">
              <figcaption><p>{event.content}</p></figcaption>
            </div>
            <div className="">
              <h2 className="sub-title"><span>Место</span></h2>
              <p> {event.place} </p>
              <h2 className="sub-title"><span>Время и дата</span></h2>
              <p> { Moment(event.date).format('DD.MM.YYYY') } </p>
            </div>
          </div>
        </section>

        <section className="album-info">
          <div className="album-tracks">
            <a href={event.link} target="_blank" rel="noopener noreferrer" className="button">Посетить</a>
          </div>
        </section>
      </div>
  )
}

const EventComponent = (props) => {
  const event = props.event
  const editPath = `/events/edit/${event._id}`
  const path = `/events/event/${event._id}`

  const auth = useContext(AuthContext)
  const { request } = useHttp()

  const deleteItemClickHandle = async (e) => {
    e.preventDefault()
    if (window.confirm(`Действительно удалить альбом ${event.name}?`)) {
      await request(`/api/event/${event._id}`, 'DELETE')
      window.location.reload()
    }
  }

  return (
    <Link to={path}>
      <figure className="event">
        <img className="event-bg-img" src={event.previewUrl} alt="123"></img>
        <figcaption>{event.name}</figcaption>
      </figure>
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


const EventMonth = (props) => {
  const month = props.monthName
  const events = props.events

  return (
    <section className="event-set">
      <h2 className="main-title"><span>{month}</span></h2>
      <div className="events-container">
        {events.map((event, i) => <EventComponent event={event} key={i} />)}
      </div>
    </section>
  )
}

const EventsPage = () => {
  const { loading, request } = useHttp()

  const [ events, setEvents ] = useState([])
  const auth = useContext(AuthContext)

  useEffect(() => {
    const fetching = async () => {
      const fetched = await request('/api/event/', 'GET', null)
      fetched.sort((a, b) => {
        if (a.date > b.date) {
          return -1
        } else if (a.date < b.date) {
          return 1
        }
        return 0
      })

      const monthes = [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]
      const preEvents = {}
      fetched.forEach((x) => {
        const date = new Date(x.date)
        const m = date.getMonth()
        const y = date.getFullYear()
        const my = `${monthes[m]} ${y}`

        if (!preEvents[my]) {
          preEvents[my] = []
        }

        preEvents[my].push(x)
      })
      setEvents(preEvents)
    }
    fetching()
  }, [ request ])

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        {
          auth.isAuthenticated &&
            <div className="admin-panel">
              <Link className="button" to="/events/edit/">добавить</Link>
            </div>
        }
        {
          Object.entries(events).map((month, i) => {
            return <EventMonth key={i} monthName={month[0]} events={month[1]} />
          })
        }
      </div>
  )
}

export default EventsPage

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { Preloader } from '../preloader/preloader'
import './Events.scss'


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
        <h1 className="main-title"><span>{event.name}</span></h1>
        <section className="album-info">
          <div className="album-tracks">
            <figcaption><p>{event.content}</p></figcaption>
          </div>
          <div className="album-right-bar">
            <h2 className="sub-title"><span>Место</span></h2>
            <p> {event.place} </p>
            <h2 className="sub-title"><span>Время и дата</span></h2>
            <p> {event.date} </p>
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
  const path = `/events/${event._id}`

  return (
    <Link to={path}>
      <figure className="event">
        <img className="event-bg-img" src={event.previewUrl} alt="123"></img>
        <figcaption>{event.name}</figcaption>
      </figure>
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

  useEffect(() => {
    const fetching = async () => {
      const fetched = await request('/api/event/', 'GET', null)
      fetched.sort((a, b) => {
        if (a.date > b.date) {
          return 1
        } else if (a.date < b.date) {
          return -1
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
          Object.entries(events).map((month, i) => {
            return <EventMonth key={i} monthName={month[0]} events={month[1]} />
          })
        }
      </div>
  )
}

export default EventsPage

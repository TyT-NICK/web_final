import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import './Events.scss'

export class Event {
  constructor(title, descr, place, datetime, price, bgImg) {
    this.title = title
    this.descr = descr
    this.place = place
    this.datetime = datetime
    this.price = price
    this.bgImg = bgImg
  }
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
  const { request } = useHttp()

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
      fetched.map((x) => {
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

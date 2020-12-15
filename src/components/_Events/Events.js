import React from 'react'
import { Link } from 'react-router-dom'
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
        <img className="event-bg-img" src={event.bgImg} alt="123"></img>
        <figcaption>{event.title}</figcaption>
      </figure>
    </Link>
  )
}

const events = {
  'Март': [
    new Event('123', 'asd', 'asd', 'asd', 'zxc', 'https://via.placeholder.com/350x270'),
    new Event('312', 'asd', 'asd', 'asd', 'zxc', 'https://via.placeholder.com/320x1500'),
    new Event('145456 nnlkmlkm ojjhknln knlkn', 'asd', 'asd', 'asd', 'zxc', 'https://via.placeholder.com/320x170'),
    new Event('145456', 'asd', 'asd', 'asd', 'zxc', 'https://via.placeholder.com/320x170'),
  ],
  'Февраль': [
    new Event('123', 'asd', 'asd', 'asd', 'zxc', 'https://via.placeholder.com/320x170'),
    new Event('123', 'asd', 'asd', 'asd', 'zxc', 'https://via.placeholder.com/1600x170'),
    new Event('123', 'asd', 'asd', 'asd', 'zxc', 'https://via.placeholder.com/320x170'),
  ],
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

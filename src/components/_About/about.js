import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import authContext from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Preloader } from '../preloader/preloader'

import './about.scss'

export const EditAboutGroup = () => {
  const [ input, setInput ] = useState({ description: '', imgUrl: '' })
  const { loading, request } = useHttp()

  const path = '/api/groupInfo'

  useEffect(()=> {
    const fetching = async () => {
      const fetched = await request(path, 'GET')
      setInput(fetched.info[0])
    }

    fetching()
  }, [ path, request ])

  const formSubmitHandler = (e) => {
    e.preventDefault()

    const body = {
      description: input.description,
      imgUrl: input.imgUrl,
    }

    request(path, 'PUT', body)
  }

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    console.log(input)
  }

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <form action="" className="edit-form" onSubmit={formSubmitHandler}>
          <div className="form-item">
            <label htmlFor="description">Описание</label>
            <textarea
              name="description"
              id="description"
              value={input.description}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="form-item">
            <label htmlFor="imgUrl">Ссылка на изображение</label>
            <input type="text"
              name="imgUrl"
              id="imgUrl"
              value={input.imgUrl}
              onChange={inputChangeHandler} />
          </div>

          <div className="form-item">
            <input type="submit"/>
          </div>
        </form>
      </div>
  )
}

const AboutGroup = () => {
  const [ info, setInfo ] = useState({ description: '', imgUrl: '' })
  const { loading, request } = useHttp()
  const auth = useContext(authContext)

  const path = '/api/groupInfo'

  useEffect(() => {
    const fetching = async () => {
      const fetched = await request(path, 'GET')
      console.log(fetched)
      setInfo(fetched.info[0])
    }

    fetching()
  }, [ path, request ])

  return (
    loading ? <Preloader /> :
      <section className="about-group">
        <h1 className="main-title"><span>О группе</span></h1>
        <figure>
          <div className="img"><img src={info.imgUrl} alt="" /></div>
          <figcaption><p>{info.description}</p></figcaption>
        </figure>
        {
          auth.isAuthenticated &&
        <div className="admin-panel">
          <Link to="/about/editgroup" className="button edit-button">Редактировать</Link>
        </div>
        }

      </section>
  )
}

const members = [
  {
    name: 'qwe ewq',
    descr: 'caksmkldmaskmdkam aksmdlkams dkmaklsmdk lamsdklmaks mkamsd',
    imgUrl: 'https://via.placeholder.com/320x170',
  },
  {
    name: 'qwe ewq',
    descr: 'caksmkldmaskmdkam aksmdlkams dkmaklsmdk lamsdklmaks mkamsd',
    imgUrl: 'https://via.placeholder.com/320x170',
  },
]

const AboutMembers = () => {
  return (
    <section className="about-members">
      <h1 className="main-title"><span>О нас</span></h1>
      {
        members.map((member, i) => <MemberItem member={member} key={i} />)
      }
    </section>
  )
}

const MemberItem = (props) => {
  const member = props.member
  return (
    <figure className="group-member">
      <img src={member.imgUrl} alt="" />
      <figcaption>
        <h2 className="sub-title">{member.name}</h2>
        <p>{member.descr}</p>
      </figcaption>
    </figure>
  )
}

const AboutPage = () => {
  return (
    <div className="content-container">
      <AboutGroup />
      <AboutMembers />
    </div>
  )
}

export default AboutPage

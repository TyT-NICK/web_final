import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

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

export const EditMember = () => {
  const [ input, setInput ] = useState({
    name: '',
    socialUrl: '',
    photoUrl: '',
    description: '',
  })
  const { loading, request } = useHttp()
  const { id } = useParams()

  useEffect(()=> {
    const fetching = async () => {
      const fetched = await request(`/api/member/${id}`, 'GET')
      setInput(fetched)
    }
    id && fetching()
  }, [ id, request ])

  const formSubmitHandler = (e) => {
    e.preventDefault()

    id ?
      request(`/api/member/${id}`, 'PUT', input) :
      request('/api/member/add', 'POST', input)
  }

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    loading ? <Preloader/> :
      <div className="content-container" onSubmit={formSubmitHandler}>
        <form className="edit-form">
          <div className="form-item">
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              name="name"
              id="name"
              value={input.name}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-item">
            <label htmlFor="socialUrl">Ссылка в соц. сети</label>
            <input
              type="text"
              name="socialUrl"
              id="socialUrl"
              value={input.socialUrl}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-item">
            <label htmlFor="photoUrl">Ссылка на фото участника</label>
            <input
              type="text"
              name="photoUrl"
              id="photoUrl"
              value={input.photoUrl}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-item">
            <label htmlFor="description">Описание участника</label>
            <textarea
              name="description"
              id="description"
              value={input.description}
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

const MemberItem = (props) => {
  const member = props.member

  const auth = useContext(AuthContext)
  const { request } = useHttp()

  const path = `/about/member/${member._id}`

  const deleteItemClickHandle = async (e) => {
    e.preventDefault()
    if (window.confirm(`Действительно удалить участника ${member.name}?`)) {
      await request(`/api/member/${member._id}`, 'DELETE')
      window.location.reload()
    }
  }

  return (
    <figure className="group-member">
      <img src={member.photoUrl} alt="" />
      <figcaption>
        <h2 className="sub-title">{member.name}</h2>
        <p>{member.description}</p>
        {
          auth.isAuthenticated && <div className="admin-panel">
            <Link to={path} className="button">изменить</Link>
            <Link className="button" onClick={deleteItemClickHandle}>удалить</Link>
          </div>
        }
      </figcaption>
    </figure>
  )
}

const AboutPage = () => {
  const [ group, setGroup ] = useState({ info: {}, members: [] })
  const { loading, request } = useHttp()
  const auth = useContext(authContext)

  const path = '/api/groupInfo'

  useEffect(() => {
    const fetching = async () => {
      const fetched = await request(path, 'GET')
      setGroup({ info: fetched.info[0], members: fetched.members })
    }

    fetching()
  }, [ path, request ])

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <section className="about-group">
          <h1 className="main-title"><span>О группе</span></h1>
          <figure>
            <div className="img"><img src={group.info.imgUrl} alt="" /></div>
            <figcaption><p>{group.info.description}</p></figcaption>
          </figure>
          {
            auth.isAuthenticated &&
              <div className="admin-panel">
                <Link to="/about/editgroup" className="button edit-button">Редактировать</Link>
              </div>
          }

        </section>
        <section className="about-members">
          <h1 className="main-title"><span>О нас</span></h1>
          {
            group.members.map((member, i) => <MemberItem member={member} key={i} />)
          }
          {
            auth.isAuthenticated &&
              <div className="admin-panel">
                <Link to="/about/member/" className="button edit-button">Добавить</Link>
              </div>
          }
        </section>
      </div>
  )
}

export default AboutPage

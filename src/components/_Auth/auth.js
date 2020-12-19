import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { useHttp } from '../../hooks/http.hook'
import AuthContext from '../../context/AuthContext'
import { Preloader } from '../preloader/preloader'
import { Link } from 'react-router-dom'

export const EditAdminPage = () => {
  const [ input, setInput ] = useState({
    email: '',
    name: '',
    pwd: '',
    pwdRepeat: '',
  })
  const { loading, request } = useHttp()
  const { id } = useParams()

  useEffect(()=> {
    const fetching = async () => {
      const fetched = await request(`/api/admin/${id}`, 'GET')

      setInput({ ...fetched, pwd: '', pwdRepeat: '' })
    }
    id && fetching()
  }, [ id, request ])

  const formSubmitHandler = (e) => {
    e.preventDefault()

    if (input.pwd !== input.pwdRepeat) {
      return alert('Введеные пароли не совпадают')
    }

    const noRepeat = ({ pwdRepeat, ...rest }) => rest
    id ?
      request(`/api/admin/${id}`, 'PUT', noRepeat(input)) :
      request('/api/admin/add', 'POST', noRepeat(input))
  }

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    loading ? <Preloader/> :
      <div className="content-container" onSubmit={formSubmitHandler}>
        <form className="edit-form">
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={input.email}
              onChange={inputChangeHandler}
            />
          </div>
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
            <label htmlFor="photoUrl">Пароль</label>
            <input
              type="password"
              name="pwd"
              id="pwd"
              value={input.pwd}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-item">
            <label htmlFor="pwdRepeat">Повторите пароль</label>
            <input
              type="password"
              name="pwdRepeat"
              id="pwdRepeat"
              value={input.pwdRepeat}
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

export const AdminsPage = () => {
  const [ admins, setAdmins ] = useState([])
  const { loading, request } = useHttp()

  const path = '/api/admin/'

  useEffect(()=> {
    const fetching = async () => {
      const fetched = await request(path, 'GET')
      setAdmins(fetched)
    }

    fetching()
  }, [ path, request ])

  const deleteItemClickHandle = async (e, admin) => {
    e.preventDefault()
    if (window.confirm(`Действительно удалить участника ${admin.name} (${admin.email})?`)) {
      await request(`/api/admin/${admin._id}`, 'DELETE')
      window.location.reload()
    }
  }

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        {
          admins.map((x, i) => {
            return (
              <section key={i}>
                <p>{i + 1}. {x.name} ({x.email})</p>
                {
                  <div className="admin-panel">
                    <Link to={`admins/edit/${x._id}`} className="button">изменить</Link>
                    <Link className="button" onClick={(e) => deleteItemClickHandle(e, x)}>удалить</Link>
                  </div>
                }
              </section>)
          })
        }
        <div className="admin-panel">
          <Link to="/admins/edit/" className="button edit-button">Добавить</Link>
        </div>
      </div>
  )
}

const AuthPage = () => {
  const [ input, setInput ] = useState({ email: '', pwd: '' })
  const { loading, request } = useHttp()
  const auth = useContext(AuthContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    let data = null
    try {
      data = await request('/api/auth/login', 'POST', input)
      console.log(data)
      auth.login(data.token, data.adminId)
    } catch (e) {
      console.error(data)
    }
  }

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <form onSubmit={submitHandler} >
          <input name="email"
            type="email"
            value={input.email}
            onChange={inputChangeHandler}
            placeholder="email"/>
          <input name="pwd"
            type="password"
            value={input.pwd}
            onChange={inputChangeHandler}
            placeholder="пароль"/>
          <input type="submit"/>
        </form>
      </div>
  )
}

export default AuthPage

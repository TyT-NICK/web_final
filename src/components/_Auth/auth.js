import React, { useContext, useState } from 'react'

import { useHttp } from '../../hooks/http.hook'
import AuthContext from '../../context/AuthContext'

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
      auth.login(data.token, data.userId)
    } catch (e) {
      console.error(data)
    }
  }

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
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

import React, { useState, useEffect, useContext } from 'react'

import { useHttp } from '../../hooks/http.hook'
import { Preloader } from '../preloader/preloader'
import AuthContext from '../../context/AuthContext'
import { Link, useParams } from 'react-router-dom'

const MerchItem = (props) => {
  const item = props.item

  return (
    // <Link to={item.link}>
    //   <div className="album-item">
    //     <figure>
    //       <img src={item.groupImgUrl} alt="" />
    //       <figcaption>{item.name}</figcaption>
    //     </figure>
    //   </div>
    // </Link>
    <a href={item.link} target="_blank" rel="noopener noreferrer">
      <div className="album-item">
        <figure>
          <div className="img"><img src={item.groupImgUrl} alt="" /></div>
          <figcaption>{item.name}</figcaption>
        </figure>
      </div>
    </a>
  )
}

export const EditMerchCategory = () => {
  const [ input, setInput ] = useState({ name: '', link: '', groupImgUrl: '' })
  const { loading, request } = useHttp()
  const { id } = useParams()

  useEffect(()=> {
    const fetching = async () => {
      const fetched = await request(`/api/merchCategory/${id}`, 'GET')
      setInput(fetched)
    }
    id && fetching()
  }, [ id, request ])

  const formSubmitHandler = (e) => {
    e.preventDefault()

    id ?
      request(`/api/merchCategory/${id}`, 'PUT', input) :
      request('/api/merchCategory/add', 'POST', input)
  }

  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    loading ? <Preloader/> :
      <div className="content-container" onSubmit={formSubmitHandler}>
        <form className="edit-form">
          <div className="form-item">
            <label htmlFor="name">Название категории</label>
            <input
              type="text"
              name="name"
              id="name"
              value={input.name}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-item">
            <label htmlFor="link">Ссылка на категорию</label>
            <input
              type="text"
              name="link"
              id="link"
              value={input.link}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-item">
            <label htmlFor="groupImgUrl">Ссылка на изображение</label>
            <input
              type="text"
              name="groupImgUrl"
              id="groupImgUrl"
              value={input.groupImgUrl}
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

export const Shop = () => {
  const [ merch, setMerch ] = useState([])
  const { loading, request } = useHttp()
  const auth = useContext(AuthContext)

  useEffect(() => {
    async function getReq() {
      const fetched = await request('/api/merchCategory/', 'GET')
      // const fetched = [ placeholder, placeholder ]
      setMerch(fetched)
    }

    getReq()
  }, [ request ])

  return (
    loading ? <Preloader /> :
      <div className="content-container">
        <section className="albums">
          <h2 className="main-title"><span>Магазин</span></h2>
          <div className="albums-container">
            {
              merch.map((x, i) => <MerchItem item={x} key={i}/>)
            }
          </div>
          {
            auth.isAuthenticated && <div className="admin-panel">
              <Link className="button" to="/shop/item">добавить</Link>
            </div>
          }
        </section>
      </div>
  )
}

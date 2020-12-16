import React, { useState, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { Preloader } from '../preloader/preloader'

const MerchItem = (props) => {
  const item = props.item

  return (
    <a href={item.link} target="_blank" rel="noreferrer">
      <div className="album-item">
        <figure>
          <img src={item.groupImgUrl} alt="" />
          <figcaption>{item.name}</figcaption>
        </figure>
      </div>
    </a>
  )
}

const placeholder = {
  name: 'test',
  link: 'https:/vk.com',
  groupImgUrl: 'https://sun9-71.userapi.com/impg/' +
  'QbprFrYl21w5VedDW7g33VtBLWWQLWwtNmqH6A/eIlq6puDiAg.'+
  'jpg?size=1280x1184&quality=96&sign=0f0444a92dc2021b7425f58ae25567f1&type=album',
}

export const Shop = () => {
  const [ merch, setMerch ] = useState([])
  const { loading, request } = useHttp()

  useEffect(() => {
    async function getReq() {
      // const fetched = await request('/api/merchCategory/', 'GET')
      const fetched = [ placeholder, placeholder ]
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
        </section>
      </div>
  )
}

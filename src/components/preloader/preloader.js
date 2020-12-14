import React from 'react'

import './preloader.scss'

export const Preloader = () => {
  return (
    <section className='content-container preloader-parent'>
      <div className="lds-dual-ring"></div>
    </section>
  )
}

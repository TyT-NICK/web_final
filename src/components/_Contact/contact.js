import React from 'react'
import './contact.scss'

export const ContactPage = () => {
  return (
    <div className="content-container">
      <section className='contacts'>
        <h1 className="main-title"><span>контакты</span></h1>
        {

        }
        <p>По любым вопросам по поводу концертов писать сюда:</p>
        <h2 className="sub-title">
          <a href="mailto:emoloxi@mail.ru">emoloxi@mail.ru</a>
        </h2>
        <p>
          Нас можно пригласить на концерт в любой, даже самый отдаленный город.
          У нас много свободного времени.
          Мы готовы отыграть фестивали, концерты и прочее за еду и алкоголь.
        </p>
        <p>
          Чтобы нас пригласить достаточно быть организатором, арт-директором,
          или просто хорошим и ответственным человеком,
          способным обеспечить хорошие условия для проведения концерта.
        </p>
      </section>
    </div>
  )
}

import React from 'react'

import './about.scss'

const AboutGroup = () => {
  const descr =
    'ascsmlskdmkamsklcm kasmdka msldkasmlk maslkmdlkam skalksdlkasmdkl mlkasmdka s' +
    'ascsmlskdmkamsklcm kasmdka msldkasmlk maslkmdlkam skalksdlkasmdkl mlkasmdka s' +
    'ascsmlskdmkamsklcm kasmdka msldkasmlk maslkmdlkam skalksdlkasmdkl mlkasmdka s' +
    'ascsmlskdmkamsklcm kasmdka msldkasmlk maslkmdlkam skalksdlkasmdkl mlkasmdka s' +
    'ascsmlskdmkamsklcm kasmdka msldkasmlk maslkmdlkam skalksdlkasmdkl mlkasmdka s' +
    'ascsmlskdmkamsklcm kasmdka msldkasmlk maslkmdlkam skalksdlkasmdkl mlkasmdka s' +
    'ascsmlskdmkamsklcm kasmdka msldkasmlk maslkmdlkam skalksdlkasmdkl mlkasmdka s'

  return (
    <section className="about-group">
      <h1 className="main-title"><span>О группе</span></h1>

      <figure className="">
        <div className="img"><img src="https://via.placeholder.com/320x480" alt="" /></div>
        <figcaption><p>{descr}</p></figcaption>
      </figure>
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

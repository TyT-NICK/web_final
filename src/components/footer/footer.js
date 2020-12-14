import React from 'react';

import './footer.scss';
import logoYT from "../../icons/youtube.svg"
import logoInst from "../../icons/instagram.svg"
import logoVK from "../../icons/vk.svg"

const SocialItem = (props) => {
  const icoUrl = props.socialLink.icoUrl;
  const link = props.socialLink.link;

  return (
    <li>
      <a href={link}>
        <object className="socialIco" type="image/svg+xml" data={icoUrl}>
        </object>
      </a>
    </li>
  )
}

const Footer = () => {
  const socialLinks = [
    { icoUrl: logoYT, link: "https://youtube.com" },
    { icoUrl: logoInst, link: "https://instagram.com", class: "ico-smaller" },
    { icoUrl: logoVK, link: "https://vk.com" },
  ]

  return (
    <footer>
      <div className="content-container">
        <ul className="list-social">
          {
            socialLinks.map((link, i) => <SocialItem socialLink={link} key={i} />)
          }
        </ul>

        {/* <ul className="list-agreements">
          <a>qwe</a>
          <a>qwe</a>
          <a>qwe</a>
          <a>qwe</a>
          <a>qwe</a>
        </ul> */}

        <address>© Made by: Chertovskih Kolenchenko Kuroptev team 2020</address>
      </div>
    </footer>
  )
}

export default Footer;
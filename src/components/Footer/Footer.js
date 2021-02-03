import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import fb from '../../images/icon_fb.svg';
import insta from '../../images/icon_insta.svg';
import linkedin from '../../images/icon_linkedin.svg';
import twitter from '../../images/icon_twitter.svg';
import youtube from '../../images/icon_youtube.svg';
import footerLogo from '../../images/SobarDaktar Logo MAIN-01.jpg';
const Footer = () => {
  return (
    <footer style={{ background: '#2C364F', color: 'white' }}>
      <div className='container pt-5'>
        <div className='row pt-5'>
          <div className='footerItem d-flex flex-column align-items-center justify-content-center col-md-12'>
            <div className='socialIcon mb-3'>
              <a href='/' target='_blank'>
                <img src={fb} alt='#' />
              </a>
              <a href='/' target='_blank'>
                <img src={insta} alt='#' />
              </a>
              <a href='/' target='_blank'>
                <img src={linkedin} alt='#' />
              </a>
              <a href='/' target='_blank'>
                <img src={twitter} alt='#' />
              </a>
              <a href='/' target='_blank'>
                <img src={youtube} alt='#' />
              </a>
            </div>
            <div className='footerLink my-2 text-center'>
              <Link to='/'> NEWS </Link>|<Link to='/'> ABOUT US </Link>|
              <Link to='/'> CONTACT US </Link>|
              <Link to='/'> PRIVACY POLICY </Link>|
              <Link to='/'> TERMS & CONDITIONS</Link>
            </div>
            <p>{new Date().getFullYear()} &copy; Sobar Daktar</p>
            <img src={footerLogo} alt='' className='img-fluid footerLogo' />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

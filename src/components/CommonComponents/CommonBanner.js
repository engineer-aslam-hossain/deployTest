import React from 'react';
import './CommonBanner.css';


const CommonBanner = ({ img, banner, btnTxt }) => {
  return (
    <div className='container'>
      <div
        className={`row justify-content-between ${
          banner === 'doctor' && 'flex-row-reverse'
        }`}>
        <div
          className={`col-md-5 ${
            banner === 'headerMain' ? 'alignItemsEnd' : 'alignItemsStart'
          } d-flex flex-column justify-content-center my-3`}>
          <h1
            className={`${banner !== 'headerMain' && 'textLeft'} bannerTitle`}>
            Telemedicine Simplified!
          </h1>
          <p className={`${banner !== 'headerMain' && 'textLeft'} bannerText`}>
            Key aspects of Product. Lorem ipsum dolor sit amet, consectetur
            adipiscing elitess.
          </p>
          <button className='findDocBtn'>{btnTxt}</button>
        </div>
        <div className='col-md-6 imgDiv d-flex'>
          <img src={img} alt='#' className='img-fluid bannerImg' />
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;

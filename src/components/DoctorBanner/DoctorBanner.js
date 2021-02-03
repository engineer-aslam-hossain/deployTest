import React from 'react';
import bannerImg from '../../images/doctor.svg';
import CommonBanner from '../CommonComponents/CommonBanner';
const HeaderMain = () => {
  return (
    <section className='headerMain'>
      <CommonBanner img={bannerImg} banner='doctor' btnTxt='Join as a Doctor' />
    </section>
  );
};

export default HeaderMain;

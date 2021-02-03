import React from 'react';

import bannerImg from '../../images/consult.svg';
import CommonBanner from '../CommonComponents/CommonBanner';
const HeaderMain = () => {
  return (
    <section className='headerMain'>
      <CommonBanner
        img={bannerImg}
        banner='headerMain'
        btnTxt='Find a Doctor'
      />
    </section>
  );
};

export default HeaderMain;

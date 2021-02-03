import React from 'react';
import CommonBanner from '../CommonComponents/CommonBanner';
import online from '../../images/online.svg';
const WorkingProcess = () => {
  return (
    <section className='workingProcess'>
      <CommonBanner
        img={online}
        banner='headerMain'
        btnTxt='Learn How Sobar Daktar Works'
      />
    </section>
  );
};

export default WorkingProcess;

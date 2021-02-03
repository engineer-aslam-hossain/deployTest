import React from 'react';
import Header from '../Header/Header';
import HeaderMain from '../HeaderMain/HeaderMain';
import HomepageAdd from '../HomepageAdd/HomepageAdd';
import DoctorBanner from '../DoctorBanner/DoctorBanner';
import WorkingProcess from '../WorkingProcess/WorkingProcess';
import Footer from '../Footer/Footer';
import CompanyText from '../CompanyText/CompanyText';
const Home = () => {
  return (
    <div className='home'>
      <Header />
      <HeaderMain />
      <HomepageAdd />
      <DoctorBanner />
      <WorkingProcess />
      <CompanyText />
      <Footer />
    </div>
  );
};

export default Home;

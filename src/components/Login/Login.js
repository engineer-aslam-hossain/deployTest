import React from 'react';
import './Login.css';
import family from '../../images/family.jpg';
import LoginForm from '../LoginForm/LoginForm';
import Header from '../Header/Header';
import HomepageAdd from '../HomepageAdd/HomepageAdd';
import FindAsGuest from '../FindAsGuest/FindAsGuest';
import Footer from '../Footer/Footer';

function Login() {
  return (
    <>
      <Header />
      <section className='login'>
        <div className='container'>
          <div className='row position-relative'>
            <div className='col-md-8 loginPageLeft d-flex flex-column justify-content-center align-items-center'>
              <div className='LoginPageLeftSection position-relative'>
                <h1 className='loginPageTitle'>
                  Important Text or Catch Phrase
                </h1>
                <p className='loginPageText'>
                  Some Subtitle Text.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elitess
                </p>
              </div>
            </div>
            <div className='col-md-4'>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
      <HomepageAdd />
      <FindAsGuest />
      <Footer />
    </>
  );
}

export default Login;

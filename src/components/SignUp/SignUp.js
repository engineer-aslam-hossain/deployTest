import React from 'react';
import FindAsGuest from '../FindAsGuest/FindAsGuest';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import HomepageAdd from '../HomepageAdd/HomepageAdd';
import SignUpAs from '../SignUpForm/SignUpAs';
import SignUpForm from '../SignUpForm/SignUpForm';

function SignUp() {
  return (
    <>
      <Header />
      <section className='login'>
        <div className='container'>
          <div className='row position-relative p-3'>
            <div className='col-md-6 loginPageLeft d-flex flex-column justify-content-center align-items-center'>
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
            <div className='col-md-6'>
              <SignUpAs />
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

export default SignUp;

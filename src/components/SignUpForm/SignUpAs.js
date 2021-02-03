import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import femaleDoc from '../../images/femaledoc.svg';
import maleDoc from '../../images/maledoc.svg';
import './SignUpAs.css';
function SignUpAs() {
  return (
    <Card
      style={{
        borderRadius: '16px',
        maxWidth: '30rem',
        padding: '2rem',
        margin: '0 auto',
        backgroundColor: '#FFF5F5',
      }}
    >
      <h3 className='text-center font-weight-bold mb-5'>Sign Up as? </h3>
      <div className='signUpPerson d-flex justify-content-between'>
        <div className='doctorPerson'>
          <img src={femaleDoc} alt='#' className='img-fluid' />
          <h3 className='personName'>
            Doctor <br /> /Physician
          </h3>
        </div>
        <div className='doctorPerson'>
          <img src={maleDoc} alt='#' className='img-fluid' />
          <h3 className='personName'>
            Patient <br />
            /Others
          </h3>
        </div>
      </div>
      <div className='signUpDetailsText p-3'>
        <p>
          If you Select “Doctor”, you will need to be verified by the system.
          However if you’re not a Doctor, Select “Patient”.{' '}
          <Link to='#'> Learn More</Link>
        </p>
      </div>

      <div className='mt-5 loginFormFooter'>
        <p className='text-center m-0 text-decoration-none'>
          Already have an account ?
        </p>
        <p className='text-center'>
          <Link to='/'>Login Instead</Link>
        </p>
      </div>
    </Card>
  );
}

export default SignUpAs;

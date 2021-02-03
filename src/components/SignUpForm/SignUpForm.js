import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fb from '../../images/icon_fb.svg';
import linkedin from '../../images/icon_linkedin.svg';
import google from '../../images/google.png';
function SignUpForm() {
  return (
    <Card
      style={{
        borderRadius: '16px',
        padding: '2rem 2rem',
        backgroundColor: '#FFF5F5',
      }}
    >
      <Form>
        <h3 className='mb-5 text-center font-weight-bold'>Sign Up as?</h3>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email/Phone</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email address or phone'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>

        <div className='d-flex flex-column align-items-center mt-5'>
          <button type='submit' className='sign-up-btn'>
            Sign Up
          </button>
          <Link to='/' className='forgetPass'>
            forget password ?
          </Link>
          <p className='text-secondary'>Or Sign Up with...</p>
        </div>
        <div className='d-flex justify-content-around'>
          <button className='facebook img-fluid'>
            <img src={fb} alt='' />
          </button>
          <button className='linkedin img-fluid'>
            <img src={linkedin} alt='' />
          </button>
          <button className='google img-fluid'>
            <img src={google} alt='' />
          </button>
        </div>
      </Form>
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

export default SignUpForm;

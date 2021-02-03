import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import './HomepageAdd.css';
import app from '../../images/app.svg';
import playstore from '../../images/icon_playstore.png';
import appstore from '../../images/icon_appstore.png';

const HomepageAdd = () => {
  return (
    <section className='homepage-add'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 imgDiv'>
            <img src={app} alt='' className='img-fluid' />
          </div>
          <div className='col-md-8 d-flex flex-column justify-content-center align-items-center'>
            <h3 className='addPageTitle'>
              Download The Sobar Daktar App Today!
            </h3>
            <div className='store'>
              <a
                href='#'
                target='_blank'
                className='d-flex justify-content-end  flexImg'>
                <img src={appstore} alt='#' className='img-fluid' />
              </a>
              <a href='#' target='_blank'>
                <img src={playstore} alt='#' className='img-fluid' />
              </a>
            </div>
            <p className='my-3 font-weight-bold text-center'>
              Send a Download Link to your phone?
            </p>
            <Form>
              <InputGroup className='searchInputGroup'>
                <FormControl
                  placeholder='Send Phone Number'
                  aria-label='Search input'
                  aria-describedby='basic-addon2'
                  className='searchInput'
                />
                <InputGroup.Append>
                  <InputGroup.Text id='basic-addon2'>
                    <FontAwesomeIcon icon={faTelegramPlane} />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageAdd;

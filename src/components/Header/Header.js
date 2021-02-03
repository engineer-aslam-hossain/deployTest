import React from 'react';
import { Form, FormControl, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from '../../images/SobarDaktar Logo_Desktop.png';
import logo2 from '../../images/SobarDaktar Logo Mobile.png';

const Header = () => {
  console.log(window.innerWidth);
  return (
    <header>
      <div className='container p-0'>
        <Navbar className='navbar' expand='lg'>
          <Link to='/' className='logo '>
            {window.innerWidth >= 768 ? (
              <img src={logo} alt='#' className='logoImg mr-5' />
            ) : (
              <img src={logo2} alt='#' className='logoImg2' />
            )}
          </Link>
          <Form inline className='mx-auto'>
            <InputGroup className='searchInputGroup'>
              <FormControl
                placeholder='Search....'
                aria-label='Search input'
                aria-describedby='basic-addon2'
                className='searchInput'
              />
              <InputGroup.Append>
                <InputGroup.Text id='basic-addon2'>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='d-flex justify-content-end align-items-center '>
              <Form.Group
                controlId='exampleForm.ControlSelect1'
                className='mb-0'
              >
                <Form.Control as='select' className='selectLang'>
                  <option>বাংলা</option>
                  <option>English</option>
                </Form.Control>
              </Form.Group>

              <Link to='/doctor' className='text-decoration-none'>
                Find Doctor
              </Link>
              <Link to='/login' className='text-decoration-none '>
                Login
              </Link>
              <Link
                to='/sign-up'
                className='text-decoration-none LoginBtn mr-0'
              >
                Sign Up
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;

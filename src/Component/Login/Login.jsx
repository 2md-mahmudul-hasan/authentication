import React, { useRef, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './login.css'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef()
  const auth = getAuth(app)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const handleLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    //validation
    if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      setError('password must be 6 letter one upper case and lowercase and an especial caracter')
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(user => {
        console.log(user.user)
        if (user) {
          setSuccess('Log in successful')
        } else {
          setSuccess('')
        }

        e.target.reset()

      })
      .catch(error => {
        setError(error.message)
      })
  }
  // reset password
  const handleResetPassword = () => {
    const email = emailRef.current.value;
    console.log(email)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('send email, reset your password')
      })
      .catch(error => {
        setError(error.message)
      })

    console.log('rest')
  }
  return (
    <Container className='login-container'>
      <div className='text-danger'> {error}</div>
      <div className='text-success'>  {success}</div>

      <h2> Log in here..........</h2>
      <Row className="justify-content-md-center">
        <Col xs={12} md={12}>
          <h1>Login</h1>
          <Form onSubmit={handleLogin} className='login-form'>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control ref={emailRef} type="email" name='email' required placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' required type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Link to="/regiester">New user? go to regiester</Link>
          <hr></hr>
          <br></br>
          <div><p>forget password please <button onClick={handleResetPassword} className='btn btn-link'>reset password </button></p></div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

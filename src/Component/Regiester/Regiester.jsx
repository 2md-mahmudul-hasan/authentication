import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
const Regiester = () => {
  const [errormsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState('')

  const auth = getAuth(app)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;


    //validation 
    if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      setError('password must be 6 letter one upper case and lowercase and an especial caracter')
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(user => {
        console.log(user.user)
        setSuccess('user regiestered successful')
        setErrorMsg('')
        e.target.reset()

        //update profile
        updateProfile(user.user, { displayName: name }).then(() => {
          alert('profile update')
        }).catch(error => {
          setErrorMsg(error.message)
        })

        //email varification
        sendEmailVerification(user.user)
          .then(() => {
            alert('varificaton your email')
          })
      })
      .catch(error => {
        setErrorMsg(error.message)
      })
  }

  return (
    <div>
      <h2> New user? register here .........</h2>
      <div className='text-secondary'>{errormsg}</div>
      <div className='text-success'>{success}</div>
      <hr></hr>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required name="email" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your name</Form.Label>
          <Form.Control required name="name" type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required name="password" type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Link to="/login">Already regiester? go ot log in</Link>
    </div>
  );
};

export default Regiester;
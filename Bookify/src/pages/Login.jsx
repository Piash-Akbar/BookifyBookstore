import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const firebase = useFirebase()
    
    const [email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log("Signing In...")
        const result =  await firebase.signinWithEmailAndPass(email, password)
        console.log('successful!', result)        
    }

    useEffect(()=>{
      if (firebase.isLoggedIn) {
        navigate('/')
        
      }
    },[firebase, navigate])
    

  return (
    <div className='container mt-5'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e)=> setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
    <h1 className="mt-5 mb-5">OR</h1>
    <Button onClick={firebase.signinWithGoogle} variant='danger'>SignIn with Google</Button>
    </div>
  )
}

export default Login
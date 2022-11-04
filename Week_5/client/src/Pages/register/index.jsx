import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Store/Context/AuthContext'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [regiserFrom, setRegisterForm] = useState({
    email: '',
    password: ''
  })
  const submitForm = async (e) => {
    e.preventDefault()
    const rep = await register(regiserFrom)
    if (!rep.success) {
      return alert("Failfully register")
    }
    alert("Successfully register")
    navigate('/login')
  }
  const onChangeInp = (e) => {
    setRegisterForm({
      ...regiserFrom,
      [e.target.name]: e.target.value
    })
  }
  return (
    <>
      <h1 className='text-center mt-5'>Register</h1>
      <Form className='w-25 mx-auto' onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' onChange={onChangeInp} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' onChange={onChangeInp} required />
        </Form.Group>
        <Button className="mb-3" variant="primary" type="submit">
          Register
        </Button>
        <div>
          <a href="/login">Already have an account</a>
        </div>
      </Form>
    </>
  )
}

export default Register
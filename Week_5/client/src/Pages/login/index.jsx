import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Store/Context/AuthContext'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { login, authState,checkLogin } = useContext(AuthContext)
    const [loginFrom, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const submitForm = async (e) => {
        e.preventDefault()
        const rep = await login(loginFrom)
        if (!rep.success) {
            return alert("Failfully login")
        }
        alert("Successfully login")
        checkLogin()
    }
    const onChangeInp = (e) => {
        setLoginForm({
            ...loginFrom,
            [e.target.name]: e.target.value
        })
    }
    const navigate = useNavigate()
    useEffect(() => {
        checkLogin()
    }, [])
    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate('/login')
        }
        if (authState.isAuthenticated) {
            navigate('/')
        }
    }, [authState.isAuthenticated])
    return (
        <>
            <h1 className='text-center mt-5'>Login</h1>
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
                    Login
                </Button>
                <div>
                    <a href="/register">Register an account</a>
                </div>
            </Form>
        </>
    )
}

export default Login
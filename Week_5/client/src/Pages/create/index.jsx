import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { TodoContext } from '../../Store/Context/TodoContext'

const Create = () => {
    const { createTodo } = useContext(TodoContext)
    const navigate = useNavigate()
    const [createFrom, setCreateForm] = useState({
        title: '',
        desc: ''
    })

    const onChangeInp = (e) => {
        setCreateForm({
            ...createFrom,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        const rep = await createTodo(createFrom)
        if (!rep.success) {
            return alert("Failfully create")
        }
        navigate('/')
    }
    return (
        <div className='create  mt-5'>
            <Container>
                <Form className='mx-auto'  onSubmit={submitForm}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" name='title' onChange={onChangeInp} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter description" name='desc' onChange={onChangeInp} required />
                    </Form.Group>
                    <Button className="mb-3" variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Create
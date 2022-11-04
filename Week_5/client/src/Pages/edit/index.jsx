import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import { TodoContext } from '../../Store/Context/TodoContext'

const Edit = () => {
    const { id } = useParams()
    const { getTodo,updateTodo,todoState:{todo} } = useContext(TodoContext)
    const navigate = useNavigate()
    const [updateFrom, setUpdateForm] = useState(todo)
    console.log(updateFrom)
    const onChangeInp = (e) => {
        setUpdateForm({
            ...updateFrom,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        const rep = await updateTodo(updateFrom,id)
        if (!rep.success) {
            return alert("Failfully create")
        }
        navigate('/')
    }
    return (
        <div className='edit mt-5'>
            <Container>
                <Form className='mx-auto' onSubmit={submitForm}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title"name='title' onChange={onChangeInp} required  value={updateFrom.title}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter description" name='desc' onChange={onChangeInp} required value={updateFrom.desc}/>
                    </Form.Group>
                    <Button className="mb-3" variant="primary" type="submit">
                        Edit
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Edit
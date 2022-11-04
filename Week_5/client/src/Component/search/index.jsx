import React, { useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { TodoContext } from '../../Store/Context/TodoContext'

const Search = () => {
    const { searchTodo } = useContext(TodoContext)
    const [searchForm,setSearchForm]=useState({
        is_done:'0',
        title:''
    })
    const onChangeInp = (e) => {
        setSearchForm({
            ...searchForm,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        searchTodo(searchForm)
    }
    return (
        <div>
            <Form className='d-flex align-items-center' onSubmit={submitForm}>
                <Form.Group className='w-10'>
                    <Form.Select size="lg" name='is_done' onChange={onChangeInp}>
                        <option value="0">Todo</option>
                        <option value="1">Done</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className='w-50'>
                    <InputGroup className="mb-3 mt-3">
                        <Form.Control
                            placeholder="Search todo"
                            aria-label="Search todo"
                            aria-describedby="basic-addon2"
                            size="lg"
                            onChange={onChangeInp}
                            name='title'
                        />
                        <Button variant="outline-secondary" id="button-addon2"type="submit">
                            Search
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Search
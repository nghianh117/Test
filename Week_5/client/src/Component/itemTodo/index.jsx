import React, { useContext, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../../Store/Context/TodoContext'

const ItemTodo = ({ data }) => {
  const navigate = useNavigate()
  const { deleteTodo, updateStatus,getTodo } = useContext(TodoContext)
  const [checked, setChecked] = useState(data.is_done)
  const checkbox = async () => {
    const rep = await updateStatus(data.id, !checked)
    if (rep.success) {
      setChecked(rep.data.is_done)
    }
  }
  const handleUpdate=async()=>{
    const rep =await getTodo(data.id)
    if(rep.success){
      navigate(`/edit/${data.id}`)
    }
  }
  return (
    <>
      <div className='d-flex'>
        <div>
          <Form.Check checked={checked} className='display-6 me-md-2' onChange={checkbox} />
        </div>
        <Accordion.Item eventKey={data.id} className='flex-grow-1 me-md-2'>
          <Accordion.Header >{data.title}</Accordion.Header>
          <Accordion.Body>
            {data.desc}
          </Accordion.Body>
        </Accordion.Item>
        <div>
          <Button variant="primary" className='me-md-2' size="lg" onClick={handleUpdate}>Edit</Button>
          <Button variant="danger" size="lg" onClick={() => deleteTodo(data.id)}>Delete</Button>
        </div>
      </div>
    </ >
  )
}

export default ItemTodo
import React, { useContext, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import ItemTodo from '../../Component/itemTodo';
import Search from '../../Component/search';
import { TodoContext } from '../../Store/Context/TodoContext'
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

const Home = () => {
  const { listTodos, todoState } = useContext(TodoContext)
  useEffect(() => {
    listTodos()
  }, [])
  return (
    <div>
      <Container>
        <Search></Search>
        <Card body>
          <Accordion flush>
            {
              todoState.todos.length === 0 ? (
                <>
                  <div>No Data</div>
                  <Link to='/create'>Create Todo</Link>
                </>
              ) : (
                todoState.todos.map((item, index) => {
                  return (
                    <ItemTodo key={index} data={item}></ItemTodo>
                  )
                })
              )
            }
          </Accordion>
        </Card>
      </Container>
    </div>
  )
}

export default Home
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AuthContext } from '../../Store/Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { authState, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  return (
    <div>
      <Navbar bg="primary" variant="dark" className='pt-3 pb-4'>
        <Container>
          <Navbar.Brand onClick={() => navigate('/')} >
            <h2 className='cursor-pointer'>Todos</h2>
          </Navbar.Brand>
          <DropdownButton id="dropdown-basic-button" size='lg' title={authState.user ? authState.user.email : "Email"}>
            <Dropdown.Item onClick={() => navigate('/create')} >Create todo</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => (
              logout()
            )} >logout</Dropdown.Item>
          </DropdownButton>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
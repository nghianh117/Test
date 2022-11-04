import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../Component/header'
import Create from '../Pages/create'
import Edit from '../Pages/edit'
import Home from '../Pages/home'
import { AuthContext } from '../Store/Context/AuthContext'

const Layout = () => {
  const { checkLogin, authState } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    checkLogin()
  }, [])
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/login')
    }
  }, [authState.isAuthenticated])
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
      </Routes>
    </>
  )
}

export default Layout
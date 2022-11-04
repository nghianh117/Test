import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/login';
import Register from './Pages/register';
import Layout from './Layout';
import AuthContextProvider from './Store/Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import TodoContextProvider from './Store/Context/TodoContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <TodoContextProvider>
          <Router>
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/*' element={<Layout />}></Route>
            </Routes>
          </Router>
        </TodoContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

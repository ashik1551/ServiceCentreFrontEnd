import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './pages/Index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerDetail from './pages/CustomerDetail';
import Header from './components/Header';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header></Header>
      <Routes>

        <Route path='/index' element={<Index></Index>}></Route>
        <Route path='/customer/:id/' element={<CustomerDetail></CustomerDetail>}></Route>
        <Route path='/' element={<Login></Login>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
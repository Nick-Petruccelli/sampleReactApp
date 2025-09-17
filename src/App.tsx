import './App.css'
import { Routes, Route } from 'react-router-dom';
import CustomerList from './comps/CustomerList';
import CustomerPage from './comps/CustomerPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customer/:customerId" element={<CustomerPage />} />
      </Routes>
    </>
  )
}

export default App

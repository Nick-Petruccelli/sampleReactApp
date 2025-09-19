import './App.css'
import { Routes, Route } from 'react-router-dom';
import CustomerList from './comps/CustomerList';
import CustomerPage from './comps/CustomerPage';
import AccountPage from './comps/AccountPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customer/:customerId" element={<CustomerPage />} />
        <Route path="/account/:accountId" element={<AccountPage />} />
      </Routes>
    </>
  )
}

export default App

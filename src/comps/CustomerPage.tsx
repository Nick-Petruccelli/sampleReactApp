import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Customer } from '../types/Customer.types';
import AccountListNode from './AccountListNode';

function CustomerPage() {
  const customerId = Number(useParams<{ customerId: string }>().customerId);

  const [customer, setCustomer] = useState<Customer>();
  const navigate = useNavigate();

  function loadCustomerData() {
    fetch("http://localhost:8080/get-customer/" + customerId)
      .then((response) => response.json())
      .then((data: Customer) => {
        console.log(data);
        setCustomer(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function deleteCustomer() {
    fetch("http://localhost:8080/delete-customer/" + customerId, { method: "DELETE" })
      .catch((err) => console.log(err.message))
      .then(() => {
        navigate("/");
      });
  }

  function createSavingsAccount() {
    fetch("http://localhost:8080/create-savings-account/" + customerId, { method: "PUT" })
      .catch((err) => console.log(err.message))
      .then(() => {
        navigate("/");
      });
  }

  function createCheckingAccount() {
    fetch("http://localhost:8080/create-checking-account/" + customerId, { method: "PUT" })
      .catch((err) => console.log(err.message))
      .then(() => {
        navigate("/");
      });
  }

  function editCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    const requestOptions = { method: "PUT" };
    if (formJson["nameInput"] != "") {
      fetch("http://localhost:8080/update-customer-name/" + customerId + "/" + formJson["nameInput"], requestOptions)
        .catch((err) => console.log(err.message))
        .then(loadCustomerData);
    }
    if (formJson["postalCodeInput"] != "") {
      fetch("http://localhost:8080/update-customer-postalCode/" + customerId + "/" + formJson["streetNumberInput"], requestOptions)
        .catch((err) => console.log(err.message))
        .then(loadCustomerData);
    }
    if (formJson["cityInput"] != "") {
      fetch("http://localhost:8080/update-customer-city/" + customerId + "/" + formJson["cityInput"], requestOptions)
        .catch((err) => console.log(err.message))
        .then(loadCustomerData);
    }
    if (formJson["provinceInput"] != "") {
      fetch("http://localhost:8080/update-customer-province/" + customerId + "/" + formJson["provinceInput"], requestOptions)
        .catch((err) => console.log(err.message))
        .then(loadCustomerData);
    }
  }

  useEffect(loadCustomerData, []);

  return (
    <div>
      {customer != null ?
        <>
          <h1>Customer: {customer.name}</h1>
          <h2>Address: </h2>
          <h3>City: {customer.address.city}</h3>
          <h3>Street Number: {customer.address.streetNumber}</h3>
          <h3>Province: {customer.address.province}</h3>
          <h3>Postal Code: {customer.address.postalCode}</h3>
          <h2>Accounts:</h2>
          <div className='accountList'>
            <div className="customerNode">
              <p>accountId:</p>
              <p>balance:</p>
            </div>
            {customer.accounts.map((account) => {
              return <AccountListNode account={account} />;
            })}
          </div>
        </>
        : ("loading...")}
      <h2>Edit Customer</h2>
      <form className="editCustomerForm" onSubmit={editCustomer}>
        <label>
          Name: <input name="nameInput" />
        </label>
        <label>
          Postal Code: <input name="postalCodeInput" />
        </label>
        <label>
          City: <input name="cityInput" />
        </label>
        <label>
          Province: <input name="provinceInput" />
        </label>
        <button type='submit'>Submit</button>
      </form>
      <button onClick={createSavingsAccount}>Create Savings Account</button>
      <button onClick={createCheckingAccount}>Create Checking Account</button>
      <button onClick={deleteCustomer}>Delete</button>
    </div>
  );
}

export default CustomerPage;

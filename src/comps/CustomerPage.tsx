import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Customer } from '../types/Customer.types';

function CustomerPage() {
  const customerId = Number(useParams<{ customerId: string }>().customerId);

  const [customer, setCustomer] = useState<Customer>();

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
          {customer.accounts.map((account) => {
            return <h3>accountId: {account.accountId} </h3>;
          })}
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
    </div>
  );
}

export default CustomerPage;

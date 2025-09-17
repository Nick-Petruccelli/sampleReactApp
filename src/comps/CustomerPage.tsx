import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Customer } from '../types/Customer.types';

function CustomerPage() {
  const customerId = Number(useParams<{ customerId: string }>().customerId);

  const [customer, setCustomer] = useState<Customer>();

  useEffect(() => {
    fetch("http://localhost:8080/get-customer/" + customerId)
      .then((response) => response.json())
      .then((data: Customer) => {
        console.log(data);
        setCustomer(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
    </div>
  );
}

export default CustomerPage;

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Customer } from '../types/Customer.types';

function AccountPage() {
  const accountId = Number(useParams<{ accountId: string }>().accountId);

  const [account, setAccount] = useState<Account>();
  const navigate = useNavigate();

  function loadAccountData() {
    fetch("http://localhost:8080/get-account/" + accountId)
      .then((response) => response.json())
      .then((data: Customer) => {
        console.log(data);
        setAccount(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function deleteAccount() {
    fetch("http://localhost:8080/delete-account/" + accountId, { method: "DELETE" })
      .catch((err) => console.log(err.message))
      .then(() => {
        navigate("/");
      });
  }

  function editAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    const requestOptions = { method: "PUT" };
    if (formJson["nameInput"] != "") {
      fetch("http://localhost:8080/update-customer-name/" + accountId + "/" + formJson["nameInput"], requestOptions)
        .catch((err) => console.log(err.message))
        .then(loadAccountData);
    }
    if (formJson["postalCodeInput"] != "") {
      fetch("http://localhost:8080/update-customer-postalCode/" + accountId + "/" + formJson["streetNumberInput"], requestOptions)
        .catch((err) => console.log(err.message))
        .then(loadAccountData);
    }
    if (formJson["cityInput"] != "") {
      fetch("http://localhost:8080/update-customer-city/" + accountId + "/" + formJson["cityInput"], requestOptions)
        .catch((err) => console.log(err.message))
        .then(loadAccountData);
    }
    if (formJson["provinceInput"] != "") {
      fetch("http://localhost:8080/update-customer-province/" + accountId + "/" + formJson["provinceInput"], requestOptions)
        .catch((err) => console.log(err.message))
        .then(loadAccountData);
    }
  }

  useEffect(loadAccountData, []);

  return (
    <div>
      {account != null ?
        <>
          <h1>AccountId: {account.accountId}</h1>
          <h2>Balance: {account.balance}</h2>
          <h2>HolderId: {account.customer.customerId}</h2>
          <h2>InterestRate: {account.interestRate}</h2>
          <h2>NextCheckNumber: {account.nextCheckNumber}</h2>
        </>
        : ("loading...")}
      <h2>Edit Customer</h2>
      <form className="editCustomerForm" onSubmit={editAccount}>
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
      <button onClick={deleteAccount}>Delete</button>
    </div>
  );
}

export default AccountPage;

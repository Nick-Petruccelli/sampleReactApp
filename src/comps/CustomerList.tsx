import { useEffect, useState } from "react";
import type { Customer } from "../types/Customer.types";
import CustomerListNode from "./CustomerListNode";

function CustomerList() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  useEffect(updateCustomerList, []);

  function updateCustomerList() {
    fetch("http://localhost:8080/get-customers")
      .then((response) => response.json())
      .then((data: Customer[]) => {
        console.log(data);
        setCustomers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function createCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    const requestOptions = { method: "PUT" };
    fetch("http://localhost:8080/create-customer-person/" + formJson["nameInput"] + "/" + formJson["streetNumberInput"] + "/" + formJson["postalCodeInput"], requestOptions)
      .then((response) => response.json())
      .then((data: Customer) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .then(() => updateCustomerList());
  }

  return (
    <>
      <div>
        <h1>FDM Bank Managment</h1>
      </div>
      <div className="customerContainer">
        <h2>Customers</h2>
        <div className="customerList">
          <div className="customerNode">
            <p>name</p><p>customerId</p>
          </div>
          {customers != null ? (customers.map((customer: Customer) => {
            return <CustomerListNode customer={customer} />
          })) : ("loading...")}
        </div>
        <div className="createNewCustomerForm">
          <h2>Create New Customer</h2>
          <form onSubmit={createCustomer}>
            <label>
              Name: <input name="nameInput" />
            </label>
            <label>
              Street Number: <input name="streetNumberInput" />
            </label>
            <label>
              Postal Code: <input name="postalCodeInput" />
            </label>
            <label>
              Company: <input type="checkbox" name="isCompanyInput" />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}


export default CustomerList;

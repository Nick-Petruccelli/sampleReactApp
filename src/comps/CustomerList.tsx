import { useEffect, useState } from "react";
import type { Customer } from "../types/Customer.types";
import CustomerListNode from "./CustomerListNode";

function CustomerList() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  useEffect(() => {
    fetch("http://localhost:8080/get-customers")
      .then((response) => response.json())
      .then((data: Customer[]) => {
        console.log(data);
        setCustomers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
      </div>
    </>
  )
}


export default CustomerList;

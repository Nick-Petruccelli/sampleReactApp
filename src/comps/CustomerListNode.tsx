import React from "react";
import type { Customer } from "../types/Customer.types"
import { useNavigate } from "react-router-dom";

interface Props {
  customer: Customer,
}


const CustomerListNode: React.FC<Props> = ({ customer }) => {
  const navigate = useNavigate();
  function navToCustomerPage(customerId: number) {
    navigate("customer/" + customerId);
  }

  return (
    <>
      <div className="customerNode" onClick={() => { navToCustomerPage(customer.customerId) }}>
        <p>{customer.name}</p>
        <p>{customer.customerId}</p>
      </div>
    </>
  );
}

export default CustomerListNode;

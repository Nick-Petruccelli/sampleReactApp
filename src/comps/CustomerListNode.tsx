import React from "react";
import type { Customer } from "../types/Customer.types"

interface Props {
  customer: Customer,
}
const CustomerListNode: React.FC<Props> = ({ customer }) => {
  return (
    <>
      <div className="customerNode">
        <p>{customer.name}</p>
        <p>{customer.customerId}</p>
      </div>
    </>
  );
}

export default CustomerListNode;

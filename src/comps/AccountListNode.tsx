import React from "react";
import type { Account } from "../types/Account.types"
import { useNavigate } from "react-router-dom";

interface Props {
  account: Account,
}


const AccountListNode: React.FC<Props> = ({ account }) => {
  const navigate = useNavigate();
  function navToCustomerPage(accountId: number) {
    navigate("/account/" + accountId);
  }

  return (
    <>
      <div className="customerNode" onClick={() => { navToCustomerPage(account.accountId) }}>
        <p>{account.accountId}</p>
        <p>{account.balance}</p>
      </div>
    </>
  );
}

export default AccountListNode;

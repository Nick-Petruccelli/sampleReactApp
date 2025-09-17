import { useParams } from 'react-router-dom';

function CustomerPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const custId = Number(customerId);

  console.log(customerId);
  console.log(custId);

  return (
    <div>
      <h1>Customer:{custId}</h1>
    </div>
  );
}

export default CustomerPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateCustomer } from 'actions/customerActions';
import AddCustomer from './AddCustomer';

const EditCustomer = () => {
  const dispatch = useDispatch();
  const { customerId } = useParams();
  const customer = useSelector((state) => state.customers.find((c) => c.id === customerId));

  useEffect(() => {
    // Fetch customer data or handle any necessary initialization
  }, []);

  const handleEditCustomer = (editedCustomer) => {
    dispatch(updateCustomer(editedCustomer));
  };

  return (
    <AddCustomer
      customer={customer}
      onCancel={() => {
        // Handle cancel action
      }}
      onEdit={handleEditCustomer}
    />
  );
};

export default EditCustomer;
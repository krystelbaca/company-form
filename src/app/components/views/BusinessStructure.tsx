'use client';

import { useMyContext } from '../Context';

import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #4A3AFF;
;
  color: white;
  border: none;
  cursor: pointer;
`;

const BusinessStructure = () => {
  const { value, setValue } = useMyContext();

  return (
    <FormContainer>
      <label htmlFor="businessName">Business name</label>
      <Input id="businessName" type="text" placeholder="Registered business name" />
      <label htmlFor="type">Type</label>
      <Input id="type" type="text" placeholder="Type of business" />
      <label htmlFor="address1">Address</label>
      <Input id="address1" type="text" placeholder="Address line 1" />
      <Input id="address2" type="text" placeholder="Address line 2 (optional)" />
      <Input id="city" type="text" placeholder="City" />
      <Input id="state" type="text" placeholder="State" />
      <Input id="zip" type="text" placeholder="Zip" />
      <Button>Continue</Button>
    </FormContainer>
  );
};

export default BusinessStructure;

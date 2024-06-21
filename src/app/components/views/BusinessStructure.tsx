'use client';

import { ChangeEvent } from 'react';
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
  color: white;
  border: none;
  cursor: pointer;
`;

const BusinessStructure = ({ nextStep }: { nextStep: () => void }) => {
  const { formData, setFormData, setCompletedSteps, completedSteps } = useMyContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleContinue = () => {
    if (!completedSteps.includes(1)) {
      setCompletedSteps([...completedSteps, 1]);
    }
    nextStep();
  };

  return (
    <FormContainer>
      <label htmlFor="businessName">Business name</label>
      <Input id="businessName" type="text" placeholder="Registered business name" value={formData.businessName} onChange={handleChange}/>
      <label htmlFor="type">Type</label>
      <Input id="type" type="dropdown" placeholder="Type of business" value={formData.type} onChange={handleChange}/>
      <label htmlFor="address1">Address</label>
      <Input id="address1" type="text" placeholder="Address line 1" value={formData.address1} onChange={handleChange}/>
      <Input id="address2" type="text" placeholder="Address line 2 (optional)" value={formData.address2} onChange={handleChange}/>
      <Input id="city" type="text" placeholder="City" value={formData.city} onChange={handleChange}/>
      <Input id="state" type="text" placeholder="State" value={formData.state} onChange={handleChange}/>
      <Input id="zip" type="text" placeholder="Zip" value={formData.zip} onChange={handleChange}/>
      <Button onClick={handleContinue}>Continue</Button>
    </FormContainer>
  );
};

export default BusinessStructure;

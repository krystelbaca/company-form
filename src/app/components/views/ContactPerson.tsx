'use client';
import { ChangeEvent, useState } from 'react';

import { useMyContext } from '../Context';

import styled from 'styled-components';

import CustomPhoneInput from './CustomPhone';

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

const NameContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
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

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ContactPerson = ({ nextStep }: { nextStep: () => void }) => {
  const { formData, setFormData, setCompletedSteps, completedSteps } = useMyContext();
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === 'email' && !validateEmail(value)) {
      setEmailError('Make sure your email is a well-formed address');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleContinue = () => {
    if (!completedSteps.includes(2)) {
      setCompletedSteps([...completedSteps, 2]);
    }
    nextStep();
  };

  return (
    <FormContainer>
      <label htmlFor="name">Name</label>
      <NameContainer>
        <Input id="firstName" type="text" placeholder="First name" value={formData.firstName} onChange={handleChange}/>
        <Input id="lastName" type="text" placeholder="Last name" value={formData.lastName} onChange={handleChange}/>
      </NameContainer>
      <label htmlFor="email">Email</label>
      <Input
        id="email"
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{ borderColor: emailError ? 'red' : '#ccc' }}
      />
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      <label htmlFor="phone">Phone</label>
      <CustomPhoneInput
        country={'us'}
        value={formData.phone}
        onChange={handlePhoneChange}
      />
      <Button onClick={handleContinue}>Continue</Button>
    </FormContainer>
  );
};

export default ContactPerson;

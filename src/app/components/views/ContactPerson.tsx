'use client';
import { ChangeEvent, useState } from 'react';

import { useMyContext } from '../Context';

import styled from 'styled-components';

import CustomPhoneInput from './CustomPhone';

import Image from 'next/image';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 410px;
  margin: 0 auto;
  padding: 1rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
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
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 6px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;
const IconWrapper = styled.span`
  margin-left: 0.5rem;
  align-items: center;
`;

const ContactPerson = () => {
  const { formData, setFormData, nextStep, setCompletedSteps, completedSteps } = useMyContext();
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const newValidationErrors: { [key: string]: boolean } = {};
  ['firstName', 'lastName', 'email', 'phone']
  .forEach((field) => {
    if (!formData[field]) {
      newValidationErrors[field] = true;
    }
  });

  if (Object.keys(newValidationErrors).length > 0) {
    setValidationErrors(newValidationErrors);
  } else {
    if (!completedSteps.includes(1)) {
      setCompletedSteps([...completedSteps, 1]);
    }
    nextStep();
  }

  return (
    <FormContainer onSubmit={handleContinue}>
      <label htmlFor="name">Name</label>
      <NameContainer>
        <Input id="firstName" type="text" placeholder="First name" required value={formData.firstName} onChange={handleChange}/>
        <Input id="lastName" type="text" placeholder="Last name" required value={formData.lastName} onChange={handleChange}/>
      </NameContainer>
      <label htmlFor="email">Email</label>
      <Input
        id="email"
        type="text"
        placeholder="Email"
        required
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
      <Button type='submit'>
        Continue  
        <IconWrapper>
          <Image src="/Fill/arrow-left.png" alt="Arrow Right" width={16} height={16} />
        </IconWrapper>   
      </Button>
    </FormContainer>
  );
};

export default ContactPerson;

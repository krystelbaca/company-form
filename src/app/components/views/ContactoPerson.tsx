'use client';
import { useState } from 'react';

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

const ContactPerson = () => {
  const { value, setValue } = useMyContext();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');


  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError('Make sure your email is a well-formed address');
    } else {
      setEmailError('');
    }
  };

  return (
    <FormContainer>
      <label htmlFor="name">Name</label>
      <NameContainer>
        <Input id="firstName" type="text" placeholder="First name" />
        <Input id="lastName" type="text" placeholder="Last name" />
      </NameContainer>
      <label htmlFor="email">Email</label>
      <Input
        id="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        style={{ borderColor: emailError ? 'red' : '#ccc' }}
      />
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
      <label htmlFor="phone">Phone</label>
      <CustomPhoneInput
        country={'us'}
        value={phone}
        onChange={setPhone}
      />
      <Button>Continue</Button>
    </FormContainer>
  );
};

export default ContactPerson;

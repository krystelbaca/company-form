'use client';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useMyContext } from '../Context';

import styled from 'styled-components';

import Image from 'next/image';

import InputMask from 'react-input-mask';

interface InputProps {
  isInvalid?: boolean;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 410px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
`;

const Input = styled.input<InputProps>`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: ${(props) => (props.isInvalid ? '2px solid red' : '1px solid #ccc')};
  border-radius: 6px;
`;

const Select = styled.select<InputProps>`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: ${(props) => (props.isInvalid ? '2px solid red' : '1px solid #ccc')};
`;

const NameContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PhoneContainer = styled.div`
display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;

  & > select {
    flex: 0 0 100px; /* Fixed width for the country select */
  }

  & > input {
    flex: 1; /* The phone input takes up the remaining space */
  }
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
  const { 
    formData, 
    setFormData, 
    nextStep, 
    setCompletedSteps, 
    completedSteps, 
    countries 
  } = useMyContext();

  const [emailError, setEmailError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone: string) => {
    const cleanedPhone = phone.replace(/\D/g, '');
    return cleanedPhone.length === 10;
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === 'email' && !validateEmail(value)) {
      setEmailError('Make sure your email is a well-formed address');
    } else {
      setEmailError('');
    }

    setValidationErrors((prev) => ({ ...prev, [id]: false }));
  };

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();

    const newValidationErrors: { [key: string]: boolean } = {};
    ['firstName', 'lastName', 'email', 'country', 'phone'].forEach((field) => {
      if (!formData[field]) {
        newValidationErrors[field] = true;
      }
    });

    if (!validatePhone(formData.phone)) {
      newValidationErrors['phone'] = true;
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
    } else {
      if (!completedSteps.includes(2)) {
        setCompletedSteps([...completedSteps, 2]);
      }
      nextStep();
    }
  };

  return (
    <FormContainer onSubmit={handleContinue}>
      <label htmlFor="name">Name</label>
      <NameContainer>
        <Input 
          id="firstName" 
          type="text" 
          placeholder="First name" 
          required 
          value={formData.firstName} 
          onChange={handleChange}
          isInvalid={validationErrors.firstName}
        />
        {validationErrors.firstName && <ErrorMessage>Required field</ErrorMessage>}

        <Input 
          id="lastName" 
          type="text" 
          placeholder="Last name" 
          required 
          value={formData.lastName} 
          onChange={handleChange}
          isInvalid={validationErrors.lastName}
        />
        {validationErrors.lastName && <ErrorMessage>Required field</ErrorMessage>}
      </NameContainer>
      
      <label htmlFor="email">Email</label>
      <Input
        id="email"
        type="text"
        placeholder="Email"
        required
        value={formData.email}
        onChange={handleChange}
        isInvalid={validationErrors.email || !!emailError}
      />
      {validationErrors.email && <ErrorMessage>Required field</ErrorMessage>}
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

      <label htmlFor="phone">Phone</label>
      <PhoneContainer>
        <Select id="country" value={formData.country} onChange={handleChange} required isInvalid={validationErrors.country}>
          <option value="" disabled hidden></option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              ({country.phone_code})
            </option>
          ))}
        </Select>
        {validationErrors.country && <ErrorMessage>Required field</ErrorMessage>}
        
        <InputMask 
          mask="(999) 999-9999" 
          value={formData.phone} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        >
          {(inputProps: any) => (
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(555) 000-000"
              required
              isInvalid={validationErrors.phone}
              {...inputProps}
            />
          )}
        </InputMask>
        {validationErrors.phone && <ErrorMessage>Required field</ErrorMessage>}
      </PhoneContainer>

      <Button type="submit">
        Continue
        <IconWrapper>
          <Image src="/Fill/arrow-left.png" alt="Arrow Right" width={16} height={16} />
        </IconWrapper>   
      </Button>
    </FormContainer>
  );
};

export default ContactPerson;

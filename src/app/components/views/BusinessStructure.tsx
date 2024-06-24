'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

import { useMyContext } from '../Context';

import Image from 'next/image';

import styled from 'styled-components';
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

  @media (max-width: 768px) {
    padding: 0.5rem;
    max-width: 100%;
  }
`;

const Input = styled.input<InputProps>`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: ${(props) => (props.isInvalid ? '2px solid red' : '1px solid #ccc')};
  border-radius: 6px;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Select = styled.select<InputProps>`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: ${(props) => (props.isInvalid ? '2px solid red' : '1px solid #ccc')};
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

const IconWrapper = styled.span`
  margin-left: 0.5rem;
  align-items: center;
`;

const StateZipContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  & > * {
    flex: 1;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  display: block;
`;

const BusinessStructure = () => {
  const { 
    formData, 
    setFormData, 
    nextStep, 
    setCompletedSteps, 
    completedSteps, 
    states, 
    companyTypes, 
  } = useMyContext();

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: boolean }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setValidationErrors((prev) => ({ ...prev, [id]: false }));
  };

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();

    const newValidationErrors: { [key: string]: boolean } = {};
    ['businessName', 'type', 'address1', 'city', 'state', 'zip'].forEach((field) => {
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
  };

  return (
    <FormContainer onSubmit={handleContinue}>
      <label htmlFor="businessName">Business name</label>
      <Input
        id="businessName"
        type="text"
        placeholder="Registered business name"
        value={formData.businessName}
        onChange={handleChange}
        required
        isInvalid={validationErrors.businessName}
      />
      {validationErrors.businessName && <ErrorMessage>Required field</ErrorMessage>}

      <label htmlFor="type">Type</label>
      <Select id="type" value={formData.type} onChange={handleChange} required isInvalid={validationErrors.type}>
        <option value="" disabled hidden>
          Type of Business
        </option>
        {companyTypes.map((companyType, index) => (
          <option key={index} value={companyType}>
            {companyType}
          </option>
        ))}
      </Select>
      {validationErrors.type && <ErrorMessage>Required field</ErrorMessage>}

      <label htmlFor="address1">Address</label>
      <Input
        id="address1"
        type="text"
        placeholder="Address line 1"
        value={formData.address1}
        onChange={handleChange}
        required
        isInvalid={validationErrors.address1}
      />
      {validationErrors.address1 && <ErrorMessage>Required field</ErrorMessage>}

      <Input
        id="address2"
        type="text"
        placeholder="Address line 2 (optional)"
        value={formData.address2}
        onChange={handleChange}
      />

      <Input
        id="city"
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
        isInvalid={validationErrors.city}
      />
      {validationErrors.city && <ErrorMessage>Required field</ErrorMessage>}

      <label htmlFor="state">State</label>
      <StateZipContainer>
        <Select id="state" value={formData.state} onChange={handleChange} required isInvalid={validationErrors.state}>
          <option value="" disabled hidden>State</option>
          {states.map((state) => (
            <option key={state.abbreviation} value={state.abbreviation}>
              {state.name}
            </option>
          ))}
        </Select>
        {validationErrors.state && <ErrorMessage>Required field</ErrorMessage>}

        <Input
          id="zip"
          type="text"
          placeholder="Zip"
          value={formData.zip}
          onChange={handleChange}
          required
          isInvalid={validationErrors.zip}
          pattern="\d{5}"
        />
        {validationErrors.zip && <ErrorMessage>Required field</ErrorMessage>}
      </StateZipContainer>

      <Button type="submit">
        Continue
        <IconWrapper>
          <Image src="/Fill/arrow-left.png" alt="Arrow Right" width={16} height={16} />
        </IconWrapper> 
      </Button>
    </FormContainer>
  );
};

export default BusinessStructure;

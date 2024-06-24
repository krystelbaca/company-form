'use client';

import { FormEvent, useState } from 'react';

import { useMyContext } from '../Context';

import styled from 'styled-components';

import Image from 'next/image';

import { addNewCompany } from '../../api/api';

const FormContainer = styled.form`
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
`;

const BusinessContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ContactPerson = styled.div`
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

const IconWrapper = styled.span`
  margin-left: 0.5rem;
  align-items: center;
`;

const LinkButton = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: transparent;
  color: #4A3AFF;
  border: none;
  cursor: pointer;
  text-decoration: underline;
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background-color: #e6ffee;
  color: #004d00;
  border: 1px solid #004d00;
  border-radius: 6px;
  margin-bottom: 1rem;
`;

const ReviewAndSubmit =  () => {
  const { formData, setStep, setFormData, completedSteps, setCompletedSteps } = useMyContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEditClick = (step: number) => {
    setStep(step);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await addNewCompany(formData);
      setIsSubmitted(true);
      setSuccessMessage(response.data.message);

      if (!completedSteps.includes(3)) {
        setCompletedSteps([...completedSteps, 3]);
      }

      return response.data.message
    } catch (error) {
      return error
    }
  };

  const handleStartOver = () => {
    setFormData({
      businessName: '',
      type: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
    });
    setCompletedSteps([]);
    setStep(1);
    setIsSubmitted(false);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <BusinessContainer>
        <span>Business structure</span>
        <LinkButton onClick={() => handleEditClick(1)}>Edit</LinkButton>
      </BusinessContainer>
      <p>Name: {formData.businessName}</p>
      <p>Type: {formData.type}</p>
      <p>Address: {formData.address1}, {formData.address2}, {formData.city}, {formData.state}, {formData.zip}</p>

      <ContactPerson>
        <span>Contact person</span>
        <LinkButton onClick={() => handleEditClick(2)}>Edit</LinkButton>
      </ContactPerson>
      <p>Name: {formData.firstName} {formData.lastName}</p>
      <p>Email: {formData.email}</p>
      <p>Phone: {formData.phone}</p>
      <Button type="submit" onClick={isSubmitted ? handleStartOver : undefined}>
        {isSubmitted ? 'Start Over' : 'Confirm & Submit'}
        <IconWrapper>
          <Image src="/Fill/arrow-left.png" alt="Arrow Right" width={16} height={16} />
        </IconWrapper>
      </Button>
      {isSubmitted && (
        <SuccessMessage>
          {successMessage}
        </SuccessMessage>
      )}
    </FormContainer>
  );
};

export default ReviewAndSubmit;

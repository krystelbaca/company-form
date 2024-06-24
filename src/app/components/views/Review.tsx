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
  box-sizing: border-box;
`;

const SectionTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const DetailLabel = styled.span`
  color: #bfbfbf;
  justify-text: right;
`;

const DetailValue = styled.span`
  color: black;
  justify-content: center;
`;

const DetailRow = styled.p`
  margin: 0;
  padding: 10px;
  display: flex;
  gap: 0.5rem;
  
`;

const LinkButton = styled.button`
  font-size: 1rem;
  background-color: transparent;
  color: #4A3AFF;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
`;

const SuccessMessage = styled.div`
  padding: 10px;
  margin-top: 20px;
  background-color: ${(props) => (props.error ? '#f8d7da' : '#d4edda')};
  color: ${(props) => (props.error ? '#EF4444' : '#155724')};
  border: 1px solid ${(props) => (props.error ? '#EF4444' : '#c3e6cb')};
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
    } catch (error: any) {
      setIsSubmitted(true);
      if (error.response?.status === 500) {
        setSuccessMessage('Sorry, we are having technical issues. Try again.');
      } else {
        setSuccessMessage(error.response?.data.message || 'An error occurred. Please try again.');
      }
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
      <SectionContainer>
        <SectionTitle>Business structure</SectionTitle>
        <LinkButton type="button" onClick={() => handleEditClick(1)}>Edit</LinkButton>
      </SectionContainer>
      <DetailRow><DetailLabel>Name:</DetailLabel><DetailValue>{formData.businessName}</DetailValue></DetailRow>
      <DetailRow><DetailLabel>Type:</DetailLabel><DetailValue>{formData.type}</DetailValue></DetailRow>
      <DetailRow><DetailLabel>Address:</DetailLabel><DetailValue>{formData.address1}, {formData.address2}, {formData.city}, {formData.state}, {formData.zip}</DetailValue></DetailRow>

      <SectionContainer>
        <SectionTitle>Contact person</SectionTitle>
        <LinkButton type="button" onClick={() => handleEditClick(2)}>Edit</LinkButton>
      </SectionContainer>
      <DetailRow><DetailLabel>Name:</DetailLabel><DetailValue>{formData.firstName} {formData.lastName}</DetailValue></DetailRow>
      <DetailRow><DetailLabel>Email:</DetailLabel><DetailValue>{formData.email}</DetailValue></DetailRow>
      <DetailRow><DetailLabel>Phone:</DetailLabel><DetailValue>{formData.phone}</DetailValue></DetailRow>
      {isSubmitted && (
        <SuccessMessage error={successMessage.includes('technical issues') || successMessage.includes('A company with the same name has been detected')}>
          {successMessage}
        </SuccessMessage>
      )}
      <Button type="submit" onClick={isSubmitted ? handleStartOver : undefined}>
        <IconWrapper>
          <Image src="/Fill/arrow-left.png" alt="Arrow Right" width={16} height={16} />
        </IconWrapper>
      </Button>
    </FormContainer>
  );
};

export default ReviewAndSubmit;

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
;
  color: white;
  border: none;
  cursor: pointer;
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

const ReviewAndSubmit =  () => {
  const { formData, setStep } = useMyContext();

  const handleEditClick = (step: number) => {
    setStep(step);
  };

  return (
    <FormContainer>
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
      <Button>Confirm & Submit</Button>
    </FormContainer>
  );
};

export default ReviewAndSubmit;

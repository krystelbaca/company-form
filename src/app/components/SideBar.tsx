"use client";

import { useMyContext } from './Context';
import styled from 'styled-components';
import Image from 'next/image';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Step = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  margin: 10px 0;
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? '#6200ea' : '#000')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
`;

const StepNumber = styled.div<{ $isCompleted: boolean }>`
  width: 33px;
  height: 33px;
  background-color: ${(props) => (props.$isCompleted ? '#4ADE80' : '#6200ea')};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const StepLabel = styled.span`
  font-size: 16px;
`;

const Sidebar = () => {
  const { step, setStep, completedSteps } = useMyContext();

  const renderStepIcon = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      return <Image src="/Media/Icon.svg" alt="Completed" width={17} height={17} />;
    }
    return <span>{stepNumber}</span>;
  };

  return (
    <SidebarContainer>
      {[1, 2, 3].map((stepNumber) => (
        <Step
          key={stepNumber}
          $isActive={step === stepNumber}
          $isCompleted={completedSteps.includes(stepNumber)}
          onClick={() => setStep(stepNumber)}
        >
          <StepNumber $isCompleted={completedSteps.includes(stepNumber)}>
            {renderStepIcon(stepNumber)}
          </StepNumber>
          <StepLabel>
            {stepNumber === 1 ? 'Business structure' :
             stepNumber === 2 ? 'Contact person' :
             'Review & submit'}
          </StepLabel>
        </Step>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
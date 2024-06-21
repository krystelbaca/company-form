"use client";

import { useMyContext } from './Context';

import styled from 'styled-components';
import Image from 'next/image';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
`;

const Step = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  margin: 20px 0;
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  color: 'black'
`;

const StepNumber = styled.div<{ $isCompleted: boolean }>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.$isCompleted ? '#4ADE80' : '#6200ea')};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Sidebar = () => {
  const { step, setStep, completedSteps } = useMyContext();

  const renderStepIcon = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      return <Image src="public/Media/Icon.svg" alt="Completed" width={17} height={17} />;
    }
    return <span>{stepNumber}</span>;
  };

  return (
    <SidebarContainer>
      <Step $isActive={step === 1} $isCompleted={completedSteps.includes(1)} onClick={() => setStep(1)}>
        <StepNumber $isCompleted={completedSteps.includes(1)}>
          {renderStepIcon(1)}
        </StepNumber>
        <span>Business structure</span>
      </Step>
      <Step $isActive={step === 2} $isCompleted={completedSteps.includes(2)} onClick={() => setStep(2)}>
        <StepNumber $isCompleted={completedSteps.includes(2)}>
          {renderStepIcon(2)}
        </StepNumber>
        <span>Contact person</span>
      </Step>
      <Step $isActive={step === 3} $isCompleted={completedSteps.includes(3)} onClick={() => setStep(3)}>
        <StepNumber $isCompleted={completedSteps.includes(3)}>
          {renderStepIcon(3)}
        </StepNumber>
        <span>Review & submit</span>
      </Step>
    </SidebarContainer>
  );
};

export default Sidebar;

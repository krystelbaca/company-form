'use client'

import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
`;

const Step = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  background-color: #6200ea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Step>
        <StepNumber>1</StepNumber>
        <span>Business structure</span>
      </Step>
      <Step>
        <StepNumber>2</StepNumber>
        <span>Contact person</span>
      </Step>
      <Step>
        <StepNumber>3</StepNumber>
        <span>Review & submit</span>
      </Step>
    </SidebarContainer>
  );
};

export default Sidebar;

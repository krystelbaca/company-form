'use client';

import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>New Company</Title>
    </HeaderContainer>
  );
};

export default Header;

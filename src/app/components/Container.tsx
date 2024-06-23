'use client';

import React from 'react';
import styled from 'styled-components';
import Sidebar from './SideBar';
import Header from './Header';

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex-grow: 1;
`;

const Content = styled.section`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Container = ({ children }: { children: React.ReactNode }) => (
  <ContainerWrapper>
    <Header />
    <MainContent>
      <Sidebar />
      <Content>{children}</Content>
    </MainContent>
  </ContainerWrapper>
);

export default Container;

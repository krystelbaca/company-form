'use client';

import React from 'react';
import styled from 'styled-components';
import Sidebar from './SideBar';
import Header from './Header';

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.main`
  display: flex;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
`;

const Content = styled.section`
  width: 410px
  height: auto
  padding: 20px;
  overflow-y: auto;
  position: absolute;
  left: 434px;
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

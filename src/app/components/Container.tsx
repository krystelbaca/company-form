"use client";

import React from 'react';
import styled from 'styled-components';
import Sidebar from './SideBar';

const ContainerWrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const Container = ({ children }: { children: React.ReactNode }) => (
  <ContainerWrapper>
    <Sidebar />
    <Content>{children}</Content>
  </ContainerWrapper>
);

export default Container;

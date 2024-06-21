'use client';
import styled from 'styled-components';
import Sidebar from './SideBar';
import { useMyContext } from './Context';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const Header = styled.div`
  height: 60px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { value, setValue } = useMyContext();
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header>New Company</Header>
        {children}
      </MainContent>
    </Container>
  );
};

export default Layout;

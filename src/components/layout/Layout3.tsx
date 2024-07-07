import styled from '@emotion/styled';
import React from 'react';

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout3 = ({ children }: AppLayoutProps) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Layout3;
const Container = styled.div`
`;



import styled from '@emotion/styled';
// import PageTransitions from ".@/components/common/reactTransitionGroup/PageTransitions";

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout1 = ({ children }: AppLayoutProps) => {
  return (
    <Container>
      <Container1>{children}</Container1>
    </Container>
  );
};

export default Layout1;
const Container = styled.div`
  height: 100%;
  margin: 8px 4px 10px 4px;
  border-radius: ${props => props.theme.borderRadius.br10};
`;

const Container1 = styled.div`
  max-width: 1440px;
  /* LeftBar.tsx에 있는 너비와 맞추어주어야 한다. */
  /* 마진 5px * 2 + leftBar(44px) */
  width: calc(100vw - 52px);
  @media (min-width: ${props => props.theme.deviceSizes.pc}) {
    width: calc(100vw - 130px);
    margin: auto;
  }
`;

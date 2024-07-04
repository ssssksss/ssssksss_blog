import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import { ReactElement } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */
const Index = () => {
  return (
    <Container>
      <div> 여기는 대시보드 </div>
    </Container>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};

const Container = styled.div`
  width: 100%;
`;

import theme from "@/styles/theme";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BlogFirstMenu from "src/components/blog/BlogUI/BlogFirstMenu";
import BlogSecondMenu from "src/components/blog/BlogUI/BlogSecondMenu";
import styled from "@emotion/styled";
import PageTransitions from "../common/reactTransitionGroup/PageTransitions";

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout1 = ({ children }: AppLayoutProps) => {
  return (
    <Container>
      {/*  */}
      <Container1>{children}</Container1>
      {/*  */}
    </Container>
  );
};

export default Layout1;
const Container = styled.div``;
const Container1 = styled.div`
  margin: auto;
  max-width: 1440px;
`;

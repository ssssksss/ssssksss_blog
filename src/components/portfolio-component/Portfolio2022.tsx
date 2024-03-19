import styled from '@emotion/styled';
// import Button from '@components/common/button/Button';
// import ImageCard from '@components/common/card/ImageCard';
// import TagList from '@components/common/tag/TagList';
// import { CC } from '@styles/commonComponentStyle';
// import BlogProject from '/public/img/portfolio/project/blogProject.png';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file portfolio2024.tsx
 * @version 0.0.1 "2024-03-04 01:59:31"
 * @description 설명
 */

// const backComponent1 = () => {
//   return (
//     <CC.ColumnCenterCenterDiv gap={8} w={'100%'}>
//       <CC.RowCenterDiv pd={'0.4rem'}>
//         블로그, 게시판, 투두, 메모, 일정, 인증 등 계속 개발 중인 토이 프로젝트
//       </CC.RowCenterDiv>
//       <CC.RowDiv gap={4}>
//         <Button bg={'secondary20'}>
//           <a
//             href={'https://github.com/ssssksss/ssssksss_blog_frontend'}
//             target="_blanket"
//           >
//             깃허브(FE)
//           </a>
//         </Button>
//         <Button bg={'secondary20'}>
//           <a href={'https://blog.ssssksss.xyz/'} target="_blanket">
//             배포
//           </a>
//         </Button>
//       </CC.RowDiv>
//       <CC.ColumnDiv>
//         <div> 개발 진행 중 (2021 ~ ) </div>
//       </CC.ColumnDiv>
//       <TagList
//         data={[
//           'Next.js',
//           'Emotion',
//           'Redux',
//           'Spring boot',
//           'react-query',
//           'Mysql',
//         ]}
//       />
//     </CC.ColumnCenterCenterDiv>
//   );
// };

const Portfolio2022 = () => {
  return (
    <Container>
      {/* <ImageCard
        imgSrc={BlogProject}
        w={'30rem'}
        h={'30rem'}
        backComponent={backComponent1()}
      ></ImageCard> */}
    </Container>
  );
};
export default Portfolio2022;

const Container = styled.div`
  height: 100%;
  padding: 1.6rem;
  gap: 0.8rem;
  display: flex;
  flex-flow: nowrap row;
  overflow-x: scroll;
  ${(props) => props.theme.scroll.hidden};
  & > * {
    outline: solid black 0.1rem;
    flex-shrink: 0;
  }
`;

import { animationKeyFrames } from '@/styles/animationKeyFrames';
import { CC } from '@/styles/commonComponentStyle';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Button from '../common/button/Button';
import InputSearch from '../common/input/InputSearch';
import Pagination from '../common/pagination/Pagination';
import { useEffect } from 'react';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { useState } from 'react';
import { dateFormat4y2m2d } from '../../../utils/fucntion/dateFormat';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
/**
 * Author : Sukyung Lee
 * FileName: BoardContainer.tsx
 * Date: 2022-09-20 18:28:51
 * Description :
 */
const ViewBoardsContainer = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword || '');
  const [page, setPage] = useState<any>(router.query.page || 1);
  const [sort, setSort] = useState(
    router.query.sort || 'baseTimeEntity.createdAt'
  );
  const [size, setSize] = useState<any>(router.query.size || 10);
  const [boardList, setBoardList] = useState([]);
  const authStore = useSelector((state: RootState) => state.authStore);
  const [pageCount, setPageCount] = useState(1);

  const searchHandler = () => {
    AxiosInstance({
      url: '/api/boards',
      method: 'GET',
      params: {
        keyword: String(keyword),
        page: Number(0),
        size: Number(size),
        sort: sort,
      },
    })
      .then(response => {
        setBoardList(response.data.data.boards);
        setSize(size);
        setPage(1);
        setPageCount(response.data.data.boardsCount);
        const url = `/board?page=1&size=${size}&keyword=${keyword}&sort=${sort}`;
        router.replace(url, '', { shallow: true });
      })
      .catch(error => {
        alert('에러가 발생하였습니다.');
      });
  };

  const pageHandler = (page: any) => {
    AxiosInstance({
      url: '/api/boards',
      method: 'GET',
      params: {
        keyword: String(keyword),
        page: Number(page - 1),
        size: Number(size),
        sort: sort,
      },
    })
      .then(response => {
        setBoardList(response.data.data.boards);
        setPage(page);
        setSize(size);
        setSort(sort);
        setPageCount(response.data.data.boardsCount);
        const url = `/board?page=${page}&size=${size}&keyword=${keyword}&sort=${sort}`;
        router.replace(url, '', { shallow: true });
      })
      .catch(error => {
        alert('에러가 발생하였습니다.');
      });
  };

  const changeOptionHandler = (e: any) => {
    AxiosInstance({
      url: '/api/boards',
      method: 'GET',
      params: {
        keyword: String(keyword),
        page: Number(0),
        size: Number(size),
        sort:
          e.target.value === '' ? 'baseTimeEntity.createdAt' : e.target.value,
      },
    })
      .then(response => {
        setBoardList(response.data.data.boards);
        setSort(e.target.value || 'baseTimeEntity.createdAt');
        setPage(1);
        setPageCount(response.data.data.boardsCount);
        const url = `/board?page=1&size=${size}&keyword=${keyword}&sort=${
          e.target.value || 'baseTimeEntity.createdAt'
        }`;
        router.replace(url, '', { shallow: true });
      })
      .catch(error => {
        alert('에러가 발생하였습니다.');
      });
  };

  // 처음에 접속했을 때
  useEffect(() => {
    const urlQueryStringInstance = new URLSearchParams(location.search);
    AxiosInstance({
      url: '/api/boards',
      method: 'GET',
      params: {
        keyword: String(urlQueryStringInstance.get('keyword') || ''),
        page: Number(page - 1),
        size: Number(size),
        sort: urlQueryStringInstance.get('sort')
          ? urlQueryStringInstance.get('sort')
          : 'baseTimeEntity.createdAt',
      },
    })
      .then(response => {
        setBoardList(response.data.data.boards);
        setKeyword(String(urlQueryStringInstance.get('keyword') || ''));
        setSize(Number(urlQueryStringInstance.get('size') || size));
        setPage(Number(urlQueryStringInstance.get('page')) || page);
        setSort(
          urlQueryStringInstance.get('sort') || 'baseTimeEntity.createdAt'
        );
        setPageCount(response.data.data.boardsCount);
        const url = `/board?page=${
          Number(urlQueryStringInstance.get('page')) || page
        }&size=${Number(
          urlQueryStringInstance.get('size') || size
        )}&keyword=${String(
          urlQueryStringInstance.get('keyword') || ''
        )}&sort=${
          urlQueryStringInstance.get('sort') || 'baseTimeEntity.createdAt'
        }`;
        router.replace(url, '', { shallow: true });
      })
      .catch(error => {
        alert('에러가 발생하였습니다.');
      });
  }, []);

  return (
    <Container>
      <Header>
        <h2> 게시판 </h2>
      </Header>
      <CC.RowCenterDiv>
        <CC.ColumnDiv width={'100%'}>
          <MainHeader>
            <InputSearch
              width={'300px'}
              height={'30px'}
              img={'/img/ui-icon/search_icon.png'}
              onChange={(e: any) => setKeyword(e.target.value)}
              onClickSearch={searchHandler}
              defaultValue={router.query.keyword}
            />
            <select name="area" onChange={changeOptionHandler}>
              <option value=""> 최신순 </option>
              <option value="views"> 조회순 </option>
            </select>
          </MainHeader>
          <Main>
            <BoardListTitle>
              <CC.RowCenterDiv> 번호 </CC.RowCenterDiv>
              <CC.RowCenterDiv> 제목 </CC.RowCenterDiv>
              <CC.RowCenterDiv> 작성자 </CC.RowCenterDiv>
              <CC.RowCenterDiv> 날짜 </CC.RowCenterDiv>
              <CC.RowCenterDiv> 조회수 </CC.RowCenterDiv>
            </BoardListTitle>
            {boardList.map((el: any, index: number) => (
              <BoardItem
                key={index}
                onClick={() => router.push(`/board/${el.id}`)}
              >
                <CC.RowCenterDiv> {el.id} </CC.RowCenterDiv>
                <CC.RowCenterDiv> {el.title} </CC.RowCenterDiv>
                <CC.RowCenterDiv> {el.writer} </CC.RowCenterDiv>
                <CC.RowCenterDiv>
                  {dateFormat4y2m2d(el.baseTimeEntity.createdAt)}
                </CC.RowCenterDiv>
                <CC.RowCenterDiv> {el.views} </CC.RowCenterDiv>
              </BoardItem>
            ))}
          </Main>
        </CC.ColumnDiv>
      </CC.RowCenterDiv>
      <MainFooter>
        <Pagination
          refetch={({ page }: any) => {
            pageHandler(page);
          }}
          endPage={Math.ceil(pageCount / size)}
          currentPage={Number(page)}
        />
        {authStore.role !== '' && (
          <CC.RowRightDiv padding={'0px 10px 0px 0px'}>
            <Button width="100px" onClick={() => router.push('/board/add')}>
              글작성하기
            </Button>
          </CC.RowRightDiv>
        )}
      </MainFooter>
    </Container>
  );
};
export default ViewBoardsContainer;
const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-flow: nowrap column;
`;
const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`;
const MainHeader = styled(CC.RowDiv)`
  margin: auto;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  height: 60px;

  & > select {
    height: 30px;
    width: 100px;
  }
`;
const Main = styled.main`
  gap: 10px;
  display: flex;
  flex-flow: nowrap column;
  min-height: 600px;
`;
const BoardListTitle = styled.div`
  width: 100%;
  height: 40px;
  color: white;
  display: grid;
  grid-template-columns: 40px auto 60px 100px 60px;
  align-items: center;
  background: ${theme.backgroundColors.grayDark};
  font-family: ${theme.fontFamily.gmarketSansBold};
`;
const BoardItem = styled.button`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 40px auto 60px 100px 60px;
  align-items: center;

  &:nth-of-type(2n + 1) {
    background: ${theme.backgroundColors.gray};
  }
  &:nth-of-type(2n) {
    background: ${theme.backgroundColors.grayLight};
  }

  &:hover {
    cursor: pointer;
    background: ${theme.backgroundColors.purpleLight};
  }
`;

const MainFooter = styled(CC.ColumnDiv)`
  position: sticky;
  display: flex;
  align-items: center;
  padding: 20px 0px;
  gap: 10px;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.5);
`;

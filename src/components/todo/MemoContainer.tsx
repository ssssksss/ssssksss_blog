import { MemoAPI } from '@/api/MemoAPI';
import { Button } from '@/components/common/button/Button';
import ModalButton from '@/components/common/button/ModalButton';
import { Icons } from '@/components/common/icons/Icons';
import MemoCategoryModal from '@/components/memo/modal/MemoCategoryModal';
import { store } from '@/redux/store';
import { SET_MEMO_CATEGORY_LIST, SET_MEMO_LIST } from '@/redux/store/memo';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MemoItem from './MemoItem';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MemoContainer.tsx
 * @version 0.0.1 "2023-09-29 02:20:31"
 * @description 설명
 */

interface IMemoContainerProps {
  active: number;
  onClick: () => void;
}

const MemoContainer = (props: IMemoContainerProps) => {
  const memoStore = useSelector((state: RootState) => state.memoStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  const [activeMenu, setActiveMenu] = useState({
    type: 'all',
    categoryId: '',
    isShowMessage: true,
  });

  // const memoCategoryListQueryResData = MemoAPI.getMemoCategoryList();
  // const memoListQueryResData = MemoAPI.getMemoList({
  //   type: 'all',
  // });

  useEffect(() => {
    if (!authStore.id) return;
    MemoAPI.getMemoCategoryList()
      .then((res: any) => {
        store.dispatch(SET_MEMO_CATEGORY_LIST(res.json?.memoCategoryList));
      })
      .catch((err: any) => {
        console.log('MemoContainer.tsx 파일 : ', err);
      });

    MemoAPI.getMemoList({
      type: 'all',
    })
      .then((res: any) => {
        store.dispatch(SET_MEMO_LIST(res.json?.memoList));
      })
      .catch((err: any) => {
        console.log('MemoContainer.tsx 파일 : ', err);
      });
  }, [authStore.id]);

  return (
    <Container>
      <MemoMenuNavListContainer>
        <Button
          bg={'gray60'}
          active={activeMenu.type === 'all'}
          onClick={() =>
            setActiveMenu({
              type: 'all',
              categoryId: '',
            })
          }
        >
          ALL
        </Button>
        {memoStore.memoCategoryList?.map(i => (
          <Button
            bg={i.backgroundColor}
            active={activeMenu.type === i.name}
            onClick={() =>
              setActiveMenu({
                type: i.name,
                categoryId: i.id,
              })
            }
          >
            {i.name}
          </Button>
        ))}
        {authStore.id && (
          <ModalButton
            modal={<MemoCategoryModal />}
            modalOverlayVisible={true}
            h={'32px'}
            modalMinW={'320px'}
            modalH={'200%'}
          >
            <Image src={Icons.SettingIcon} weight={20} height={20} alt="" />
          </ModalButton>
        )}
      </MemoMenuNavListContainer>
      <MainContainer>
        {activeMenu.type != 'all' && authStore.id && (
          <MemoItem edit={false} category={activeMenu} />
        )}
        {memoStore.memoList
          ?.filter(i =>
            activeMenu.type == 'all'
              ? true
              : i.memoCategory.name == activeMenu.type
          )
          .map(i => (
            <MemoItem data={i} edit={true} key={i.id} />
          ))}
      </MainContainer>
    </Container>
  );
};
export default MemoContainer;

const Container = styled(CC.ColumnStartDiv)`
  height: max-content;
  margin-bottom: 12px;
`;

const MemoMenuNavListContainer = styled(CC.RowDiv)`
  gap: 4px;
  padding: 10px 4px;
  flex-flow: wrap row;
  background: ${props => props.theme.main.contrast};
  border-radius: 4px;
  outline: solid black 1px;
  height: 48px;
  & > button {
    min-width: 70px;
    border-radius: ${props => props.theme.borderRadius.br10};
    font-family: ${props => props.theme.fontFamily.yanoljaYacheBold};
  }
`;

const MainContainer = styled.div`
  display: grid;
  gap: 8px;
  outline: solid black 1px;
  border-radius: 4px;
  padding: 8px 8px 16px 8px;
  background: ${props => props.theme.colors.gray20};
  height: max-content;
  min-height: 300px;

  @media (min-width: ${props => props.theme.deviceSizes.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${props => props.theme.deviceSizes.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${props => props.theme.deviceSizes.pc}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

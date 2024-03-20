import { MemoAPI } from '@api/MemoAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { SET_MEMO_LIST } from '@redux/store/memo';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Textarea from '../common/textarea/Textarea';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MemoItem.tsx
 * @version 0.0.1 "2023-10-02 16:50:32"
 * @description 설명
 */

interface IMemoItemProps {
  data?: {
    id: number;
    content: string;
    memoCategory: {
      id: number;
      name: string;
      backgroundColor: string;
      userId: number;
    };
  };
  edit?: boolean;
  deleteMemoHandler?: () => void;
  category?: {
    type: string;
    categoryId: number;
  };
  key?: string;
}

const MemoItem = (props: IMemoItemProps) => {
  const memoStore = useSelector((state: RootState) => state.memoStore);
  const memoContentRef = useRef<null>();

  const addMemoHandler = () => {
    MemoAPI.addMemo({
      content: memoContentRef.current.value,
      memoCategoryId: Number(props.category.categoryId),
    }).then((res: any) => {
      let temp = [...memoStore.memoList];
      temp.unshift({
        id: res.json.id,
        content: res.json.content,
        memoCategory: {
          id: Number(res.json.memoCategory.id),
          name: res.json.memoCategory.name,
          backgroundColor: res.json.memoCategory.backgroundColor,
        },
      });
      store.dispatch(SET_MEMO_LIST(temp));
      memoContentRef.current.value = '';
    });
  };

  const updateMemoHandler = () => {
    MemoAPI.updateMemo({
      id: props.data.id,
      content: memoContentRef.current.value,
    }).then((res: any) => {
      let temp = memoStore.memoList.map((i) => {
        if (i.id == props.data.id) {
          return {
            id: res.json.id,
            content: res.json.content,
            memoCategory: {
              id: Number(res.json.memoCategory.id),
              name: res.json.memoCategory.name,
              backgroundColor: res.json.memoCategory.backgroundColor,
              userId: res.json.memoCategory.userId,
            },
          };
        }
        return i;
      });
      store.dispatch(SET_MEMO_LIST(temp));
    });
  };

  const deleteMemoHandler = () => {
    MemoAPI.deleteMemo({
      id: props.data.id,
    })
      .then((_) => {
        let temp = memoStore.memoList.filter((i) => props.data.id != i.id);
        store.dispatch(SET_MEMO_LIST([...temp]));
      })
      .catch((_) => {});
  };

  return (
    <Container bg={props.data?.memoCategory.backgroundColor} key={props.key}>
      <Header>
        <CC.RowCenterDiv>
          {props.data?.memoCategory.name || '메모 작성'}{' '}
        </CC.RowCenterDiv>
        {props.data && (
          <ConfirmButton
            className={'delete-icon'}
            onClick={() => deleteMemoHandler()}
            bg={'transparent'}
            hover={false}
          >
            <Image src={Icons.ExitIcon} weight={20} height={20} alt="" />
          </ConfirmButton>
        )}
      </Header>
      <Textarea
        ref={memoContentRef}
        defaultValue={props.data?.content}
        submit={() => (props.edit ? updateMemoHandler() : addMemoHandler())}
        resizeMode={true}
        placeholder="메모를 작성해주세요"
      />
    </Container>
  );
};
export default MemoItem;

const Container = styled.div<{ bg: string }>`
  min-height: 20rem;
  height: max-content;
  word-wrap: break-word;
  word-break: break-all;
  background: ${(props) =>
    props.theme.colors?.[props.bg] || props.theme.colors.white80};
  border-radius: 1rem;
  padding: 0.4rem 0.8rem;
  outline: solid black 0.1rem;

  textarea {
    min-height: 18rem;
    margin-top: 0.4rem;
    /* background: transparent; */
    background: ${(props) => props.theme.colors.white80};
    border: none;
    appearance: none;
    resize: none;
    padding: 0.4rem 0.4rem 4rem 0.4rem;
    outline: solid black 0.1rem;
  }
`;
const Header = styled(CC.RowRightDiv)`
  width: 100%;
  position: relative;
  height: 2.4rem;
  .deleteIcon {
    position: absolute;
    cursor: pointer;
    z-index: 10;
    background: transparent;
  }
`;

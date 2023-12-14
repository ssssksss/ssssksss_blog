import styled from '@emotion/styled';
import Button from '../common/button/Button';
import ModalButton from '../common/button/ModalButton';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import BlogSecondaryCategoryModal from '../common/modal/BlogSecondaryCategoryModal';
import { CC } from '@/styles/commonComponentStyle';
import { useEffect, useState } from 'react';
import useLoading from '@/src/hooks/useLoading';
import { Spinner1 } from '../spinner/Spinners';
import { BlogAPI } from '@/api/BlogAPI';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { store } from '@/redux/store';
import { SET_BlOG_LIST } from '@/redux/store/blog';
import {
  SET_FIRST_CATEGORY_ID,
  SET_FIRST_CATEGORY_PATH,
  SET_SECOND_CATEGORY_ID,
  SET_SECOND_CATEGORY_ID_AND_NAME,
  SET_SECOND_CATEGORY_LIST,
} from '@/redux/store/blog';
import UrlQueryStringToObject from '@/utils/fucntion/UrlQueryStringToObject';
import { SET_BLOG_POST_LIST } from '@/redux/store/blog';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSecondCategoryContainer.tsx
 * @version 0.0.1 "2023-10-20 04:02:43"
 * @description 설명
 */

const BlogSecondCategoryContainer = () => {
  const [isLoading, loadingFunction] = useLoading();
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeSecondCategory, setActiveSecondCategory] = useState('');
  const authStore = useSelector((state: RootState) => state.authStore);
  const blogStore = useSelector((state: RootState) => state.blogStore);

  const secondCategoryListUpdateHandler = (data: Object[]) => {
    store.dispatch(SET_SECOND_CATEGORY_LIST([...data]));
  };

  const activeSecondCategoryHandler = (id: string, name: string) => {
    if (activeSecondCategory === id) return;
    setActiveSecondCategory(id);
    store.dispatch(
      SET_SECOND_CATEGORY_ID_AND_NAME({
        secondCategoryId: id,
        secondCategoryName: name,
      })
    );
    // 상태값이 변경되어 shallow router의 의미가 없음
    router.replace(
      `/blog?first-category=${blogStore.firstCategoryId}&second-category=${id}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  useEffect(() => {
    // 새로 고침시 막는 역할
    if (!blogStore.firstCategoryId) return;
    loadingFunction(
      BlogAPI.getSecondCategory({
        firstCategoryId: blogStore.firstCategoryId,
      })
    )
      .then(res => {
        const secondCategoryId = UrlQueryStringToObject(window.location.href)?.[
          'second-category'
        ];
        let _activeSecondCategoryId =
          secondCategoryId || res.data?.blogSecondCategoryList[0]?.id;
        let _secondCategoryName;
        store.dispatch(
          SET_SECOND_CATEGORY_LIST([...res.data?.blogSecondCategoryList])
        );
        setActiveSecondCategory(_activeSecondCategoryId);
        res.data?.blogSecondCategoryList
          .filter(i => i.id == _activeSecondCategoryId)
          .map(i => {
            _secondCategoryName = i.name;
          });
        if (res.data?.blogSecondCategoryList.length == 0) {
          store.dispatch(SET_BLOG_POST_LIST([]));
        }
        store.dispatch(
          SET_SECOND_CATEGORY_ID_AND_NAME({
            secondCategoryId: _activeSecondCategoryId,
            secondCategoryName: _secondCategoryName,
          })
        );
        router.replace(
          `/blog?first-category=${blogStore.firstCategoryId}&second-category=${
            secondCategoryId || res.data?.blogSecondCategoryList[0]?.id
          }`,
          undefined,
          {
            shallow: true,
          }
        );
      })
      .catch(err => {
        console.log('BlogSecondCategoryContainer.tsx11 파일 : ', err);
      });
  }, [blogStore.firstCategoryId]);

  return (
    <Container>
      {isLoading ? (
        <Spinner1 />
      ) : (
        blogStore.secondCategoryList?.map(i => (
          <Button
            key={i.id}
            bg={'secondary80'}
            onClick={() => activeSecondCategoryHandler(i.id, i.name)}
            active={String(i.id) === String(activeSecondCategory)}
          >
            {i.name}
          </Button>
        ))
      )}
      {authStore.id &&
        authStore.id == blogStore.firstCategoryList[0]?.userId && (
          <ModalButton
            color={'secondary80'}
            outline={true}
            modal={
              <BlogSecondaryCategoryModal
                secondCategoryListUpdateHandler={
                  secondCategoryListUpdateHandler
                }
                firstCategoryName={blogStore.firstCategoryName}
                firstCategoryId={blogStore.firstCategoryId}
              />
            }
            overlayVisible={true}
          >
            <span style={{ fontSize: '28px' }}>
              <Image src={Icons.SettingIcon} alt="" width={16} height={16} />
            </span>
          </ModalButton>
        )}
    </Container>
  );
};
export default BlogSecondCategoryContainer;

const Container = styled(CC.RowDiv)`
  gap: 4px;
  padding: 10px 4px;
  flex-wrap: wrap;

  & > button {
    padding: 0px 10px;
    height: 28px;
    border-radius: ${props => props.theme.borderRadius.br10};
    font-family: ${props => props.theme.fontFamily.yanoljaYacheBold};
    color: ${props => props.theme.main.contrast};
  }
`;

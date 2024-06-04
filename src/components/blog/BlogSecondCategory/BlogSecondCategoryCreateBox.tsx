
import { BlogAPI, createSecondCategoryAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import { BlogSecondCategoryCreateYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSecondCategoryCreateBox.tsx
 * @version 0.0.1 "2024-01-08 17:34:45"
 * @description 설명
 */

interface IBlogSecondCategoryCreateBoxProps {
  closeModal: () => void;
}

const BlogSecondCategoryCreateBox = (
  props: IBlogSecondCategoryCreateBoxProps,
) => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const createSecondCategoryMutation = BlogAPI.createSecondCategory({
    onSuccessHandler: () => props.closeModal(),
  });
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(BlogSecondCategoryCreateYup),
    mode: 'onChange',
    defaultValues: {
      createSecondCategoryName: '',
      createSecondCategoryImageFile: '',
    },
  });
  const { errors } = formState;

  const createSecondCategoryHandler = async (data: {
    createSecondCategoryName: string,
    createSecondCategoryImageFile: File,
  }) => {
    // const file = data.createSecondCategoryImageFile;
    // createSecondCategoryMutation({
    //   name: data.createSecondCategoryName,
    //   blogFirstCategoryId: blogStore.activeFirstCategoryId,
    //   files: file,
    //   // 백엔드에서 이후에 2번째 카테고리 Id를 추가하여 이미지 경로를 설정
    //   directory: `/blog-category/${blogStore.activeFirstCategoryId}`,
    // });

        // const formData = new FormData();
        // formData.append('name', reqData.name);
        // formData.append('blogFirstCategoryId', reqData.blogFirstCategoryId);
        // formData.append('files', reqData.files);
        // formData.append('directory', reqData.directory);
        // return await AxiosInstance({
        //   url: '/api/blog/second/category',
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     'Access-Control-Allow-Origin': '*',
        //   },
        //   data: formData,
        //   withCredentials: true,
    // });

    createSecondCategoryAPI(
      data.createSecondCategoryName,
      blogStore.activeFirstCategoryId,
      data.createSecondCategoryImageFile,
    ).then((res) => {
      console.log("BlogSecondCategoryCreateBox.tsx 파일 : ",res);
      const temp = JSON.parse(
        JSON.stringify(store.getState().blogStore.blogCategoryList),
      );
      console.log("BlogSecondCategoryCreateBox.tsx 파일 : ",temp);
      props.closeModal();
    });
  };

  return (
    <Container outline={1} w={'100%'}>
      <Header>
        <span>블로그 2번째 카테고리 추가 </span>
      </Header>
      <Input
        value={blogStore.firstCategoryList[blogStore.activeFirstCategoryId]}
        disabled={true}
        center={true}
        color={"black100"}
      />
      <Input
        placeholder="2번째 카테고리 이름"
        register={register('createSecondCategoryName')}
        onKeyPressAction={handleSubmit(createSecondCategoryHandler)}
        errorMessage={errors.createSecondCategoryName?.message}
        bg={1}
        h={'2.25rem'}
        pd={"0 0 0 0.5rem"}
      />
      <Input
        type={'file'}
        register={register('createSecondCategoryImageFile')}
        setValue={setValue}
        h={'20rem'}
      />
      <Button
        w={'100%'}
        onClickCapture={handleSubmit(createSecondCategoryHandler)}
        disabled={!formState.isValid}
      >
        추가
      </Button>
    </Container>
  );
};
export default memo(BlogSecondCategoryCreateBox);

const Container = styled(CC.ColBox)`
  gap: 2rem;
  padding: 0.5rem;
  & > button:nth-of-type(1) {
    align-items: end;
  }
  background: ${(props) => props.theme.main.primary20};
`;


const Header = styled.header`
  ${(props) => props.theme.flex.column};
  align-self: stretch;
  color: black;
  border-radius: 0.5rem;

  span:nth-of-type(1) {
    font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
    font-size: 2rem;
  }
`;

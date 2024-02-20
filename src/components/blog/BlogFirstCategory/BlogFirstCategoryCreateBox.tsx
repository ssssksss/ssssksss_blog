import { BlogAPI } from '@/api/BlogAPI';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { BlogFirstCategoryCreateYup } from '@/components/yup/BlogCategoryYup';
import { useLoading } from '@/hooks/useLoading';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryCreateBox.tsx
 * @version 0.0.1 "2024-01-06 03:41:05"
 * @description 설명
 */
const BlogFirstCategoryCreateBox = () => {
  const [isLoading, loadingFunction] = useLoading();
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(BlogFirstCategoryCreateYup),
    mode: 'onChange',
    defaultValues: {
      createFirstCategoryName: '',
    },
  });
  const { errors } = formState;
  const createBlogFirstCategoryMutation = BlogAPI.createBlogFirstCategory();

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  const createFirstCategoryHandler = (data: any) => {
    const { ...params } = data;

    createBlogFirstCategoryMutation({
      name: params.createFirstCategoryName,
    });
  };
  return (
    <Container gap={28} pd={'8px'} color={'contrast'} brR={'10px'}>
      <Header>
        <span>블로그 1번째 카테고리 추가 </span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Input
          placeholder="이름"
          styleTypes={1}
          register={register('createFirstCategoryName')}
          onKeyPressAction={handleSubmit(
            createFirstCategoryHandler,
            onClickErrorSubmit
          )}
          errorMessage={errors.createFirstCategoryName?.message}
        />
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        <Button
          w={'100%'}
          h={'40px'}
          outline={true}
          onClickCapture={handleSubmit(
            createFirstCategoryHandler,
            onClickErrorSubmit
          )}
          disabled={!formState.isValid}
          bg={'contrast'}
        >
          추가
        </Button>
      </CC.ColumnDiv>
    </Container>
  );
};
export default BlogFirstCategoryCreateBox;

const Container = styled(CC.ColumnDiv)`
  outline: solid ${props => props.theme.main.contrast} 4px;

  & > button:nth-of-type(1) {
    align-items: end;
  }
`;

const Header = styled.header`
  ${props => props.theme.flex.column};
  padding: 16px;
  gap: 0.25rem;
  align-self: stretch;
  border-radius: ${props => props.theme.borderRadius.br10};

  span:nth-of-type(1) {
    font-family: ${props => props.theme.fontFamily.cookieRunRegular};
    font-size: 20px;
  }
`;

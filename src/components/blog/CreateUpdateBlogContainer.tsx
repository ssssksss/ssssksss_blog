import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import Input from '@components/common/input/Input';
import LoadingComponent from '@components/common/loading/LoadingComponent';
import Select from '@components/common/select/Select';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import { CC } from '@styles/commonComponentStyle';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { AWSS3Prefix } from '@utils/variables/url';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import 'tui-color-picker/dist/tui-color-picker.css';
import { BlogCreateYup, BlogUpdateYup } from '../yup/BlogCategoryYup';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateUpdateBlogContainer.tsx
 * @version 0.0.1 "2023-10-14 00:59:02"
 * @description 설명
 */

interface IEditCreateUpdateBlogContainerProps {
  edit?: boolean;
  commentNumber: number;
  blogFirstCategoryName: string;
  blogSecondCategoryName: string;
  description: string;
  viewNumber: number;
  title: string;
  blogContentId: number;
  firstCategoryId: number;
  userId: number;
  content: string;
  createdAt: string;
  thumbnailImageUrl: string;
  id: number;
  secondCategoryId: number;
  likeNumber: number;
}

const CreateUpdateBlogContainer = (
  props: IEditCreateUpdateBlogContainerProps,
) => {
  const [isLoading, setIsLoading] = useReducer((prev) => !prev, false);
  const [isHideContainer, hideContainerToggle] = useReducer(
    (v) => !v,
    props.edit ? true : false,
  );
  const router = useRouter();
  const createBlogMutation = BlogAPI.createBlog({
    onSuccessHandler: () => {
      setIsLoading(false);
    },
  });
  const updateBlogMutation = BlogAPI.updateBlog({
    onSuccessHandler: () => {
      setIsLoading(false);
    },
  });
  const editorRef = useRef<Editor>(null);
  const [defaultImageUrl, setDefaultImageUrl] = useState();
  const [blogContentImageList, setBlogContentImageList] = useState([]);
  const [tempBlogImage, setTempBlogImage] = useState([]);
  const [categoryList, setCategoryList] = useState({
    firstCategoryList: {},
    secondCategoryList: {},
  });
  const methods = useForm({
    resolver: yupResolver(props.edit ? BlogUpdateYup : BlogCreateYup),
    mode: 'onChange',
    defaultValues: {
      selectFirstCategoryId: undefined,
      selectFirstCategoryName: undefined,
      selectSecondCategoryId: undefined,
      selectSecondCategoryName: undefined,
      title: '',
      description: '',
      thumbnailImageFile: '',
      content: '# \n ##  \n',
    },
  });

  const blogCategoryListResData = BlogAPI.getBlogCategoryList({
    onSuccessHandler: (data) => {
      setCategoryList({
        firstCategoryList: data.json.firstCategoryList,
        secondCategoryList: data.json.secondCategoryList,
      });
      methods.setValue('selectFirstCategoryId', props.firstCategoryId);
      methods.setValue('selectSecondCategoryId', props.secondCategoryId);
      methods.setValue('selectFirstCategoryName', props.blogFirstCategoryName);
      methods.setValue(
        'selectSecondCategoryName',
        props.blogSecondCategoryName,
        { shouldValidate: true },
      );
      methods.setValue('title', props.title);
      methods.setValue('description', props.description);
      methods.setValue('content', props.content);
      const viewerInstance = editorRef.current?.getInstance();
      viewerInstance?.setMarkdown(props.content);
      setDefaultImageUrl(props.thumbnailImageUrl);

      setTimeout(() => {
        // ! 나중에 이미지들을 삭제하기위해 현재 블로그에 있는 이미지들의 경로를 수집
        let _blogContentImageList = [];
        let index2 = 0;
        const _TRUE = true;
        if (!props.edit) return;
        while (_TRUE) {
          let index1 = props.content.indexOf(AWSS3Prefix, index2);
          if (index1 === -1) break;
          index2 = props.content.indexOf('.', index1 + AWSS3Prefix.length);
          _blogContentImageList.push(
            props.content.substring(index1 + AWSS3Prefix.length, index2 + 4),
          );
        }
        setBlogContentImageList(_blogContentImageList);
      }, 1000);
    },
  });
  const submitHandler = async () => {
    setIsLoading(true);
    // store.dispatch(setIsLoading(true));
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    let imageUrlList = [];
    let imageFileList = [];
    let deleteImageBucketDirectory = []; // edit에서 삭제에 필요한 이미지 s3 버킷 경로 수집

    // ObjectURL로 작업을 해서 실제 이미지로 저장하기 위해서 이미지들의 경로를 모으는 중이다.
    // TODO 똑같은 경로의 이미지들은 어떻게 처리를 해야할지 고민.... (나중에 테스트 해보기)
    tempBlogImage.map((i) => {
      if (getContent_md.search(i.url) != -1) {
        imageUrlList.push(i.url);
        imageFileList.push(i.file);
      }
    });

    if (props.edit) {
      blogContentImageList?.map((i) => {
        if (getContent_md.search(i) === -1) {
          deleteImageBucketDirectory.push(i);
        }
      });
    }

    if (props.edit) {
      updateBlogMutation({
        id: router.query.id,
        title: methods.getValues('title'),
        description: methods.getValues('description'),
        content: getContent_md,
        firstCategoryId: methods.getValues('selectFirstCategoryId'),
        secondCategoryId: methods.getValues('selectSecondCategoryId'),
        thumbnailImageFile: methods.getValues('thumbnailImageFile'),
        directory: `/blog-category/${methods.getValues('selectFirstCategoryId')}/${methods.getValues('selectSecondCategoryId')}`,
        imageUrlList: imageUrlList,
        imageFileList: imageFileList,
        deleteImageBucketDirectory: deleteImageBucketDirectory,
      });
    }

    if (!props.edit) {
      createBlogMutation({
        title: methods.getValues('title'),
        description: methods.getValues('description'),
        content: getContent_md,
        firstCategoryId: methods.getValues('selectFirstCategoryId'),
        secondCategoryId: methods.getValues('selectSecondCategoryId'),
        thumbnailImageFile: methods.getValues('thumbnailImageFile'),
        directory: `/blog-category/${methods.getValues('selectFirstCategoryId')}/${methods.getValues('selectSecondCategoryId')}`,
        imageUrlList: imageUrlList,
        imageFileList: imageFileList,
      });
    }
  };

  const uploadHandler = async (file: any) => {
    const url = URL.createObjectURL(file).substring(5);
    setTempBlogImage((prev) => [...prev, { url, file }]);
    return url;
  };

  const onChangeFirstCategoryHandler = async (props: {
    value: string;
    name: string;
    bg: string;
  }) => {
    methods.setValue('selectFirstCategoryId', props.value);
    methods.setValue('selectFirstCategoryName', props.name);
    methods.setValue(
      'selectSecondCategoryName',
      Object.values(
        blogCategoryListResData?.data.json?.secondCategoryList[props.value],
      )[0].name,
      { shouldValidate: true },
    );
    methods.setValue(
      'selectSecondCategoryId',
      Object.keys(
        blogCategoryListResData?.data.json?.secondCategoryList[props.value],
      )[0],
    );
    setDefaultImageUrl(
      Object.values(
        blogCategoryListResData?.data.json?.secondCategoryList[props.value],
      )[0]?.thumbnailImageUrl,
    );
  };

  const onChangeSecondCategoryHandler = async (props: {
    value: string;
    name: string;
    bg: string;
  }) => {
    categoryList.secondCategoryList[props.value];

    methods.setValue('selectSecondCategoryId', props.value);
    methods.setValue('selectSecondCategoryName', props.name, {
      shouldValidate: true,
    });
    setDefaultImageUrl(
      categoryList.secondCategoryList[
        methods.getValues('selectFirstCategoryId')
      ][props.value].thumbnailImageUrl,
    );
  };

  useEffect(async () => {
    // ctrl + space를 누르면 bing이 나온다. 사용하기전에 브라우저에 가서 설정을 해주어야 한다.
    let keyDownEventFunc = (e: Event) => {
      if (e.key === 'Escape') {
        hideContainerToggle();
      }
    };

    setTimeout(() => {
      document.querySelectorAll('pre')?.forEach((i) => {
        let test = document.createElement('button');
        test.style.position = 'absolute';
        test.style.right = '4px';
        test.style.top = '4px';
        test.style.width = '24px';
        test.style.height = '24px';
        test.addEventListener('click', () => {
          navigator.clipboard.writeText(i.childNodes[0].textContent);
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: 'success',
              message: `복사되었습니다.`,
            }),
          );
        });
        i.appendChild(test);
      });
    }, 1000);

    window.addEventListener('keydown', keyDownEventFunc);

    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        {(store.getState().authStore.role === 'ROLE_ADMIN' ||
          store.getState().authStore.id ===
            store.getState().blogStore.activeBlogUserId) && (
          <>
            {isLoading && <LoadingComponent />}
            <Container isLoading={isLoading} icon={Icons.PlayIcon}>
              <HeaderContainer gap={8}>
                <Button
                  id={'hideBlogHeaderButton'}
                  w={'100%'}
                  bg={'primary40'}
                  onClick={() => hideContainerToggle()}
                >
                  {isHideContainer ? (
                    <Image src={Icons.DownArrowIcon} />
                  ) : (
                    <Image src={Icons.UpArrowIcon} />
                  )}
                </Button>
                <HideContainer isHide={isHideContainer}>
                  <CC.RowBetweenDiv gap={8}>
                    <Select
                      w={'100%'}
                      placeholder={'1번째 카테고리'}
                      onChange={onChangeFirstCategoryHandler}
                      defaultValue={{
                        value: methods.getValues('selectFirstCategoryId'),
                        name: methods.getValues('selectFirstCategoryName'),
                      }}
                      data={Object.entries(categoryList.firstCategoryList)?.map(
                        ([key, value]) => ({
                          value: key,
                          name: value,
                        }),
                      )}
                    ></Select>
                    <Select
                      w={'100%'}
                      placeholder={'2번째 카테고리'}
                      onChange={onChangeSecondCategoryHandler}
                      defaultValue={{
                        value: methods.getValues('selectSecondCategoryId'),
                        name: methods.getValues('selectSecondCategoryName'),
                      }}
                      data={
                        (categoryList.secondCategoryList[
                          methods.getValues('selectFirstCategoryId') ||
                            props.secondCategoryId
                        ] &&
                          Object.entries(
                            categoryList.secondCategoryList[
                              methods.getValues('selectFirstCategoryId') ||
                                props.secondCategoryId
                            ],
                          )?.map(([key, value]) => ({
                            value: key,
                            name: value.name,
                          }))) || { value: '', name: '' }
                      }
                    ></Select>
                  </CC.RowBetweenDiv>
                  <Title
                    placeholder="제목을 입력해주세요"
                    initialValue={methods.getValues('title')}
                    register={methods.register('title')}
                  />
                  <Description
                    placeholder="간단한 설명을 입력해주세요"
                    initialValue={methods.getValues('description')}
                    register={methods.register('description')}
                  />
                  <CC.ColumnCenterDiv gap={4} pd={'4px 0px'}>
                    <CC.RowCenterDiv>
                      <b> 썸네일 이미지 </b>
                    </CC.RowCenterDiv>
                    <Input
                      type="file"
                      id="imageUpload"
                      h={'200px'}
                      // ref={fileRef}
                      bg={'contrast'}
                      outline={'black80'}
                      register={methods.register('thumbnailImageFile')}
                      setValue={methods.setValue}
                      trigger={methods.trigger}
                      defaultImageUrl={defaultImageUrl}
                    />
                  </CC.ColumnCenterDiv>
                </HideContainer>
              </HeaderContainer>
              <EditorContainer>
                <Editor
                  autofocus={props.edit}
                  initialValue={methods.getValues('content')}
                  previewStyle="vertical"
                  height="calc(100vh - 182px)"
                  initialEditType="markdown"
                  useCommandShortcut={true}
                  ref={editorRef}
                  plugins={[
                    colorSyntax,
                    [codeSyntaxHighlight, { highlighter: Prism }],
                  ]}
                  onChange={() => {
                    let toastUIPreviewBlobImages =
                      window.document.querySelectorAll(
                        "img[src^='" + window.location.origin + "']",
                      );
                    toastUIPreviewBlobImages.forEach((i) => {
                      i.setAttribute('src', 'blob:' + i.src);
                    });
                    const editorInstance = editorRef.current?.getInstance();
                    const getContent_md = editorInstance?.getMarkdown();
                    methods.setValue('content', getContent_md, {
                      shouldValidate: true,
                    });
                  }}
                  hooks={{
                    addImageBlobHook: async (blob, callback) => {
                      const imageURL: any = await uploadHandler(blob);
                      await callback(imageURL, '');
                      // "blog"+directory+"/"+fileName
                    },
                  }}
                  viewer={true}
                  // language="ko-KR"
                  toolbarItems={[
                    // 툴바 옵션 설정
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                    ['table', 'image', 'link'],
                    ['code', 'codeblock'],
                  ]}
                />
              </EditorContainer>
              <EditorFooter>
                <Button
                  w={'100%'}
                  outline={true}
                  onClick={() => submitHandler()}
                  disabled={!methods.formState.isValid}
                >
                  {props.edit ? '수정' : '제출'}
                </Button>
                <Button w={'100%'} outline={true} onClick={() => router.back()}>
                  취소
                </Button>
              </EditorFooter>
              <BlogItemContentFormContainer>
                {/* <ModalButton
                  color={'primary80'}
                  outline={true}
                  modal={
                    <BlogContentTemplateModal
                      firstCategoryId={methods.getValues(
                        'selectFirstCategoryId',
                      )}
                      secondCategoryId={methods.getValues(
                        'selectSecondCategoryId',
                      )}
                    />
                  }
                  modalOverlayVisible={true}
                  modalW={'80%'}
                  bg={'contrast'}
                >
                  <Image src={Icons.SettingIcon} alt="" />
                </ModalButton>
                {store
                  .getState()
                  .blogContentTemplateStore?.blogContentTemplateList?.map(
                    (i, index) => (
                      <BlogItemContentFormButton
                        key={index}
                        onClick={() => {
                          navigator.clipboard.writeText(i.content);
                          store.dispatch(
                            SET_TOASTIFY_MESSAGE({
                              type: 'success',
                              message: `복사되었습니다.`,
                            }),
                          );
                        }}
                      >
                        {index}
                      </BlogItemContentFormButton>
                    ),
                  )} */}
                <BlogItemContentFormButton
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `| 속성 | 사용 | \n | --- | --- | \n |  |  | \n |  |  | \n |  |  | \n |  |  |`,
                    );
                  }}
                >
                  테1
                </BlogItemContentFormButton>
                <BlogItemContentFormButton
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `| 속성 | 사용 | 설명  | \n | --- | --- | --- | \n |  |  |  | \n |  |  |  | \n |  |  |  | \n |  |  |  |`,
                    );
                  }}
                >
                  테2
                </BlogItemContentFormButton>
                <BlogItemContentFormButton
                  onClick={() => {
                    const dragText = window.getSelection();
                    navigator.clipboard.readText().then((res) => {
                      navigator.clipboard.writeText(
                        '<a href="' +
                          res +
                          '" target="_blank"> ' +
                          (dragText?.isCollapsed ? res : dragText) +
                          ' </a>',
                      );
                      dragText.getRangeAt(0).deleteContents();
                    });
                    store.dispatch(
                      rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
                        type: 'success',
                        message: '링크로 복사되었습니다.',
                      }),
                    );
                  }}
                >
                  링크
                </BlogItemContentFormButton>
              </BlogItemContentFormContainer>
            </Container>
          </>
        )}
      </FormProvider>
    </>
  );
};
export default CreateUpdateBlogContainer;

const Container = styled(CC.ColumnDiv.withComponent('section'))<{
  isLoading: boolean;
  icon: string;
}>`
  position: relative;
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;
  background-color: white;
  border-radius: 0px 0px 10px 10px;
  padding: 4px 16px;
  gap: 4px;

  visibility: ${(props) => props.isLoading && 'hidden'};

  .toastui-editor-toolbar {
    position: sticky;
    top: 30px;
    z-index: 1;
  }
  .toastui-editor-main {
    border-top: solid transparent 4px;
    padding-top: 4px;
    height: 100%;
    font-size: 16px;

    h1[data-nodeid] {
      border: none;
      width: 100%;
      background: ${(props) => props.theme.colors.red20 + '33'};
      font-size: ${(props) => props.theme.calcRem(28)};
      border-radius: 8px;
      padding: 4px 0px;
    }
    h1[data-nodeid]::before {
      counter-increment: section;
      content: '📌 [' counter(section) '] ';
    }
    h2[data-nodeid] {
      border: none;
      width: 100%;
      background: ${(props) => props.theme.colors.orange20 + '33'};
      font-size: ${(props) => props.theme.calcRem(24)};
      border-radius: 8px;
      padding: 2px 0px;
    }
    h2[data-nodeid]::before {
      content: '🚩 ';
    }
    h3[data-nodeid] {
      border: none;
      width: 100%;
      background: ${(props) => props.theme.colors.orange20 + '33'};
      font-size: ${(props) => props.theme.calcRem(20)};
      border-radius: 8px;
    }
    h3[data-nodeid]::before {
      content: '🔶 ';
    }
    h4[data-nodeid]::before {
      content: '🔸 ';
    }
    pre {
      outline: solid ${(props) => props.theme.main.primary80} 1px;
      border-radius: 10px;
      position: relative;
      box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.25);
      font-size: ${(props) => props.theme.calcRem(12)};
      background: ${(props) => props.theme.colors.gray20};

      & > button {
        display: none;
        content: '';
        background-image: ${(props) =>
          props.icon && `url('/img/ui-icon/ic-board.svg')`};
        background-size: 20px;
        background-repeat: no-repeat;
        background-position-x: 50%;
        background-position-y: 50%;
        aspect-ratio: 1;
        position: absolute;
        width: max-content;
        top: 0px;

        aspect-ratio: 1;
        padding: 0px;
        border: none;
      }
      &:hover > button {
        display: flex;
      }
    }
    }

    th {
      outline: solid black 1px;
      background: ${(props) => props.theme.main.primary60};
    }
    td {
      outline: solid black 1px;
      padding: 2px 4px;
    }
    hr {
      height: 12px;
      background: ${(props) => props.theme.main.secondary80};
    }

    p > img {
      margin: auto;
      display: block;
    }
  }
  .toastui-editor-defaultUI {
    margin-top: 42px;
    height: calc(100%);
  }
  select {
    z-index: 5;
  }

  &::before {
    content: '';
    background-size: 50%;
    background-image: url('/img/backgroundImage/원피스.jpg');
    background-repeat: repeat-x;
    background-position: right bottom;
    opacity: 0.2;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: calc(80px + 44px);
  }
`;

const HeaderContainer = styled(CC.ColumnDiv)`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 8px);
  height: max-content;
  z-index: 6;
  background: ${(props) => props.theme.colors.gray80};
  outline: solid black 1px;
  border-radius: 10px;
  padding: 4px;
  margin: 4px 0px 0px 4px;
  & > div {
    gap: 8px;
  }
`;

const HideContainer = styled(CC.ColumnDiv)<{ isHide: boolean }>`
  visibility: ${(props) => (props.isHide ? 'hidden' : 'visible')};
  height: ${(props) => (props.isHide ? '0px' : '100%')};
  z-index: 3;

  select {
    outline: solid black 1px;
  }

  input::placeholder {
    transition: all 0s ease-in-out;
  }
`;

const Title = styled(Input)`
  --font-size: 1.6rem;
  width: 100%;
  height: 40px;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  color: ${(props) => props.theme.colors.black80};
  padding: 0px 10px;
  z-index: 3;
  border: none;
  font-size: var(--font-size);
  border-bottom: 2px solid ${(props) => props.theme.colors.black40};
  border-radius: 10px;
  outline: solid black 1px;

  &::placeholder {
    font-size: var(--font-size);
    color: ${(props) => props.theme.colors.black40};
  }

  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
    }
  }
`;

const EditorContainer = styled.div`
  padding-top: 48px;
`;
const EditorFooter = styled(CC.GridColumn2)`
  gap: 10px;
  position: sticky;
  padding: 4px 4px;
  bottom: 8px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.5);
`;

const BlogItemContentFormContainer = styled.section`
  right: 0px;
  top: 300px;
  ${(props) => props.theme.scroll.hidden}
  position: fixed;
  display: flex;
  flex-flow: nowrap column;
  padding: 4px;
  background: #eaeaea;
  gap: 2px;
  z-index: 4;
`;

const BlogItemContentFormButton = styled.button`
  padding: 2px;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 2px,
    rgba(0, 0, 0, 0.3) 0px 7px 6px -3px;
  border-radius: 4px;
`;

const Description = styled(Input)`
  --font-size: 1.4rem;
  width: 100%;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  font-size: var(--font-size);
  color: ${(props) => props.theme.colors.black60};
  padding: 0px 10px;
  border: none;
  border-radius: 0px;
  z-index: 2;
  border-radius: 10px;
  outline: solid black 1px;

  &::placeholder {
    font-size: var(--font-size);
    color: ${(props) => props.theme.colors.black40};
  }

  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 1rem;
    &::placeholder {
      font-size: 1rem;
    
`;

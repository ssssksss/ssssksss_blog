import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { colorTypes } from '@styles/theme';
import { AWSS3Prefix } from '@utils/variables/url';
import Image from 'next/image';
import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useState
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Icons } from '../icons/Icons';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Input.tsx
 * @version 0.0.1 "2022-06-17 02:19:41"
 * @description 커스텀 Input 컴포넌트
 * @description react-hook-form 이미지
 * <Input
 *   type={'file'}
 *   register={register('레지스터명')}
 * />
 * @description react-hook-form 텍스트
 */

interface IInputProps {
  outline?: boolean | number;
  outlineColor?: colorTypes;
  placeholder?: string;
  register?: UseFormRegisterReturn<string>;
  initialValue?: string;
  setValue?: unknown;
  field?: unknown;
  disabled?: boolean;
  defaultValue?: string;
  checked?: boolean;
  color?: string;
  placeholderColor?: string;
  value?: string | number | boolean;
  name?: string;
  id?: string;
  display?: string;
  errorMessage?: string;
  size?: 'sm' | 'md';
  pd?: string;
  leftIconImage?: string;
  w?: string;
  h?: string;
  brR?: string;
  state?: number;
  bg?: colorTypes | number;
  errorLocation?: string;
  defaultImageUrl?: string;
  center?: boolean;
  onClick?: (_e: MouseEvent) => void;
  onFocus?: (_e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (_e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (_e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPressAction?: (_e: KeyboardEvent) => void;
  removeImageFile?: () => void;
  type?:
    | 'password'
    | 'text'
    | 'radio'
    | 'checkbox'
    | 'email'
    | 'search'
    | 'file'
    | 'range'
    | 'color';
}

const Input = (props: IInputProps, ref: React.MutableRefObject<HTMLInputElement>) => {
  const [imageUrl, setImageUrl] = useState('/');
  const [, setIsDragging] = useState(false);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files?.[0];
    e.preventDefault();
    e.stopPropagation();
    if (!file) {
      alert('파일이 없습니다!');
      return;
    }
    const result = URL.createObjectURL(file);
    setImageUrl(result);
    setIsDragging(false);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (!file) {
      alert('파일이 없습니다!');
      return;
    }
    const result = URL.createObjectURL(file);
    setImageUrl(result);
  };

  useEffect(() => {
    // 만일 props로 초기에 이미지가 존재한다면 이미지 경로를 넣어준다.
    if (props.type == 'file') {
      setImageUrl('/');
      if (props.defaultImageUrl) {
        setImageUrl(`${AWSS3Prefix}${props.defaultImageUrl}`);
      }
    }
  }, [props.defaultImageUrl]);

  // ! type을 변수로 주게되면 id값을 무시해서 htmlFor이 제대로 작동되지 않는 문제 존재
  return (
    <Container>
      {props.type == 'file' ? (
        <InputStyle
          type={'file'}
          placeholder={props.placeholder ?? '입력창'}
          id={'imageUpload'}
          ref={ref ?? null}
          {...props}
          {...props.register}
          onChange={(e) => {
            // ! onChangeFile(e)와 아래 조건문 순서 바꾸지 말것 바꾸면 e의 값이 초기화 되면서 제대로 작동이 되지를 않는다.
            onChangeFile(e);
            if (props.register) {
              props.setValue(props.register?.name, e.target.files[0], { shouldValidate: true});
            }
          }}
        />
      ) : (
        <InputStyle
          type={props.type ?? 'text'}
          placeholder={props.placeholder ?? '입력창'}
          onChange={(e) => {
            if (props.register) {
              // ? react-hook-form 사용시 필요한 코드
              props.register.onChange(e);
            }
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          defaultValue={props.defaultValue}
          ref={ref ?? null}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key == 'Enter' && props.onKeyPressAction) {
              props.onKeyPressAction(e.target.value);
            }
          }}
          {...props}
          {...props.register}
        />
      )}

      {props.errorMessage && (
        <ErrorMessage height={props.h}>{props.errorMessage}</ErrorMessage>
      )}
      {props.type == 'file' && (
        <ImageFileContainer
          color={props.color}
          htmlFor={'imageUpload'}
          state={props.state}
          w={props.w}
          h={props.h}
          isImageUrl={imageUrl}
          bg={props.bg}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={(e) => {
            if (props.register) {
              // ? react-hook-form 사용시 필요한 코드
              const event = e;
              event.target.value = e.dataTransfer.files?.[0];
              event.target.name = props.register?.name;
              props.register?.onChange(event);
            }
            onDrop(e);
          }}
        >
          {imageUrl && (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (props.register) {
                  if (!props.removeImageFile) {
                    setImageUrl('/');
                    props.setValue(props.register?.name, '', {
                      shouldValidate: true,
                      });
                      }
                  if (props.removeImageFile) {
                    props.removeImageFile();                    
                  }
                }
              }}
            >
              <Image
                src={Icons.ExitIcon}
                alt={'image'}
                width={16}
                height={16}
              />
            </button>
          )}
          {imageUrl != '/' ? (
            <div className={'relative w-full h-full'}>
              <Image src={imageUrl} alt={'image'} fill className={"image"} />
            </div>
          ) : (
            <CC.ColumnCenterCenterDiv h={'100%'}>
              <Image
                src={Icons.CloudIcon}
                alt={'image'}
                width={48}
                height={48}
              />
              <CC.RowCenterDiv> drag file to upload </CC.RowCenterDiv>
            </CC.ColumnCenterCenterDiv>
          )}
        </ImageFileContainer>
      )}
    </Container>
  );
};

Input.displayName = 'Input';
export default React.forwardRef(Input);

// 제거할 부분

const Container = styled.div`
  position: relative;
  label {
    z-index: 2;
  }
`;

const InputStyle = styled.input<IInputProps>`
  // 외곽 디자인(border-radius, outline, box-shadow) //
  // ! border-radius를 넣으니 focus 되었을 때 다른 요소가 흐려지는 버그 발생
  border-radius: ${(props) => props.brR || '0.5rem'};
  outline: ${(props) =>
    `solid ${
      props.theme.colors?.[props.outlineColor] ||
      props.theme.main?.[props.outlineColor]
    } 0.1rem`};
  width: ${(props) => props.w || '100%'};
  height: ${(props) => props.h || '100%'};

  // 컨테이너(width, height, margin, padding, border, flex, grid, position) //
  display: ${(props) => props.display ?? 'block'};
  border: none;
  padding: ${(props) => props.pd};
  position: relative;
  text-align: ${(props) => props.center && 'center'};

  // 배경색(background) //
  background: ${(props) =>
    props.theme.colors?.[props.bg] || props.theme.main?.[props.bg] || 'none'};

  // 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //
  font-size: 1rem;
  color: ${(props) =>
    props.theme.colors?.[props.color] || props.theme.main?.[props.color]};

  // 애니메이션(animation) //

  // 이벤트(active, focus, hover, visited, focus-within, disabled) //
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }

  &:focus {
    /* outline: none; */
    background: ${props=>props.theme.main.secondary60};
    color: ${props => props.theme.main.contrast};
    font-weight: 800;
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: ${props.theme.colors.disabled};
    cursor: not-allowed;
    &:hover {
      box-shadow: none;
      cursor: not-allowed;
    }
  `}

  &[type='search'] {
    padding-left: 0.4rem;
  }

  &[type='checkbox'] {
    appearance: none;
    outline: solid ${(props) => props.theme.main?.contrast} 0.1rem;
    height: ${(props) =>
      props.h || props.theme.inputSizes?.checkbox?.md.height};
    aspect-ratio: 1;
  }

  &[type='checkbox']:checked {
    position: relative;
    cursor: pointer;
  }

  &[type='checkbox']:checked::after {
    content: '✔';
    border-radius: 50%;
    color: ${(props) => props.theme.main?.primary100};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 50%;
    ${(props) => props.theme.flex?.row.center.center};
  }

  &[type='datetime-local']::-webkit-calendar-picker-indicator {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    &:hover {
      cursor: pointer;
    }
  }

  &[type='file'] {
    height: 100%;
    appearance: none;
    display: none;
  }

  /* 왼쪽에 이미지를 넣은 경우 padding left에 값을 주어 이미지 크기 만큼은 밀어준다. */
  ${(props) =>
    props.leftIconImage &&
    `
      background-image: url(${props.leftIconImage});
      padding: 0rem 0rem 0rem calc(${props.h ? props.h : '2rem'} + 0.8rem);
      background-position: 0.4rem center;
      background-repeat: no-repeat;
      background-size: contain;
      ::placeholder {
        transition: all 0.6s ease-in-out;
        opacity: 0.7;
    }
    &[type='search'] {
      padding-left: calc(${props.h ? props.h : '2rem'} + 0.8rem);
    }
  `}

  // 커스텀(custom css) //
${(props) =>
    props.bg == 1 &&
    `
     background: ${props.theme.colors.gray20}; 
     color: #333333;
  `}
${(props) =>
    props.outline === 1 &&
    `
    outline: solid black 1px;
    outline-offset: -1px;
  `}
`;

const ErrorMessage = styled.span<IInputProps>`
  --height: ${(props) =>
    props.errorLocation ||
    props.h ||
    (props.size && props.size === 'sm'
      ? '0.8rem'
      : props.size === 'md'
        ? '1.2rem'
        : '1rem')};
  color: red;
  position: absolute;
  left: 0.5rem;
  text-align: start;
  font-size: 0.75rem;
  font-weight: 800;
  word-break: keep-all;
`;

const ImageFileContainer = styled.label<
  Pick<IInputProps, 'w' | 'h' | 'bg' | 'isImageUrl' | 'color'>
>`
  width: ${(props) => props.w || '100%'};
  height: ${(props) => props.h || props.theme.inputSizes['text'].md.height};
  display: block;
  ${(props) => props.theme.flex?.row.center.center};
  border-radius: 0.5rem;
  position: relative;
  background: ${(props) =>
    props.theme.colors?.[props.bg] || props.theme.main?.[props.bg]};
    &:hover {
      cursor: pointer;
    }
  color: ${(props) =>
    props.theme.colors?.[props.color] || props.theme.main?.[props.color]};
.image {
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
}
  button {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    z-index: 4;
    background: transparent;
    cursor: pointer;
  }
  ${(props) =>
    props.isImageUrl &&
    css`
      outline: solid black 1px;
      outline-offset: -1px;
      box-shadow: none;
    `}

  }
`;

import styled from "styled-components";
import { url } from "inspector";
import Link from "next/link";
import Button from "../button/Button";
import { CF } from "../../../../styles/commonComponentStyle";
import { animationKeyFrames } from "@/styles/commonAnimationKeyFrames";
import theme from "@/styles/theme";

/**
 * Author : Sukyung Lee
 * FileName: Input.tsx
 * Date: 2022-06-17 02:19:41
 * Description : 커스텀 Input 컴포넌트
 */

interface IInputSearchProps {
  type?: string;
  placeholder?: string;
  register?: any;
  disabled?: boolean;
  defaultValue?: string;
  width?: string;
  height?: string;
  img?: string; // 검색창에 들어갈 아이콘
}

const InputSearch = ({
  type,
  placeholder, // 11자리 + 띄어쓰기 2번
  disabled,
  register,
  width,
  height,
  img,
  ...props
}: IInputSearchProps) => {
  return (
    <Container>
      <InputStyle
        type="search"
        placeholder={placeholder || "찾을 내용을 입력해주세요"}
        disabled={disabled}
        height={height}
        width={width}
        img={img}
        {...register}
        {...props}
      />
      <Button> 검색 </Button>
    </Container>
  );
};
export default InputSearch;

const Container = styled(CF.RowDiv)`
  gap: 10px;
  height: 100%;
  align-items: center;
`;

const InputStyle = styled.input<{
  height: string;
  img: string;
  margin: string;
}>`
  min-width: 200px;
  border-radius: 8px;
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "60%")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};

  padding: 0px 0px 0px 28px;
  background-image: ${(props) => `url(${props.img})`};
  background-position: 4px center;
  background-repeat: no-repeat;
  background-size: contain;

  ::placeholder {
    transition: all 0.6s ease-in-out;
    ${theme.fontSizes.base};
    color: #999999;

    @media (max-width: 768px) {
      ${theme.fontSizes.small};
    }
  }
  :focus::placeholder {
    color: transparent;
  }
`;

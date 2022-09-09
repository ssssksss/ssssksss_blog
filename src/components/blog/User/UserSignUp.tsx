import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import Space from "@/components/common/space/Space";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useForm } from "react-hook-form";
import styled, { keyframes } from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { useEffect } from "react";
import { UserSignupYup } from "./UserSignupYup";

/**
 * Author : Sukyung Lee
 * FileName: ModalSignup.tsx
 * Date: 2022-09-07 12:37:22
 * Description :
 */

interface IUserSignUpProps {
  toggleModal: () => void;
}

const UserSignUp = (props: IUserSignUpProps) => {
  const { register, handleSubmit, formState, watch, trigger } = useForm({
    resolver: yupResolver(UserSignupYup),
    mode: "onChange",
    defaultValues: {
      nickname: "도비",
      password: "P@ssw0rd!",
      passwordConfirm: "P@ssw0rd!",
      email: "dobby@dobby.com",
      gender: "m",
      birthDate: "19950329",
    },
  });
  const { errors } = formState;

  const onClickSubmit = async (data: any) => {
    const { passwordConfirm, ...params } = data;

    await AxiosInstance({
      url: "/api/user/signup",
      method: "POST",
      data: {
        nickname: params.nickname,
        password: params.password,
        email: params.email,
        gender: params.gender,
        birthDate: params.birthDate,
      },
    })
      .then((response: any) => {
        props.toggleModal();
        alert("회원가입이 되었습니다.");
      })
      .catch((error: any) => {
        // console.log(error.response);
        alert(error.response.data.errorMsg);
      });
  };

  const onClickErrorSubmit = () => {
    alert("잘못 입력된 값이 존재합니다.");
  };

  useEffect(() => {
    if (formState.touchedFields?.password) {
      trigger("password");
      trigger("passwordConfirm");
    }
  }, [watch("password")]);

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onClickSubmit, onClickErrorSubmit)}>
        <CF.RowCenterDiv
          height="30px"
          color="#fff"
          fontSize={theme.fontSizes.lg}
          padding={"10px 0px 0px 0px"}
        >
          회원가입
        </CF.RowCenterDiv>
        <CF.ColumnDiv gap={10} padding={"20px 20px 20px 20px"} color={"#fff"}>
          <Space title4="닉네임" titleWidth={"140px"}>
            <Input
              placeholder="닉네임을 입력하세요"
              register={register("nickname")}
            />
            <CF.ErrorDiv> {errors.nickname?.message} </CF.ErrorDiv>
          </Space>
          <Space title4="비밀번호" titleWidth={"140px"}>
            <Input
              placeholder="비밀번호를 입력하세요"
              type="password"
              register={register("password")}
            />
            <CF.ErrorDiv> {errors.password?.message} </CF.ErrorDiv>
          </Space>
          <Space title4="비번확인" titleWidth={"140px"}>
            <Input
              placeholder="비밀번호를 재입력하세요"
              type="password"
              register={register("passwordConfirm")}
            />
            <CF.ErrorDiv> {errors.passwordConfirm?.message} </CF.ErrorDiv>
          </Space>
          <Space title4="이메일" titleWidth={"140px"}>
            <Input
              placeholder="이메일을 입력하세요"
              type="email"
              register={register("email")}
            />
            <CF.ErrorDiv> {errors.email?.message} </CF.ErrorDiv>
          </Space>
          <Space title4="성별" titleWidth={"140px"}>
            <CF.RowDiv gap={10}>
              <CF.RowDiv gap={10}>
                <Input
                  placeholder="남"
                  type="radio"
                  width="20px"
                  id="man"
                  name="gender"
                  value="m"
                  register={register("gender")}
                />
                <label htmlFor="man"> 남 </label>
              </CF.RowDiv>
              <CF.RowDiv gap={10}>
                <Input
                  placeholder="여"
                  type="radio"
                  width="20px"
                  id="woman"
                  name="gender"
                  value="w"
                  register={register("gender")}
                />
                <label htmlFor="woman"> 여 </label>
              </CF.RowDiv>
            </CF.RowDiv>
            <CF.ErrorDiv> {errors.gender?.message} </CF.ErrorDiv>
          </Space>
          <Space title4="생년월일" titleWidth={"140px"}>
            <Input
              placeholder="생년월일을 8자리로 입력하세요"
              register={register("birthDate")}
            />
            <CF.ErrorDiv> {errors.birthDate?.message} </CF.ErrorDiv>
          </Space>
          <CF.RowDiv gap={20}>
            <Button
              onClick={handleSubmit(onClickSubmit, onClickErrorSubmit)}
              disabled={!formState.isValid}
            >
              가입
            </Button>
            <Button onClick={props.toggleModal}> 취소 </Button>
          </CF.RowDiv>
        </CF.ColumnDiv>
      </FormContainer>
    </Container>
  );
};
export default UserSignUp;

const UpDownAnimation = keyframes`
        from {
          opacity: 0;
          transform: translate(0, 0);
          border-radius: 0px 0px 0px 0px;
        }
        
        to {
            opacity: 1;
            transform: translate(10px, 10px);
          border-radius: 50px 0px 4px 4px;
        }
`;

const Container = styled.div`
  width: calc(100% - 80px);
  border-radius: 50px 4px 4px 4px;
  background-color: ${theme.backgroundColors.primary};
  z-index: 80;
  margin-top: 20px;

  input::placeholder {
    font-size: ${theme.fontSizes.base};
  }

  @media (max-width: 1023px) {
    input::placeholder {
      font-size: ${theme.fontSizes.small};
    }
  }
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.backgroundColors.secondary};
  animation: ${UpDownAnimation} 1s ease-in-out;
  animation-fill-mode: forwards;
`;
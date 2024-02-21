import { Button } from '@/components/common/button/Button';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import Swal from 'sweetalert2';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ConfirmButton.tsx
 * @version 0.0.1 "2024-02-15 20:37:45"
 * @description 설명
 */
interface ButtonProps {
  onClick?: (event: any) => void;
  onClickCapture?: (event: any) => void;
  children: ReactNode;
  disabled?: boolean;
  w?: string;
  h?: string;
  bg?: string;
  brR?: string; // border-radius
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean;
  outlineColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  state?: number;
  active?: boolean;
  activeBg?: string;
  hover?: boolean;
  //
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
  title?: string;
  text?: string;
}

export const ConfirmButton = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children = 'button',
  hover = true,
  onSuccessHandler,
  ...props
}: ButtonProps) => {
  const showSwal = () => {
    Swal.fire({
      // title: props.title || '삭제하시겠습니까?',
      titleText: props.text || 'Do you want to continue',
      icon: props.icon || 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '승인',
      cancelButtonText: '취소',
    }).then(res => {
      if (res.isConfirmed) _onClick?.(event);
    });
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
      if (props.disabled) return;
      showSwal();
      event.stopPropagation();
    },
    [_onClick, props.disabled]
  );

  return (
    <Container onClick={onClick} {...props}>
      {children}
    </Container>
  );
};

const Container = styled(Button)`
  outline: none;
`;

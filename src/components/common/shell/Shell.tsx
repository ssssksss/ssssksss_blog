import { CC } from '@/styles/commonComponentStyle';
import { commonTheme } from '@/styles/theme';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface ShellProps {
  children: ReactNode;
  disabled?: boolean;
  color?:
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'purple'
    | 'blue'
    | 'skyblue'
    | 'purple'
    | 'pink';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean;
  w?: string;
  h?: string;
  brR?: string;
  fontFamily?: string;
  fontWeight?: number;
  state?: number;
  gap?: number;
}

/**
 * @Param onClick = () => void;
 * @Param disable = "true | false"
 * @param color = "red" | "orange" | "yellow" | "green" | "blue" | "skyblue" | "purple" | "pink" | "white" | "disabled";
 * @param size = "xs" | "sm" | "md" | "lg" | "xl";
 */
export const Shell = ({
  children = 'Shell',
  disabled = false,
  color,
  size = 'sm',
  w,
  h,
  pd,
  brR,
  bg,
  fontFamily, 
  fontWeight,
  outline,
  state,
  gap,
  ...props
}: ShellProps) => {
  return (
    <ShellStyle
    disabled={disabled}
    color={color}
    size={size}
    width={w}
    height={h}
    padding={pd}
    background={bg}
    borderRadius={brR}
    outline={outline}
    fontFamily={fontFamily}
    fontWeight={fontWeight}
    state={state}
    gap={gap}
      {...props}
    >
      {children}
    </ShellStyle>
  );
};

export default Shell;

const ShellStyle = styled(CC.ColumnDiv)<IShellProps>`
  padding: ${props=>props.padding || "2px 4px"};
  min-width: 24px;
  min-height: 24px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.[props.borderRadius] || props.theme.borderRadius.br10};
  color: ${props => props.theme.colors.[props.color] || props.theme.main.[props.color] ||  props.theme.main.contrast};
  background: ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] || props.theme.main.primary80};
  font-family: ${props=>props.theme.fontFamily.[props.fontFamily]};
  font-weight: ${props=>props.fontWeight};
  font-size: 1em;
  gap: ${props => props.gap}px;
  /* background-color: ${props => commonTheme.backgroundColors[props.color]}; */
  /* border-radius: ${props =>
    commonTheme.btnSizes[props.size].borderRadius}; */
  /* width: ${props => commonTheme.btnSizes[props.size].width}; */

  /* 순서주의 */
  ${props =>
    props.disabled &&
    `
    background-color: ${props=>props.theme.colors.disabled};
    cursor: not-allowed;
    &:hover {
      box-shadow: none;
      cursor: not-allowed;  
    }
    `}
  /* 순서주의 */
  ${props =>
    props.outline &&
    `
    outline: solid ${props.theme.colors.[props.color] || props.theme.main.[props.color] || props.theme.main.primary80} 1px;
    background: transparent;
    `}

${props=>props.state === 1 && `
    outline: solid ${props.theme.colors.white80} 1px;
    background: rgba(0, 0, 0, 0.01);
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
    color: ${props.theme.colors.white80};
  `}

height: ${props => props.height};
${props => `width: ${props.width || 'max-content'}`};
`;

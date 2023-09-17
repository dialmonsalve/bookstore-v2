import { CSSProperties, ReactNode } from "react";

type Color =
  | 'blue' | 'red' | 'green' | 'purple' | 'yellow'
  | 'outline-blue' | 'outline-red' | 'outline-green' | 'outline-purple' | 'outline-yellow' | 'transparent';

interface ButtonProps {
  buttonStyle?: 'normal' | 'iconButton'
  backgroundColor?: Color;
  children?: string | ReactNode;
  ico?: string;
  margin?: string
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  color?: string
  disabled?: boolean
  onClick?: () => void;
  width?: string;
  height?: string;

  style?: CSSProperties;
  className?: string
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed'

}

export const Button = ({
  backgroundColor = 'blue',
  buttonStyle = 'normal',
  className,
  children,
  size = 'medium',
  type = 'button',
  disabled,
  width,
  height,
  top,
  bottom,
  left,
  right,
  position,
  ico,
  ...props
}: ButtonProps) => {

  const isDisabled = disabled ? 'disabled' : '';

  const stylePlus: CSSProperties = {
    top,
    bottom,
    left,
    right,
    position,
    width,
    height:width
  }

  if (buttonStyle === 'normal') {

    return (
      <button
        type={type}
        className={`btn btn--${backgroundColor} btn--${size} ${isDisabled} ${className || ""}`}
        style={{ width }}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }

  if (buttonStyle === 'iconButton') {

    return (
      <button
        type={type}
        className={`btn-ico ${ico} ${isDisabled ? 'ico-disabled' : ''}`}
        style={stylePlus}
        disabled={disabled}
        {...props}
      >
      </button>
    )

  }

}

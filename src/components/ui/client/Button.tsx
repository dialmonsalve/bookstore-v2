import { CSSProperties, ReactNode } from "react";

type Color =
  | 'blue' | 'red' | 'green' | 'purple' | 'yellow'
  | 'outline-blue' | 'outline-red' | 'outline-green' | 'outline-purple' | 'outline-yellow' | 'transparent' |'black' | 'outline-black';

interface ButtonProps {
  backgroundColor?: Color;
  borderRadius?:string;
  buttonStyle?: 'normal' | 'iconButton' | 'square'
  children?: string | ReactNode;
  color?: string
  disabled?: boolean
  height?: string;
  ico?: string;
  margin?: string
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  width?: string;
  onClick?: () => void;

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
  borderRadius,
  bottom,
  buttonStyle = 'normal',
  children,
  className,
  disabled,
  height,
  ico,
  left,
  position,
  right,
  size = 'medium',
  top,
  type = 'button',
  width,
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
        style={{ width, borderRadius:'1rem', height }}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }

  
  if (buttonStyle === 'square') {

    return (
      <button
        type={type}
        className={`btn btn--${backgroundColor} btn--${size} ${isDisabled} ${className || ""}`}
        style={{ width, borderRadius }}
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

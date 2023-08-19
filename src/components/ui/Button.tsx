
type Color =
  | 'blue' | 'red' | 'green' | 'purple' | 'yellow'
  | 'outline-blue' | 'outline-red' | 'outline-green' | 'outline-purple' | 'outline-yellow';

interface ButtonProps {
  backgroundColor?: Color;
  children: string;
  margin?: string
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  color?: string
  disabled?: boolean
  onClick?: () => void;
  width?: string;
}

export const Button = ({
  backgroundColor = 'blue',
  children,
  size = 'medium',
  type = 'button',
  disabled,
  width,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn btn--${backgroundColor} btn--${size}`}
      style={{ width }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

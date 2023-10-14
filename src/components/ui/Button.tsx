import { CSSProperties, ReactNode, useEffect, useRef, MouseEvent } from "react";

type Color =
  | "blue"
  | "red"
  | "green"
  | "purple"
  | "yellow"
  | "outline-blue"
  | "outline-red"
  | "outline-green"
  | "outline-purple"
  | "outline-yellow"
  | "transparent"
  | "black"
  | "outline-black";

interface ButtonProps {
  backgroundColor?: Color;
  buttonStyle?: "normal" | "iconButton" | "points" | "filled" | "back";
  children?: string | ReactNode;
  disabled?: boolean;
  ico?: string;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit";
  onClick?: () => void;

  style?: CSSProperties;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  position?: "static" | "relative" | "absolute" | "sticky" | "fixed";
}

export const Button = ({
  backgroundColor = "blue",
  bottom,
  buttonStyle = "normal",
  children,
  disabled,
  ico,
  left,
  position,
  right,
  size = "medium",
  top,
  type = "button",
  ...props
}: ButtonProps) => {
  const isDisabled = disabled ? "disabled" : "";

  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btnElement = button.current;

    const ripple = (e: MouseEvent<HTMLButtonElement>) => {
      if (button.current) {
        const rect = button.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripples = document.createElement("span");
        ripples.style.left = `${x}px`;
        ripples.style.top = `${y}px`;

        button.current.appendChild(ripples);
        setTimeout(() => {
          ripples.remove();
        }, 600);
      }
    };
    btnElement?.addEventListener("click", ripple as unknown as EventListener);

    return () => {
      btnElement?.removeEventListener(
        "click",
        ripple as unknown as EventListener
      );
    };
  }, []);

  const stylePlus: CSSProperties = {
    top,
    bottom,
    left,
    right,
    position,
  };

  if (buttonStyle === "normal") {
    return (
      <button
        type={type}
        className={`btn btn--${backgroundColor} btn--${size} ${isDisabled}`}
        disabled={disabled}
        ref={button}
        {...props}
      >
        {children}
      </button>
    );
  }
  if (buttonStyle === "points") {
    return (
      <button
        type={type}
        className={`btn-points points points--${backgroundColor} ${
          disabled ? "disabled-point" : ""
        }`}
        disabled={disabled}
        {...props}
      >
        <span></span>
        <span></span>
        {children}
      </button>
    );
  }

  if (buttonStyle === "filled") {
    return (
      <button
        type={type}
        className={`btn-filled filled btn--${size} ${isDisabled}`}
        disabled={disabled}
        ref={button}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (buttonStyle === "iconButton") {
    return (
      <button
        type={type}
        className={`btn-ico ${ico} ${isDisabled ? "ico-disabled" : ""}`}
        style={stylePlus}
        disabled={disabled}
        {...props}
      ></button>
    );
  }

  if (buttonStyle === "back") {
    return (
      <button
        type={type}
        className={`btn-back back back--blue`}
        disabled={disabled}
        {...props}
      >
        <span></span>
        {children}
      </button>
    );
  }
};

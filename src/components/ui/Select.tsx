import { useFormStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { ErrorMessage } from ".";
import { ErrorMessages, InitialForm } from "@/types";

type SingleSelectProps = {
  multiple?: false;
  name: string;
  label: string;
  className?: string;
  value: string[] | string;
  errors?: ErrorMessages<InitialForm | undefined>;
};
type MultipleSelectProps = {
  multiple: true;
  name: string;
  label: string;
  className?: string;
  value: string[] | string;
  errors?: ErrorMessages<InitialForm | undefined>;
};
type SelectProps = {
  options: string[];
} & (SingleSelectProps | MultipleSelectProps);

export const Select = ({
  errors,
  multiple,
  options,
  name,
  label,
  className,
  value,
}: SelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const setOption = useFormStore((state) => state.setOption);
  const isFormSubmitted = useFormStore((state) => state.isFormSubmitted);
  const isTouched = useFormStore((state) => state.isTouched);
  const handleBlur = useFormStore((state) => state.handleBlur);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const ulElement = containerRef.current?.querySelector(
      ".select-container__options"
    );
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      if (ulElement === null || ulElement === undefined) return;

      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown":
          {
            if (!isOpen) {
              setIsOpen(true);
              break;
            }
            const newValue =
              highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
            if (newValue >= 0 && newValue < options.length) {
              setHighlightedIndex(newValue);

              const element = ulElement.children[newValue];
              if (element) {
                const scrollTop = ulElement.scrollTop;
                // @ts-ignore
                const elementTop = element.offsetTop;
                const elementHeight = element.clientHeight;
                if (elementTop < scrollTop) {
                  ulElement.scrollTop = elementTop;
                } else if (
                  elementTop + elementHeight >
                  scrollTop + ulElement.clientHeight
                ) {
                  ulElement.scrollTop =
                    elementTop + elementHeight - ulElement.clientHeight;
                }
              }
            }
          }
          break;
        case "Esc":
          setIsOpen(false);
          break;

        default:
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  const clearOptions = () => {
    multiple ? setOption(name, []) : setOption("", undefined);
  };

  const selectOption = (option: string) => {
    if (multiple && Array.isArray(value)) {
      if (value?.includes(option)) {
        setOption(
          name,
          value?.filter((o) => o !== option)
        );
      } else {
        setOption(name, [...value, option]);
      }
    } else {
      if (option !== value) setOption(option);
    }
  };

  const isOptionSelected = (option: string) => {
    return multiple ? value?.includes(option) : option === value;
  };

  return (
    <div className={`${className || ""} form-control `}>
      <span className="form-control__label">
        {label}
      </span>
      <div
        id={name}
        onBlur={(e) => {
          setIsOpen(false);
          handleBlur(e);
        }}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={`select-container`}
        ref={containerRef}
      >
        <span className="select-container__span">
          {multiple && Array.isArray(value)
            ? value?.map((v) => (
                <button
                  key={v}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                  className="select-container__span--option-badge"
                >
                  {" "}
                  {v} <span className="remove-btn">&times;</span>{" "}
                </button>
              ))
            : value}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
          className="select-container__clear-btn"
        >
          &times;
        </button>
        <div id={name} className="select-container__caret"></div>
        <ul
          className={`select-container__options ${
            isOpen ? "select-container__show" : ""
          }`}
        >
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              className={`select-container__options--option ${
                isOptionSelected(option)
                  ? "select-container__options--selected"
                  : ""
              } 
                ${
                  index === highlightedIndex
                    ? "select-container__options--highlighted"
                    : ""
                }`}
              key={option}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      <ErrorMessage
        fieldName={errors?.[name]}
        isFormSubmitted={isFormSubmitted}
        isTouched={isTouched?.[name]}
      />
    </div>
  );
};

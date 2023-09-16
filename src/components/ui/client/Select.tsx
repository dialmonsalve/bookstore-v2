import { TypeRole } from "@/types";
import { useEffect, useRef, useState } from "react";

// export type TypeRole = string | null;

type SingleSelectProps = {
  multiple?: false
  value?: TypeRole
  name:string

  onChange: (value: TypeRole | undefined) => void
}
type MultipleSelectProps = {
  multiple: true
  value: TypeRole[]
  name:string

  onChange: (value: TypeRole[]) => void
}
type SelectProps = {
  options: TypeRole[]
} & (SingleSelectProps | MultipleSelectProps)


export const Select = ({ multiple, value, onChange, options, name }: SelectProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen]);

  useEffect(() => {

    const ulElement = containerRef.current?.querySelector(".select-container__options");
    const handler = (e: KeyboardEvent) => {

      if (e.target !== containerRef.current) return;
      if(ulElement===null || ulElement=== undefined) return

      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)

            const element = ulElement.children[newValue];
            if (element) {
              const scrollTop = ulElement.scrollTop;
              // @ts-ignore
              const elementTop = element.offsetTop;
              const elementHeight = element.clientHeight;
              if (elementTop < scrollTop) {
                ulElement.scrollTop = elementTop;
              } else if (elementTop + elementHeight > scrollTop + ulElement.clientHeight) {
                ulElement.scrollTop = elementTop + elementHeight - ulElement.clientHeight;
              }
            }
          }
        }
          break
        case "Esc":
          setIsOpen(false)
          break

        default:
          break;
      }

    }
    containerRef.current?.addEventListener("keydown", handler)

    return () => {
      containerRef.current?.removeEventListener("keydown", handler)
    }
  }, [isOpen, highlightedIndex, options])


  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined)
  }

  const selectOption = (option: TypeRole) => {   

    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }    
  }

  const isOptionSelected = (option: TypeRole) => {
    return multiple ? value.includes(option) : option === value
  }

  return (
    <div  >
    <label className="form-control__label" style={{marginLeft:'.5rem'}}>ROLE</label>
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
      className="select-container"
      ref={containerRef} 
      
    >

      <span className="select-container__span" >{multiple ? value.map(v => (
        <button key={v}
          onClick={e => {
            e.stopPropagation()
            selectOption(v)
          }}
          className="select-container__span--option-badge"
        > {v} <span className="remove-btn" >&times;</span> </button>
      )) : value}</span>

      <button
        type="button"
        onClick={(e => { e.stopPropagation(); clearOptions() })}
        className="select-container__clear-btn" >&times;</button>
      <div id={name} className="select-container__caret" ></div>
      <ul
        className={`select-container__options ${isOpen ? "select-container__show" : ""}`}
        
      >
        {
          options.map((option, index) => (
            <li onClick={e => {
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
              
            }}
            
              className={
                `select-container__options--option ${isOptionSelected(option) ? "select-container__options--selected" : ""} 
                ${index === highlightedIndex ? "select-container__options--highlighted" : ""}`}
              key={option}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option}
            </li>)
          )}
      </ul>
    </div>
    </div>
  )
}




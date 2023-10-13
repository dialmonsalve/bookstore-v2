import { useState, KeyboardEvent } from "react";

import { ErrorMessage } from ".";

import { ErrorMessages, InitialForm } from "@/types";

import { useFormStore } from "@/store";

interface InputTagProps {
  optionTags: string[];
  errors?: ErrorMessages<InitialForm | undefined>;
  name: string;
}

export const InputTags = ({ errors, name, optionTags }: InputTagProps) => {
  const [value, setValue] = useState("");

  const isFormSubmitted = useFormStore((state) => state.isFormSubmitted);
  const isTouched = useFormStore((state) => state.isTouched);
  const handleBlur = useFormStore((state) => state.handleBlur);
  const setOptionTags = useFormStore((state) => state.setOptionTags);

  const handleAddTags = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if (optionTags.includes(value.trim().toLocaleLowerCase())) return;
      setOptionTags(name, [...optionTags, value.trim().toLocaleLowerCase()]);
      setValue("");
    }
  };
  const handleDeleteTags = (tag: string) => {
    setOptionTags(
      name,
      optionTags.filter((oldTag) => oldTag !== tag)
    );
  };

  return (
    <div>
      <div className="form-control" onKeyDown={handleAddTags}>
        <label htmlFor="tags" className="form-control__label">
          tag
        </label>
        <input
          className="form-control__input"
          type="text"
          name="tag"
          id="tags"
          value={value}
          onBlur={handleBlur}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e)=> e.key === 'Enter' && e.preventDefault()}
        />
      </div>
      <div id="tags" className={`select-container`}>
        {optionTags.map((tag) => (
          <span
            className="select-container__span--option-badge"
            key={tag}
            onClick={() => handleDeleteTags(tag)}
          >
            {tag}
            <span className="remove-btn">&times;</span>
          </span>
        ))}
      </div>
      <ErrorMessage
        fieldName={errors?.["tags"]}
        isFormSubmitted={isFormSubmitted}
        isTouched={isTouched?.["tags"]}
      />
    </div>
  );
};

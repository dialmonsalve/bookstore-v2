import Link from "next/link"
import { ApiMessageError, Button, ErrorMessage, FormControl } from "./"
import { ErrorMessages, InitialForm, IsTouched, ReactChangeEvent, ReactFocusEvent, TypeRole } from "@/types";
import React, { FormEvent, useState } from "react";

interface Props {
  errorApiMessage: string,
  errors: ErrorMessages<InitialForm> | undefined;
  formState: InitialForm;
  isFormSubmitted: boolean;
  isEmployee: boolean
  isTouched: IsTouched;
  showError: boolean,
  handleBlur: (e: ReactFocusEvent) => void;
  handleFieldChange: (e: ReactChangeEvent) => void;
  onSubmit: (e: FormEvent) => void;
}

export const RegisterForm = ({
  errorApiMessage,
  errors,
  formState,
  isEmployee,
  isFormSubmitted,
  isTouched,
  showError,
  handleBlur,
  handleFieldChange,
  onSubmit,
}: Props) => {

  const [options, setOptions] = useState<TypeRole[]>([]); 
  const [selectedItems, setSelectedItems] = useState<TypeRole[]>([]); 
  const [inputValue, setInputValue] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const allOptions = ["admin", "compras", "logistica", "vendedor", "admin2", "compras2", "logistica2", "vendedor2"]

  const handleInputChange = (e: ReactChangeEvent) => {
    const searchValue = e.target.value;
    setInputValue(searchValue);

    const filteredOptions = allOptions.filter(option =>
      option.toLowerCase().includes(searchValue.toLowerCase())
    );

    setOptions(filteredOptions);
  }

  const handleAddItem = (item: TypeRole) => {
    setSelectedItems(prevItems => [...prevItems, item]);
    setInputValue('');
  
    setOptions(prevOptions => prevOptions.filter(option => option !== item));
  }

  const handleRemoveItem = (item: TypeRole) => {
  setSelectedItems(prevItems => prevItems.filter(prevItem => prevItem !== item));
  
  setOptions(prevOptions => [...prevOptions, item].sort((a, b) => a.localeCompare(b)));
}

  if (selectedItems === undefined) return;
  console.log(selectedItems);

  const {
    email,
    lastName,
    name,
    password,
    phone,
    repitePassword,
    username
  } = formState;

  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const firstOption = document.querySelector('.options-container div');
      if (firstOption) firstOption.focus();
    }
  }
  
  const handleOptionKeyDown = (e, option) => {
    const index = options.indexOf(option);
  
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevOption = document.querySelector(`.options-container div:nth-child(${index})`);
      if (prevOption) prevOption.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextOption = document.querySelector(`.options-container div:nth-child(${index + 2})`);
      if (nextOption) nextOption.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(option);
    }
  }


  return (
    <>
      <ApiMessageError
        showError={showError}
        errorApiMessage={errorApiMessage}
      />
      <form style={{ width: "60rem" }} className="form" onSubmit={onSubmit}
         >

        <div>
          <FormControl
            label="nombre"
            name="name"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            fieldName={errors?.name}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.name}
          />

        </div>

        <div>
          <FormControl
            label="apellido"
            name="lastName"
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            fieldName={errors?.lastName}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.lastName}
          />
        </div>

        <div>
          <FormControl
            label="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            fieldName={errors?.email}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.email}
          />
        </div>

        <div>
          <FormControl
            label="Teléfono"
            name="phone"
            type="phone"
            placeholder="Teléfono"
            value={phone}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            fieldName={errors?.phone}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.phone}
          />
        </div>

        <div>
          <FormControl
            label="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            autoComplete="off"
          />

          <ErrorMessage
            fieldName={errors?.password}
            isFormSubmitted={isFormSubmitted}
            isTouched={isTouched?.password}
          />
        </div>
        {
          isEmployee
            ?
            <>

              <div>
                <FormControl
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleFieldChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  fieldName={errors?.username}
                  isFormSubmitted={isFormSubmitted}
                  isTouched={isTouched?.username}
                />
              </div>

              <div>
                <input
                className="input-multiselect "
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={() => {
                    const filteredOptions = allOptions.filter(option => !selectedItems.includes(option)) .sort((a, b) => a.localeCompare(b));
                    setOptions(filteredOptions);
                    setIsInputFocused(true);
                  }}
                  onKeyDown={handleInputKeyDown}
                  id="inputField"
                  placeholder="Selecciona opciones..."
                />
              </div>
              {options.length > 0 && isInputFocused && (
                <div className="options-container" >
                  {options.map(option => (
                    <div key={option} onKeyDown={(e) => handleOptionKeyDown(e, option)} 
                    tabIndex={0} >
                      {option} 
                      <button 
                      onClick={() => handleAddItem(option)}
                      >Agregar</button>
                    </div>
                  ))}
                </div>
              )}
            </>
            :
            <div>
              <FormControl
                label="repite password"
                name="repitePassword"
                type="password"
                placeholder="Repite el password"
                value={repitePassword}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <ErrorMessage
                fieldName={errors?.repitePassword}
                isFormSubmitted={isFormSubmitted}
                isTouched={isTouched?.repitePassword}
              />
            </div>
        }
        <div style={{ display: 'flex' }}>
          <Button type="submit" width='40%' backgroundColor="green" disabled={!!errors} >
            Crear Cuenta
          </Button>
          {
            !isEmployee &&
            <Link href='login' className="btn btn--blue btn--medium" style={{ textAlign: 'center', lineHeight: 1, letterSpacing: 0 }} >
              Ya tienes cuenta?, Inicia sesión
            </Link>
          }

        </div>
        <div className="selected-options">
          {selectedItems.map(item => (
            <div key={item}>
              {item} <button onClick={() => handleRemoveItem(item)}>&times;</button>
            </div>
          ))}
        </div>


      </form>

    </>
  )
}

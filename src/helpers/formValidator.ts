
import { ErrorMessage, InitialForm, ValidationSchema, Validator, ValidatorReturn } from "../types";

export const formValidator = (): ValidatorReturn => {

  function getErrors<T extends InitialForm>(formState: T, objValidations: ValidationSchema) {
    let formCheckedValues = {} as ErrorMessage<T>;

    for (const fieldRules of Object.keys(objValidations)) {

      if (Object.prototype.hasOwnProperty.call(formState, fieldRules)) {

        const fieldValidator = objValidations[fieldRules];

        if (fieldRules in formState) {
          const fieldValue = fieldValidator.validate(formState[fieldRules] as string, formState);

          if (fieldValue.length) {
            formCheckedValues = {
              ...formCheckedValues,
              [`${fieldRules}`]: fieldValue
            }
          }
        }
      }
    }
    if (Object.keys(formCheckedValues).length === 0) {
      return undefined;
    }
    return formCheckedValues;
  }

  const validator: Validator = {
    rules: [],
    email(): typeof validator {
      const defaultMessage = 'El campo debe ser un email válido'
      validator.rules.push({
        test: (value) => {
          const emailRegex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailRegex.test(value);
        },
        message: defaultMessage,
      });
      return validator;
    },
    equalTo(field: string,): typeof validator {

      validator.rules.push({
        test: (value, formState) => {
          return value && value === formState[field]
        },
        message: `Este campo debe ser igual al campo: ${field}`,
      })
      return validator;

    },
    greaterThanToday(message: string): typeof validator {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const isToday = now.getTime();
      validator.rules.push({
        test: (value) => value && new Date(value).getTime() > isToday,
        message,
      })
      return validator;
    },
    dateGreaterThan(field: string, message: string): typeof validator {

      validator.rules.push({
        test: (value, formState) => {
          return value && new Date(value).getTime() >= new Date(formState[field]).getTime()
        },
        message,
      })
      return validator;
    },
    isValidPhone(): typeof validator {
      validator.rules.push({
        test: (value) => {
          const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
          return phoneRegex.test(value);
        },
        message: 'El número debe ser un teléfono válido',
      });
      return validator;
    },
    max(length: number, message: string): typeof validator {
      validator.rules.push({
        test: (value) => value && value.length <= length,
        message,
      });
      return validator;
    },
    min(length: number, message: string): typeof validator {
      validator.rules.push({
        test: (value) => value && value.length >= length,
        message,
      });
      return validator;
    },
    required(message: string): typeof validator {
      validator.rules.push({
        test: (value) => typeof value === 'string' && value && value.trim().length > 0 || typeof value === 'number' && value && value > 0,
        message,
      });
      return validator;
    },
    positiveNumber(message: string): typeof validator {
      validator.rules.push({
        test: (value) => {
          const numberValue = parseFloat(value);
          return !isNaN(numberValue) && numberValue > 0;
        },
        message,
      });
      return validator;
    },
    string(): typeof validator {
      const defaultMessage = 'El campo debe ser un string';
      validator.rules.push({
        test: (value) => typeof value === 'string',
        message: defaultMessage,
      });
      return validator;
    },
    number(): typeof validator {
      const defaultMessage = 'El campo debe ser un número';
      const numberRegex = /^\d+$/;
      validator.rules.push({
        test: (value) => numberRegex.test(value),
        message: defaultMessage,
      });
      return validator;
    },
    password(regex: string, message: string): typeof validator {
      const regExpObject = new RegExp(regex)
      validator.rules.push({
        test: (value) => {
          return regExpObject.test(value);
        },
        message,
      });
      return validator;
    },
    validate(value: string, formState: InitialForm): string[] {
      const errors = [];

      for (const rule of validator.rules) {
        if (!rule.test(value, formState)) {
          errors.push(rule.message);
        }
      }
      return errors;
    },
  };
  return {
    email: validator.email.bind(validator),
    equalTo: validator.equalTo.bind(validator),
    dateGreaterThan: validator.dateGreaterThan.bind(validator),
    greaterThanToday: validator.greaterThanToday.bind(validator),
    isValidPhone: validator.isValidPhone.bind(validator),
    max: validator.max.bind(validator),
    min: validator.min.bind(validator),
    number: validator.number.bind(validator),
    password: validator.password.bind(validator),
    positiveNumber: validator.positiveNumber.bind(validator),
    required: validator.required.bind(validator),
    string: validator.string.bind(validator),

    getErrors
  };
};
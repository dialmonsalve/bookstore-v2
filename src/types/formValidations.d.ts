
interface InitialForm {
  [key: string]: string | number;
}

export type ErrorMessages<T> = { [K in keyof T]: string[] }

export type ErrorMessage<T extends InitialForm> = { [K in keyof T]: string[] };

export interface Validator {
  rules: ValidationRule[];
  validate(value: string , formsState: InitialForm): string[];
  dateGreaterThan<T extends InitialForm>(field: keyof T, message: string): Validator;
  equalTo(field: string,): Validator;
  email(): Validator;
  greaterThanToday(message: string): Validator;
  isValidPhone():Validator
  max(length: number, message: string): Validator;
  min(length: number, message: string): Validator;
  notBlankSpace(): Validator;
  number(): Validator;
  password(regex: string, message: string): Validator;
  positiveNumber(message: string): Validator;
  required(message: string): Validator;
  string(): Validator;
}

export interface ValidationRule {
  test: (value: string, formsState: InitialForm) => boolean | string;
  message: string;
}

export type ValidatorReturn = Omit<Omit<Validator, 'rules'>, 'validate'> & Pick<getErrors, 'getErrors'>;

export interface ValidationSchema {
  [key: string]: ValidatorFunction;
}

export type ValidatorFunction = Omit<Validator, 'rules'>;

export interface getErrors {
  getErrors: <T extends Record<string, any>> (formState: T, objValidations: ValidationSchema) => ErrorMessage<T> | undefined
}





import { useEffect, useState } from 'react';

export default function useInputValidation<T>(value: T, validators: Validators): ValidationState {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isWeak, setWeak] = useState<boolean>(false);
  const [isLong, setLong] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setValid] = useState<boolean>(true);

  const checkIsEmpty = (v: T): boolean => !v;

  const checkIsWeak = (v: string): boolean => validators.MinLength !== undefined && v.length < validators.MinLength;

  const checkIsLong = (v: string): boolean => validators.MaxLength !== undefined && v.length > validators.MaxLength;

  useEffect((): void => {
    Object.keys(validators).forEach((validator) => {
      switch (validator) {
        case 'Required':
          const isEmptyValue = checkIsEmpty(value);
          setIsEmpty(isEmptyValue);
          if (isEmptyValue) {
            setErrors((err) => ({ ...err, Required: 'Required field' }));
          } else {
            setErrors((state) => {
              const newState = { ...state };
              delete newState.Required;
              return newState;
            });
          }
          break;

        case 'MinLength':
          let isWeakValue = false;
          if (validators.MinLength !== undefined && typeof value === 'string') {
            isWeakValue = checkIsWeak(value);
          }
          setWeak(isWeakValue);
          if (isWeakValue) {
            setErrors((err) => ({ ...err, MinLength: `Value must contain at least ${validators.MinLength} symbols` }));
          } else {
            setErrors((state) => {
              const newState = { ...state };
              delete newState.MinLength;
              return newState;
            });
          }

          break;

        case 'MaxLength':
          let isLongValue = false;
          if (validators.MaxLength !== undefined && typeof value === 'string') {
            isLongValue = checkIsLong(value);
          }
          setLong(isLongValue);
          if (isLongValue) {
            setErrors((err) => ({ ...err, MaxLength: `Value must contain less ${validators.MaxLength} than symbols` }));
          } else {
            setErrors((state) => {
              const newState = { ...state };
              delete newState.MaxLength;
              return newState;
            });
          }

          break;
        default:
          break;
      }
    });
  }, [value]);

  useEffect((): void => {
    if (isEmpty || isWeak || isLong) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [isEmpty, isWeak, isLong]);

  return {
    isValid,
    errors,
  };
}

export interface Validators {
  Required?: boolean;
  MinLength?: number;
  MaxLength?: number;
  Pattern?: string;
}

export interface ValidationState {
  isValid: boolean;
  errors?: { [key: string]: string };
}

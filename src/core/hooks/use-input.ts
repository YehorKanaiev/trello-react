import { useState } from 'react';
import useInputValidation, { Validators } from './use-input-validation';

export default function useInput<T>(initialValue: T, validators: Validators): InputControl<T> {
  const [value, setValue] = useState<T>(initialValue);
  const { isValid, errors } = useInputValidation(value, validators);
  const [isDirty, setDirty] = useState<boolean>(false);

  const onChange = (v: T): void => {
    setValue(v);
  };

  const onBlur = (): void => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    isValid,
    errors,
  };
}

export interface InputControl<T> {
  value: T;
  onChange: (v: T) => void;
  onBlur: () => void;
  isDirty: boolean;
  isValid: boolean;
  errors?: { [key: string]: string };
}

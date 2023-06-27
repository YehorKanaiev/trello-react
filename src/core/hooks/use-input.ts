import { useState } from 'react';

export default function useInput<T>(initialValue: T): InputControl<T> {
  const [value, setValue] = useState<T>(initialValue);
  // const [isDirty, setDirty] = useState<boolean>(false);

  const onChange = (v: T): void => {
    setValue(v);
  };

  const onBlur = (): void => {
    // setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
  };
}

export interface InputControl<T> {
  value: T;
  onChange: (v: T) => void;
  onBlur: () => void;
}

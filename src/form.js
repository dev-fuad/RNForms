/**
 * @flow
 */

import { useState, useRef, createRef } from 'react';

type UseFormOptions = {
  nextField: Object,
  onSubmit: Function,
};

const useForm = (
  initialState: Object,
  { nextField, onSubmit }: UseFormOptions,
) => {
  const [data, setData] = useState(initialState);
  const ref = useRef<Object>();

  if (!ref.current) {
    ref.current = {};
    Object.keys(initialState).forEach(key => {
      ref.current[key] = createRef();
    });
  }

  const setValue = (key: string) => (value: any) =>
    setData({ ...data, [key]: value });

  const submitEditing = (key: string) => () => {
    if (onSubmit && nextField[key] === 'submit') {
      onSubmit();
    } else if (nextField[key]) {
      ref.current[nextField[key]].current.focus();
    }
  };

  const inputFields = (key: string, next: string) => ({
    value: data[key],
    onChangeText: setValue(key),
    ref: ref.current[key],
    onSubmitEditing: submitEditing(key),
  });

  return {
    ref,
    data,
    setValue,
    inputFields,
  };
};

export default useForm;

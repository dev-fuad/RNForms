/**
 * @flow
 */

import { useState, useRef, createRef } from 'react';
import yup from 'yup';

type UseFormOptions = {
  nextField: Object,
  validation: Object,
  onSubmit: Function,
};

const useForm = (
  initialState: Object,
  { nextField, validation, onSubmit }: UseFormOptions,
) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState({});
  const ref = useRef<Object>();

  if (!ref.current) {
    ref.current = {};
    Object.keys(initialState).forEach(key => {
      ref.current[key] = createRef();
    });
  }

  const setValue = (key: string) => (value: any) =>
    setData({ ...data, [key]: value });

  const submitEditing = (key: string) => async () => {
    if (validation[key]) {
      try {
        await validation[key].validate(data[key]);
      } catch (e) {
        setError({ ...error, [key]: e.message });
        return;
      }
    }
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
    error,
    setValue,
    inputFields,
  };
};

export default useForm;

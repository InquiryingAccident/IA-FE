// import {useEffect, useState} from 'react';

// interface UseFormProps<T> {
//   initialValue: T;
//   validate: (values: T) => Record<keyof T, string>;
// }

// function useForm<T>({initialValue, validate}: UseFormProps<T>) {
//   const [values, setValues] = useState(initialValue);
//   const [touched, setTouched] = useState<Record<string, boolean>>({});
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleChangeText = (name: keyof T, text: string) => {
//     setValues({
//       ...values,
//       [name]: text,
//     });
//   };

//   const handleBlur = (name: keyof T) => {
//     setTouched({
//       ...touched,
//       [name]: true,
//     });
//   };

//   const getTextInputProps = (name: keyof T) => {
//     const value = values[name];
//     const onChangeText = (text: string) => handleChangeText(name, text);
//     const onBlur = () => handleBlur(name);

//     return {value, onChangeText, onBlur};
//   };

//   useEffect(() => {
//     const newErrors = validate(values);
//     setErrors(newErrors);
//   }, [validate, values]);

//   return {values, errors, touched, getTextInputProps};
// }

// export default useForm;
import {useEffect, useState} from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({initialValue, validate}: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeText = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  /**
   * 커스텀 핸들러를 병합할 수 있도록 수정
   * @param name - 필드 이름
   * @param customHandlers - {onChangeText, onBlur} 같은 추가 핸들러
   */
  const getTextInputProps = (
    name: keyof T,
    customHandlers?: {
      onChangeText?: (text: string) => void;
      onBlur?: () => void;
    },
  ) => {
    const value = values[name];
    const onChangeText = (text: string) => {
      handleChangeText(name, text);
      customHandlers?.onChangeText?.(text);
    };
    const onBlur = () => {
      handleBlur(name);
      customHandlers?.onBlur?.();
    };

    return {value, onChangeText, onBlur};
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return {values, errors, touched, getTextInputProps};
}

export default useForm;

import React from 'react';
import { FormikProps } from 'formik';

import FormControl from '@components/FormControl';
import TextInput from './TextInput';

type InputProps = Omit<React.ComponentProps<typeof TextInput>, 'name' | 'type'>;

type Props = InputProps & {
  name: string;
  type?: string;
  hideError?: boolean;
  error?: string;
  formikState: FormikProps<any>;
};

function TextInputFormik({
  id,
  className,
  name,
  error: customError,
  type = 'text',
  hideError,
  formikState,
  ...rest
}: Props) {
  const field = formikState.getFieldProps(name);
  const meta = formikState.getFieldMeta(name);

  const error = customError ?? meta.touched ? meta.error : '';
  const { value, onChange, onBlur } = field;

  return (
    <FormControl className={className} error={error}>
      <TextInput
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={Boolean(error)}
        {...rest}
      />
    </FormControl>
  );
}

export default TextInputFormik;

import React from 'react';
import { FormikProps } from 'formik';

import FormControl from '@components/FormControl';
import Select from './Select';

type InputProps = Omit<React.ComponentProps<typeof Select>, 'name'>;

type Props = InputProps & {
  name: string;
  type?: string;
  hideError?: boolean;
  error?: string;
  formikState: FormikProps<any>;
};

function SelectFormik({
  id,
  className,
  name,
  error: customError,
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
      <Select
        id={id}
        name={name}
        defaultValue={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={Boolean(error)}
        {...rest}
      />
    </FormControl>
  );
}

export default SelectFormik;

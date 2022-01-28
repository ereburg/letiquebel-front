import { FormikErrors } from 'formik';

import { CheckoutOrder } from './Checkout.types';

import { requiredMessage, validators } from '@utils/validation';
import { hasKey } from '@utils/common';

export function handleValidation(
  values: CheckoutOrder
): FormikErrors<CheckoutOrder> {
  const errors: FormikErrors<CheckoutOrder> = {};

  if (validators.required(values.name)) {
    errors.name = requiredMessage;
  }

  if (validators.required(values.phone)) {
    errors.phone = requiredMessage;
  } else if (validators.phone(values.phone)) {
    errors.phone = 'Неверный номер телефона';
  }

  if (validators.required(values.email)) {
    errors.email = requiredMessage;
  } else if (validators.email(values.email)) {
    errors.email = 'Неверный email адрес';
  }

  ['region', 'area', 'locality', 'street', 'house'].forEach((key) => {
    if (!hasKey(values.delivery, key)) return;

    if (validators.required(`${values.delivery[key]}`)) {
      errors.delivery = errors.delivery || {};
      errors.delivery[key] = requiredMessage;
    }
  });

  return errors;
}

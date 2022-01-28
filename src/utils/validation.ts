export const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const PHONE_REGEXP = /^\+?[ \(\)\-\d]+$/;

export const requiredMessage = 'Вы не заполнили поле';

export const validators = {
  required(value: string) {
    return !value.trim();
  },
  email(value: string) {
    return !EMAIL_REGEXP.test(value);
  },
  phone(value: string) {
    return !PHONE_REGEXP.test(value);
  },
};

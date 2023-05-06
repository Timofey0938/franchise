import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup
    .string()
    .required('Введите адрес электронной почты')
    .email('Проверьте адрес электронной почты'),
  password: yup
    .string()
    .required('Введите пароль'),
}).required();
import * as yup from 'yup';
import YupPassword from 'yup-password';
import 'yup-phone';

YupPassword(yup);

export const schema = yup.object().shape({
  email: yup
    .string()
    .required('Введите адрес электронной почты')
    .email('Проверьте адрес электронной почты'),
  password: yup
    .string()
    .password()
    .required('Введите пароль')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .minLowercase(1, 'Пароль должен содержать хотя бы 1 строчную букву')
    .minUppercase(1, 'Пароль должен содержать хотя бы 1 заглавную букву')
    .minNumbers(1, 'Пароль должен содержать хотя бы 1 цифру')
    .minSymbols(1, 'Пароль должен содержать хотя бы 1 символ'),
  confirmPassword: yup.string()
    .required('Повторите пароль')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
  lastName: yup.string()
    .required('Введите фамилию')
    .min(1, 'Слишком короткая фамилия')
    .max(100, 'Слишком длинная фамилия'),
  firstName: yup.string()
    .required('Введите имя')  
    .min(1, 'Слишком короткое имя')
    .max(100, 'Слишком длинное имя'),
  middleName: yup.string()
    .max(100, 'Слишком длинное отчество'),
  phoneNumber: yup.string()
    .phone('RU', true, 'Проверьте номер телефона')
    .required('Введите номер телефона'),
  sex: yup.string(),
  birthDate: yup.date()
    .required()
    .min(new Date(
      new Date().setFullYear(new Date().getFullYear() - 100)),
      'Вы не староваты для создания франшизы?'
    )
    .max(new Date(new Date().setFullYear(
      new Date().getFullYear() - 18)),
      'Вы не слишком молоды для создания франшизы?'
    )
    .typeError('Введите дату рождения'),
  passportSeries: yup.string()
    .required('Введите серию паспорта')
    .matches(/^[0-9]{4}$/, 'Проверьте серию паспорта'),
  passportNumber: yup.string()
    .required('Введите номер паспорта')
    .matches(/^[0-9]{6}$/, 'Проверьте номер паспорта'),
  passportIssueDate: yup.date()
    .required('Введите дату выдачи паспорта')
    .min(new Date(
      new Date().setFullYear(new Date().getFullYear() - 100)),
      'Проверьте дату выдачи паспорта'
    )
    .max(new Date(), 'Проверьте дату выдачи паспорта')
    .typeError('Введите дату выдачи паспорта'),
  passportIssuePlace: yup.string()
    .required('Укажите место выдачи')
    .max(1000, 'Превышен лимит символов'),
}).required();
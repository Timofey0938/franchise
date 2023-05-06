import * as yup from 'yup';
import 'yup-phone';

export const schema = yup.object().shape({
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
  email: yup.string()
    .required('Введите адрес электронной почты')
    .email('Проверьте адрес электронной почты'),
  phoneNumber: yup.string()
    .phone('RU', true, 'Проверьте номер телефона')
    .required('Введите номер телефона'),
  sex: yup.string(),
  birthDate: yup.date()
    .required('Введите дату рождения')
    .min(new Date(
      new Date().setFullYear(new Date().getFullYear() - 100)),
      'Вы не староваты для покупки франшизы?'
    )
    .max(new Date(new Date().setFullYear(
      new Date().getFullYear() - 18)),
      'Вы не слишком молоды для покупки франшизы?'
    ),
  passportSeries: yup.string()
    .required('Введите серию паспорта')
    .min(4, 'Проверьте серию паспорта')
    .max(4, 'Проверьте серию паспорта')
    .matches(/^[0-9]{4}$/, 'Проверьте серию паспорта'),
  passportNumber: yup.string()
    .required('Введите номер паспорта')
    .min(6, 'Проверьте номер паспорта')
    .max(6, 'Проверьте номер паспорта')
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
import * as yup from 'yup';
import YupPassword from 'yup-password';
import 'yup-phone';

YupPassword(yup);

export const schema = yup.object().shape({
  name: yup.string()
    .required('Введите название')
    .max(100, 'Слишком длинное название'),
  shortDescription: yup.string()
    .required('Введите краткое описание')
    .max(100),
  description: yup.string()
    .required('Введите описание'),
  investment: yup.number()
    .required('Укажите размер инвестиций')
    .moreThan(-1, 'Размер инвестиций не может быть отрицательным')
    .typeError('Укажите размер инвестиций'),
  profit: yup.number()
    .required('Укажите прибыль')
    .moreThan(-1, 'Прибыль не может быть отрицательной')
    .typeError('Укажите прибыль'),
  paybackTime: yup.number()
    .required('Укажите срок окупаемости')
    .moreThan(-1, 'Срок окупаемости не может быть отрицательным')
    .typeError('Укажите срок окупаемости'),
  startYear: yup.number()
    .required('Укажите год создания')
    .moreThan(-1, 'Год не может быть отрицательным')
    .max(new Date().getFullYear(), 'Проверьте год создания')
    .typeError('Укажите год создания'),
  numOpen: yup.number()
    .required('Укажите количество открытых франшиз')
    .moreThan(-1, 'Количество открытых франшиз не может быть отрицательным')
    .typeError('Укажите количество открытых франшиз'),
  lumpSumPayment: yup.number()
    .required('Укажите размер паушального взноса')
    .moreThan(-1, 'Паушальный взнос не может быть отрицительным')
    .typeError('Укажите размер паушального взноса'),
  royalty: yup.number()
    .required('Укажите роялти')
    .moreThan(-1, 'Раялти не может быть отрицительным')
    .typeError('Укажите роялти'),
}).required();
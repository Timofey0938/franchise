import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormController from 'components/Form/FormController/FormController';
import Button from 'components/Form/Button/Button';
import moment from 'moment';
import { schema } from './schema';
import styles from './Form.module.scss';

const Form = ({ profile }) => {
  const [buttonName, setButtonName] = useState('Редактировать');
  const [editing, setEditing] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      lastName: profile.lastName,
      firstName: profile.firstName,
      middleName: profile.middleName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      birthDate: moment(profile.birthDate).format('YYYY-MM-DD'),
      sex: profile.sex,
      passportSeries: profile.passportSeries,
      passportNumber: profile.passportNumber,
      passportIssueDate: moment(profile.passportIssueDate).format('YYYY-MM-DD'),
      passportIssuePlace: profile.passportIssuePlace,
    }
  });

  const clickHandler = () => {
    if (editing) {
      cancelEditing();
      handleSubmit(onSubmit);
    } else {
      setEditing(true);
      setButtonName('Сохранить');
    }
  }

  const cancelEditing = () => {
    setEditing(false);
    setButtonName('Редактировать');
  }

  const onSubmit = data => {
    // const formatedDate = moment(new Date(data.birthDate)).format('YYYY-MM-DD');
    // submitHandler({...data, birthDate: formatedDate});
  }

  return (
    <form>
      <FormController
        name='lastName'
        label='Фамилия'
        register={register}
        errors={errors}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='firstName'
        label='Имя'
        register={register}
        errors={errors}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='middleName'
        label='Отчество'
        register={register}
        errors={errors}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='birthDate'
        label='Дата рождения'
        type='date'
        register={register}
        errors={errors}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='email'
        label='Электронная почта'
        register={register}
        errors={errors}
        inline={true}
        disabled={!editing}
        margin='bottom'
      />

      <FormController
        name='phoneNumber'
        label='Номер телефона'
        type='phone'
        register={register}
        errors={errors}
        control={control}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='sex'
        label='Пол'
        type='radio'
        control={control}
        register={register}
        errors={errors}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='passportSeries'
        label='Серия'
        type='number'
        register={register}
        errors={errors}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='passportNumber'
        label='Номер'
        type='number'
        register={register}
        errors={errors}
        control={control}
        margin='bottom'
        disabled={!editing}
      />
        
      <FormController
        name='passportIssuePlace'
        label='Кем выдан'
        register={register}
        errors={errors}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='passportIssueDate'
        label='Дата выдачи'
        type='date'
        register={register}
        errors={errors}
        control={control}
        margin='bottom'
        disabled={!editing}
      />

      <div className={styles.block}>
        {editing ? (
          <Button
            text='Отменить'
            width='45%'
            color='gray'
            onClick={cancelEditing}
          />
        ) : (
          <div className={styles.emptySpace} />
        )}

        <Button
          text={buttonName}
          width='45%'
          onClick={clickHandler}
        />
      </div>
    </form>
  );
}

export default Form;
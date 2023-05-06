import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import FormController from 'components/Form/FormController/FormController';
import Button from 'components/Form/Button/Button';
import classNames from 'classnames';
import styles from './Form.module.scss';

const Form = ({ submitHandler, loading, formError }) => {
  console.log('form error', formError);
  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      sex: 'Мужской',
    }
  });

  const onSubmit = data => {
    console.log('on submit');
    submitHandler(data);
  };

  return (
    <form>
      <div className={styles.title}>Данные о пользователе:</div>
      <div className={styles.block}>
        <FormController
          name='email'
          label='Электронная почта'
          register={register}
          errors={errors}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='birthDate'
          label='Дата рождения'
          type='date'
          register={register}
          errors={errors}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='password'
          label='Пароль'
          type='password'
          register={register}
          errors={errors}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='confirmPassword'
          label='Пароль еще раз'
          type='password'
          register={register}
          errors={errors}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='lastName'
          label='Фамилия'
          register={register}
          errors={errors}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='firstName'
          label='Имя'
          register={register}
          errors={errors}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='middleName'
          label='Отчество'
          register={register}
          errors={errors}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='phoneNumber'
          label='Номер телефона'
          type='phone'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='sex'
          label='Пол'
          type='radio'
          control={control}
          register={register}
          errors={errors}
          isRequired={true}
        />
      </div>

      <FormController
        name='about'
        label='О себе'
        type='text-area'
        control={control}
        register={register}
        errors={errors}
        isRequired={true}
        margin='bottom'
      />

      <FormController
        name='experience'
        label='Опыт'
        type='text-area'
        control={control}
        register={register}
        errors={errors}
        isRequired={true}
      />

      <div className={classNames(styles.title, styles.marginTop)}>Данные паспорта:</div>
      <div className={styles.block}>
        <FormController
          name='passportSeries'
          label='Серия'
          type='number'
          register={register}
          errors={errors}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='passportNumber'
          label='Номер'
          type='number'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='passportIssuePlace'
          label='Кем выдан'
          register={register}
          errors={errors}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='passportIssueDate'
          label='Дата выдачи'
          type='date'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
        />
      </div>
      
      {formError !== '' && (
        <div className={styles.formError}>{formError}</div>
      )}

      <Button
        text='Регистрация'
        onClick={handleSubmit(onSubmit)}
        style={{ marginTop: 20 }}
        isLoading={loading}
      />
    </form>
  );
}

export default Form;
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormController from 'components/Form/FormController/FormController';
import Button from 'components/Form/Button/Button';
import { schema } from './schema';
import classNames from 'classnames';
import styles from './Form.module.scss';

const Form = ({ submitHandler, loading, formError }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      sex: 'Мужской',
    }
  });

  const onSubmit = data => {
    console.log('submit reg owner', data);  
    submitHandler(data);
  };

  return (
    <form>
      <div className={styles.title}>Данные о представителе:</div>
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
          name='sex'
          label='Пол'
          type='radio'
          control={control}
          register={register}
          errors={errors}
          isRequired={true}
          margin='right'
        />
      </div>

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
        text='Перейти к созданию франшизы'
        onClick={handleSubmit(onSubmit)}
        isLoading={loading}
        style={{ marginTop: 20 }}
      />
    </form>
  );
}

export default Form;
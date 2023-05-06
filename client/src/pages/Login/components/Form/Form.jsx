import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import FormController from 'components/Form/FormController/FormController';
import Button from 'components/Form/Button/Button';
import styles from './Form.module.scss';

const Form = ({ submitHandler, loading, formError }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log('login on sub', data)
    submitHandler(data);
  }

  return (
    <form>
      <FormController
        name='email'
        label='Электронная почта'
        register={register}
        errors={errors}
        isRequired={true}
        margin='bottom'
      />

      <FormController
        name='password'
        label='Пароль'
        type='password'
        register={register}
        errors={errors}
        isRequired={true}
        margin='bottom'
      />

      {formError !== '' && (
        <div className={styles.formError}>{formError}</div>
      )}

      <Button
        text='Войти'
        onClick={handleSubmit(onSubmit)}
        isLoading={loading}
        mt={20}
      />
    </form>
  );
}

export default Form;

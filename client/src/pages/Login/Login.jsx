import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRequest } from 'hooks/useRequest';
import { useAuth } from 'hooks/useAuth';
import Form from './components/Form/Form';
import { baseUrl } from 'config';
import styles from './Login.module.scss';

const Login = () => {
  const user = useAuth();
  const { loading, request, error, clearError } = useRequest();
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
    clearError();
  }, [error, clearError]);

  const loginHandler = async (userData) => {
    setFormError('');
    try {
      console.log(userData);
      const res = await request(baseUrl + '/auth/login', 'POST', userData);
      user.login(res.token, res.userId, res.role, res.hasFranchise);
    } catch (error) {
      console.log('Ошибка входа', error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.title}>Вход</div>
      <Form submitHandler={loginHandler} loading={loading} formError={formError} />
      <div className={styles.register}>
        Нет аккаунта? &nbsp;
        <Link to='/register' className={styles.link}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  )
}

export default Login;
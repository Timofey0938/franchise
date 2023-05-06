import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'hooks/useRequest';
import { useAuth } from 'hooks/useAuth';
import Container from 'components/Container/Container';
import Form from './components/Form/Form';
import { baseUrl } from 'config';
import { ADMIN, OWNER } from 'constants/roles';
import styles from './Register.module.scss';

const Register = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const { loading, request, error, clearError } = useRequest();
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
    clearError();
  }, [error, clearError]);

  const registerHandler = async (userData) => {
    setFormError('');
    try {
      const res = await request(baseUrl + '/auth/register', 'POST', userData);
      user.login(res.token, res.userId, res.role);
      if (res.role === ADMIN) {
        navigate('/company-applications');
      } else if (res.role === OWNER) {
        navigate('/owner-account');
      } else {
        navigate('/user-account');
      }
    } catch (error) {
      console.log('Ошибка регистрации');
    }
  };

  return (
    <Container title='Регистрация'>
      <Form submitHandler={registerHandler} loading={loading} formError={formError} />
      <div className={styles.login}>
        Есть аккаунт? &nbsp;
        <Link to='/login' className={styles.link}>
          Войти
        </Link>
      </div>
    </Container>
  )
}

export default Register;
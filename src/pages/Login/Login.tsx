import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { useAppDispatch } from '../../hooks/redux';
import { setUser } from '../../store/slices/UserSlice';
import styles from './Login.module.scss';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = (username: string, email: string, password: string) => {
    // login
    const id = 88;
    const token = 'jfsiad984j';
    dispatch(setUser({ username, email, password, id, token }));
    navigate('/account');
  }

  return (
    <div className={styles.login}>
      Войти
      <Form buttonTitle='Войти' submitHandler={loginHandler}/>
      <div>Нет аккаунта?<Link to='/register'>Зарегистрироваться</Link></div>
    </div>
  )
}

export default Login;
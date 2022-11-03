import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { useAppDispatch } from '../../hooks/redux';
import { setUser } from '../../store/slices/UserSlice';
import styles from './Register.module.scss';

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerHandler = (username: string, email: string, password: string) => {
    // registration
    const id = 77;
    const token = 'ttt984ttt';
    dispatch(setUser({ username, email, password, id, token }));
    navigate('/account');
  }

  return (
    <div className={styles.register}>
      Регистрация
      <Form buttonTitle='Зарегистрироваться' submitHandler={registerHandler}/>
      <div>Есть аккаунт?<Link to='/login'>Войти</Link></div>
    </div>
  )
}

export default Register;
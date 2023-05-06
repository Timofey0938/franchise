import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'hooks/useRequest';
import { useAuth } from 'hooks/useAuth';
import Form from './components/Form/Form';
import Container from 'components/Container/Container';
import { baseUrl } from 'config';

const RegisterOwner = () => {
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

  const registerHandler = async (ownerData) => {
    setFormError('');
    try {
      const res = await request(baseUrl + '/auth/register-owner', 'POST', ownerData);
      user.login(res.token, res.userId, res.role);
      navigate('/create-franchise');
    } catch (error) {
      console.log('Ошибка регистрации');
    }
  };

  return (
    <Container title='Регистрация представителя франшизы'>
      <Form
        submitHandler={registerHandler}
        loading={loading}
        formError={formError}
      />
    </Container>
  )
}

export default RegisterOwner;
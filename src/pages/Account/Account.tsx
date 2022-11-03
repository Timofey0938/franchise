import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Account: FC = () => {
  const {isAuth, username, email, id, token} = useAuth();
  console.log(isAuth, username, email, id, token);

  return isAuth ? (
    <div>
      <div>Account</div>
      <p>{username}</p>
      <p>{email}</p>
      <p>{id}</p>
      <p>{token}</p>
    </div>
  ) : (
    <Navigate replace to='/login' />
  );
}

export default Account;

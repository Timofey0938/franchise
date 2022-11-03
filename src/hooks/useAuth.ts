import { useAppSelector } from './redux';
import { selectUser } from '../store/selectors';

export const useAuth = () => {
  const { username, email, token, id } = useAppSelector(selectUser);

  return {
    isAuth: !!username,
    username,
    email,
    token,
    id,
  }
}
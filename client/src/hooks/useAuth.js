import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'store/selectors';
import { setUser, addFranchise, removeUser } from 'store/slices/UserSlice';
import { USER, OWNER, ADMIN } from 'constants/roles';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, userId, role, franchiseId } = useSelector(selectUser);

  const login = (token, userId, role, franchiseId = null) => {
    dispatch(setUser({ token, userId, role, franchiseId }));
    if (role === ADMIN) {
      navigate('/franchise-applications');
    } else if (role === OWNER) {
      navigate('/my-franchise');
    } else {
      navigate('/my-applications');
    }
  };

  const setFranchise = ({ franchiseId }) => {
    dispatch(addFranchise({ franchiseId }));
    franchiseId = franchiseId;
  };

  const logout = () => {
    dispatch(removeUser());
  };

  return {
    isAuth: !!token,
    id: userId,
    isUser: role === USER,
    isOwner: role === OWNER,
    isAdmin: role === ADMIN,
    franchiseId,
    login,
    setFranchise,
    logout,
  }
}
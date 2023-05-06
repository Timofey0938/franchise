import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@chakra-ui/react';
import {
  VscAccount,
  VscHeart,
  VscBriefcase,
  VscBook,
  VscSignOut,
  VscSignIn,
  VscSymbolFile,
  VscSymbolConstant
} from 'react-icons/vsc';
import { BiPlusCircle } from 'react-icons/bi';
import { useAuth } from 'hooks/useAuth';
import classNames from 'classnames';
import styles from './Header.module.scss';

const Header = () => {
  let user = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    user.logout();
    navigate('/login');
  };

  return (
    <div className={styles.header}>
      <div className={styles.navigation}>
        <Link to='/'>
          <div className={styles.logo}>
            Фран<span className={styles.firstLetter}>шиза</span>
          </div>
        </Link>
        <Link to='/search' className={styles.catalogLink} >
          <Icon as={VscSymbolConstant} className={styles.icon} />
          <div className={styles.catalog}>Каталог</div>
        </Link>
      </div>
      <div>
        <div className={styles.account}>
          {!user.isAuth && (
            <>
              <Link to='/register-owner' className={classNames(styles.link, styles.small)}>
                <Icon as={BiPlusCircle} className={styles.icon} />
                <div>Добавить франшизу</div>
              </Link>
              <Link to='/login' className={styles.link}>
                <Icon as={VscSignIn} className={styles.icon} />
                <div>Войти</div>
              </Link>
            </>
          )}
          {user.isUser && (
            <>
              <Link to='/user-account' className={styles.link}>
                <Icon as={VscAccount} className={styles.icon} />
                <div>Профиль</div>
              </Link>
              <Link to='/favorite' className={styles.link}>
                <Icon as={VscHeart} className={styles.icon} />
                <div>Избранное</div>
              </Link>
              <Link to='/my-applications' className={styles.link}>
                <Icon as={VscSymbolFile} className={styles.icon} />
                <div>Мои заявки</div>
              </Link>
              <Link to='/education' className={styles.link}>
                <Icon as={VscBook} className={styles.icon} />
                <div>Обучение</div>
              </Link>
            </>
          )}
          {user.isOwner && (
            <>
              <Link to='/owner-account' className={styles.link}>
                <Icon as={VscAccount} className={styles.icon} />
                <div>Профиль</div>
              </Link>
              {user.franchiseId ? (
                <Link to='/my-franchise' className={styles.link}>
                  <Icon as={VscBriefcase} className={styles.icon} />
                  <div>Моя франшиза</div>
                </Link>
              ) : (
                <Link to='/create-franchise' className={styles.link}>
                  <Icon as={VscHeart} className={styles.icon} />
                  <div>Добавить франшизу</div>
                </Link>
              )}
              <Link to='/develop-applications' className={styles.link}>
                <Icon as={VscSymbolFile} className={styles.icon} />
                <div>Заявки</div>
              </Link>
            </>
          )}
          {user.isAdmin && (
            <>
              <Link to='/franchise-applications' className={styles.link}>
                <Icon as={VscAccount} className={styles.icon} />
                <div>Заявки франшиз</div>
              </Link>
            </>
          )}
          {user.isAuth && (
            <div className={styles.link} onClick={logOut}>
              <Icon as={VscSignOut} className={styles.icon} />
              <div>Выйти</div>
            </div>
          )}     
        </div>
      </div>
    </div>
  );
};

export default Header;
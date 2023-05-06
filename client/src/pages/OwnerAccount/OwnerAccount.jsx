import { useState, useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useRequest } from 'hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from 'config';
import Container from 'components/Container/Container';
import Loader from 'components/Loader/Loader';
import Button from 'components/Form/Button/Button';
import Form from './components/Form/Form';
import styles from './OwnerAccount.module.scss';

const OwnerAccount = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequest();
  const user = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await request(`${baseUrl}/profile/owner/${user.id}`);
      setProfile(data);
    }

    fetchProfile();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!profile ? (
            <div>Ошибка загрузки</div>
          ) : (
            <div className={styles.wrapper}>
              <Container title='Профиль' style={{ width: 550 }}>
                <Form profile={profile} />
              </Container>
              <Container title='&nbsp;' style={{ width: 250, marginLeft: 20 }}>
                <div className={styles.avatarBox}>
                  <img className={styles.image} src='/files/empty-avatar.jpg' alt='' />
                </div>
                <Button
                  text='Сменить фото'
                  onClick={() => console.log('change avatar')}
                />
              </Container>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default OwnerAccount;
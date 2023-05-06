import { useState, useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useRequest } from 'hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from 'config';
import Container from 'components/Container/Container';
import Loader from 'components/Loader/Loader';
import Button from 'components/Form/Button/Button';
import Form from './components/Form/Form';
import MediaForm from './components/MediaForm/MediaForm';
import styles from './MyFranchise.module.scss';

const MyFranchise = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequest();
  const user = useAuth();
  const [franchise, setFranchise] = useState(null);

  useEffect(() => {
    console.log(user);
    if (!user.franchiseId) {
      navigate('/create-franchise');
      return;
    }

    const fetchFranchise = async () => {
      const data = await request(`${baseUrl}/franchise/${user.franchiseId}`);
      console.log(data);
      setFranchise(data);
    };

    fetchFranchise();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        !franchise ? (
          <div>Ошибка загрузки</div>
        ) : (
          <div className={styles.wrapper}>
            <Container title='Франшиза' style={{ width: 550 }}>
              <Form franchise={franchise} />
            </Container>
            <div className={styles.mediaWrapper}>
              <Container title='&nbsp;' style={{ width: 340 }}>
                <img className={styles.cover} src={`/files/${franchise.cover}`} alt='' />
                <Button
                  text='Сменить фото'
                  onClick={() => console.log('change cover')}
                />
              </Container>
              <Container title='&nbsp;' style={{ width: 340 }}>
                <MediaForm />
                <Button
                  text='Сохранить'
                  onClick={() => console.log('save media')}
                />
              </Container>
            </div>
          </div>
        ))}
     </>
   );
}

export default MyFranchise;
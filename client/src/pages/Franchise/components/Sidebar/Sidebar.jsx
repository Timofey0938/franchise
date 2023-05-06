import { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { useAuth } from 'hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Icon, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import Button from 'components/Form/Button/Button';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { baseUrl } from 'config';
import styles from './Sidebar.module.scss';

const Sidebar = ({ franchiseId, isFavorite, views, purchases }) => {
  const navigate = useNavigate();
  const user = useAuth();

  const [favorite, setFavorite] = useState(isFavorite);
  const [applicationActive, setApplicationActive] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [experience, setExperience] = useState('');
  const [appied, setApplied] = useState(false);

  const formNotFilled = motivation.trim() === '' || experience.trim() === '';

  const apply = () => {
    setApplicationActive(false);
    axios.post(
      `${baseUrl}main/v1/franchise/${franchiseId}/create_develop_application`,
      {
        profile: user.profileId,
        franchise: franchiseId,
        experience_desc: experience,
        motivation_desc: motivation,
      },
      {
        headers: {
          'Authorization': `JWT ${user.token}`,
        }
      }
    );
    setApplied(true);
  }

  const addToFavorite = () => {
    axios.post(`${baseUrl}/profile/user/${user.id}/add-to-favorites/${franchiseId}`);
    setFavorite(true);
  };

  const removeFromFavorite = () => {
    axios.delete(`${baseUrl}/profile/user/${user.id}/remove-from-favorites/${franchiseId}`);
    setFavorite(false);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.views}>Просмотров: <span>{views}</span></div>
      <div className={styles.purchases}>Покупок через сервис: <span>{purchases}</span></div>
      {(user.isAuth && !user.ownerProfileId && !user.isAdmin) ? (
        <>
          {!(applicationActive || appied) && (
            <>
              <Button
                text='Подать заявку'
                onClick={() => setApplicationActive(true)}
              />
              {favorite ? (
                <div
                  className={classNames(styles.toFavorite, styles.favorite)}
                  onClick={removeFromFavorite}
                >
                  <Icon as={BsSuitHeartFill} className={styles.icon}/>
                  <div>В избранном</div>
                </div>
              ) : (
                <div className={styles.toFavorite} onClick={addToFavorite}>
                  <Icon as={BsSuitHeart} className={styles.icon}/>
                  <div>В избранное</div>
                </div>
              )}
            </>
          )}

          {applicationActive && (
            <>
              <div className={styles.applicationTitle}>Создание заявки:</div>
              <FormControl className={styles.formControl}>
                <FormLabel>Расскажите о себе:</FormLabel>
                <Textarea value={motivation} onChange={e => setMotivation(e.target.value)} />
              </FormControl>
              <FormControl className={styles.formControl}>
                <FormLabel>Расскажите о своем опыте:</FormLabel>
                <Textarea value={experience} onChange={e => setExperience(e.target.value)} />
              </FormControl>
              <Button
                text='Подать заявку'
                disabled={formNotFilled}
                style={{ marginTop: 20 }}
                onClick={apply}
              />
              <Button
                text='Отмена'
                color='gray'
                style={{ marginTop: 10 }}
                onClick={() => setApplicationActive(false)}
              />
            </>
          )}

          {appied && (
            <>
              <div className={styles.applied}>Заявка подана</div>
            </>
          )}
        </>
      ) : (
        <>
          <Button
            text='Подать заявку'
            disabled
          />
          {(user.isAuth && !user.profileId) && (
            <div className={styles.login}>
              <Link to='/create-user-profile' className={styles.link}>
                Заполните профиль
              </Link>
              , чтобы подать заявку
            </div>
          )}
          {!user.isAuth && (
            <div className={styles.login}>
              <Link to='/login' className={styles.link}>
                Войдите
              </Link>
              , чтобы подать заявку</div>
          )}
        </>
      )}
    </div>
  );
}

export default Sidebar;
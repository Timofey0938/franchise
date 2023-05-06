import { useState, useEffect } from 'react';
import { useRequest } from 'hooks/useRequest';
import Container from 'components/Container/Container';
import Button from 'components/Form/Button/Button';
import { Icon, Input } from '@chakra-ui/react';
import { IoMdReturnLeft } from 'react-icons/io';
import Loader from 'components/Loader/Loader';
import { baseUrl } from 'config';
import moment from 'moment';
import styles from './Application.module.scss';

const Application = ({ accept, reject, id, franchiseId, ownerId }) => {
  const { request, loading } = useRequest();

  const [franchise, setFranchise] = useState(null);
  const [profile, setProfile] = useState(null);
  const [result, setResult] = useState(null);
  const [cancel, setCancel] = useState(false);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchFranchise = async () => {
      let data = await request(`${baseUrl}/franchise/${franchiseId}`);
      console.log(data);
      setFranchise(data);
    }

    const fetchProfile = async () => {
      const data = await request(`${baseUrl}/profile/owner/${ownerId}`);
      console.log(data);
      setProfile(data);
    }

    fetchProfile();
    fetchFranchise();
  }, []);

  return (
    <Container style={{ marginBottom: 30 }}>
    {loading ? (
      <Loader />
    ) : (
      <>
        {!franchise || !profile ? (
          <div>Ошибка загрузки</div>
        ) : (
          <div className={styles.application}>
            {result === null ? (
              <>
                <>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {!franchise || !profile ? (
                      <div>Ошибка загрузки</div>
                    ) : (
                      <>
                        <div className={styles.block}>
                          <img className={styles.image} src={`/files/${franchise.cover}`} alt='' />
                          <div className={styles.info}>
                            <div className={styles.name}>{franchise.name}</div>
                            <div>{franchise.shortDescription}</div>
                            <div>Год основания: {franchise.startYear}</div>
                            <div>Инвестиции: {franchise.investment}₽</div>
                            <div>Срок окупаемости: {franchise.paybackTime}</div>
                            <div>Роялти: {franchise.royalty}%</div>
                            <div>Прибыль: {franchise.profit}₽</div>
                            <div>Паушальный взнос: {franchise.lumpSumPayment}</div>
                            <div>Количество открытых: {franchise.numOpen}</div>
                          </div>
                        </div>
                        <div>
                          <div>Описание:</div>
                          <div className={styles.description}>{franchise.description}</div>
                          <div>Категории:</div>
                          <div className={styles.categories}>
                            {franchise.categories.length > 0 ? franchise.categories.join(', ') : 'Нет категорий'}.</div>

                          <div className={styles.name}>
                            {profile.lastName}&nbsp;
                            {profile.firstName}&nbsp;
                            {profile.middleName}
                          </div>
                          <div>{moment(profile.birthDate).format('DD.MM.YYYY')}</div>
                          <div>Пол: {profile.sex}</div>
                          <div>Телефон: {profile.phoneNumber}</div>
                          <div>Паспорт: {profile.passportSeries}&nbsp;{profile.passportNumber}</div>
                          <div>
                            Выдан {profile.passportIssuePlace}&nbsp;
                            {moment(profile.passportIssueDate).format('DD.MM.YYYY')}
                          </div>
                          <div className={styles.company}>Компания: {franchise.companyName}</div>
                        </div>
                      </>
                    )}
                  </>
                )}
                </>
                {!cancel && <div className={styles.buttons}>
                  <Button
                    text='Отклонить'
                    color='gray'
                    width='40%'
                    onClick={() => setCancel(true)}
                  />
                  <Button
                    text='Принять'
                    width='40%'
                    onClick={() => {
                      accept(id);
                      setResult('принято')
                    }}
                  />
                </div>}
                {cancel && <div className={styles.cancelPanel}>
                  <div
                    className={styles.returnButton}
                    onClick={() => setCancel(false)}
                  >
                    <Icon as={IoMdReturnLeft} />
                  </div>
                  <Input
                    className={styles.input}
                    placeholder='Причина отказа'
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                  />
                  <Button
                    text='Отклонить'
                    width='30%'
                    disabled={reason === ''}
                    onClick={() => {
                      reject(id, reason);
                      setResult('отклонено')
                    }}
                  />
                </div>}
              </>
            ) : (
              <div className={styles.result}>
                {result === 'принятно' ? 'Заявка принята' : (
                  <>
                    'Заявка отклонена по причине:'
                    <p className={styles.reason}>"{reason}"</p>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </>
    )}
    </Container>
    
  );
}

export default Application;

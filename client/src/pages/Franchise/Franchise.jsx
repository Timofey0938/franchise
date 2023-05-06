import { useAuth } from 'hooks/useAuth';
import { useRequest } from 'hooks/useRequest';
import { useState, useEffect } from 'react';
import { baseUrl } from 'config';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import star from 'assets/icons/star.png';
import Gallery from 'react-photo-gallery';
import Sidebar from './components/Sidebar/Sidebar';
import Loader from 'components/Loader/Loader';
import styles from './Franchise.module.scss';

const Franchise = () => {
  const params = useParams();
  const { request, loading } = useRequest();
  const navigate = useNavigate();
  const user = useAuth();

  const [franchise, setFranchise] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [creator, setCreator] = useState(null);
  const [company, setCompany] = useState(null);
  const [applicationActive, setApplicationActive] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [experience, setExperience] = useState('');
  const [appied, setApplied] = useState(false);

  useEffect(() => {
    const fetchFranchise = async () => {
      const queryString = user.isUser ? `?userId=${user.id}` : ''
      console.log(queryString);
      let data = await request(`${baseUrl}/franchise/${params.id + queryString}`);
      
      if (user.isUser) {
        setFavorite(data.isFavorite);
        data = data.franchise;
      }
      console.log(data);
      setFranchise(data);
    }

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
            <div className={styles.franchise}>
              <div className={styles.header}>
                <div className={styles.title}>{franchise.name}</div>
                <div className={styles.shortDescription}>
                  {franchise.shortDescription}
                </div>
                <div className={styles.rating}>
                  <img className={styles.star} src={star} alt='' />
                  <div>{franchise.rate}&nbsp;&nbsp;</div>
                  <div className={styles.rateCount}>(Оценок: {franchise.rateCount})</div>
                </div>
              </div>
              <div className={styles.info}>
                <img
                  src={`/files/${franchise.cover}`}
                  className={styles.cover}
                  lt=''
                />
                <div className={styles.characteristics}>
                  <div className={styles.investment}>
                    <div className={styles.characteristicTitle}>Инвестиции:</div>
                    <div className={styles.characteristicValue}>{franchise.investment}₽</div>
                  </div>
                  <div className={styles.paybackTime}>
                    <div className={styles.characteristicTitle}>Срок окупаемости:</div>
                    <div className={styles.characteristicValue}>{franchise.paybackTime} месяцев</div>
                  </div>
                  <div className={styles.lumpSumPayment}>
                    <div className={styles.characteristicTitle}>Паушальный взнос:</div>
                    <div className={styles.characteristicValue}>{franchise.lumpSumPayment}₽</div>
                  </div>
                  <div className={styles.royalty}>
                    <div className={styles.characteristicTitle}>Роялти:</div>
                    <div className={styles.characteristicValue}>{franchise.royalty}%</div>
                  </div>
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.subtitle}>Описание франшизы</div>
                <div className={styles.text}>{franchise.description}</div>

                <div className={styles.subtitle}>Галерея</div>
                {/* <Gallery photos={franchise.gallery} /> */}

                <div className={styles.subtitle}>Преимущества</div>
                <div className={styles.text}>{franchise.advantages}</div>

                <div className={styles.subtitle}>Компания</div>
                <div className={styles.companyBox}>
                  <img
                    className={styles.logo}
                    src={`/files/${franchise.logo}`}
                    alt=''
                  />
                  <div>
                    <div className={styles.companyName}>{franchise.companyName}</div>
                    <div className={styles.companyDescription}>{franchise.companyDescription}</div>
                  </div>
                </div>

                <div className={styles.facts}>
                  <div className={styles.fact}>Год основания компании: {franchise.companyStartYear}</div>
                  <div className={styles.fact}>Год основания франшизы: {franchise.startYear}</div>
                  <div className={styles.fact}>Открыто по франшизе: {franchise.numOpen}</div>
                </div>

                <div className={styles.subtitle}>Отзывы</div>
                {franchise.reviews.length === 0 ? (
                  <div className={styles.noReviews}>Нет отзывов</div>
                ) : (
                  <>
                    {franchise.reviews.map(review => (
                      <div className={styles.review}>
                        <div className={styles.title}>
                          <Avatar
                            className={styles.avatar}
                            src={review.profile.avatar}
                            size='sm'
                          />
                          <div className={styles.name}>
                            {review.profile.firstName}&nbsp;{review.profile.lastName}
                          </div>
                        </div>
                        <div className={styles.rate}>
                          <StarRatings
                            numberOfStars={5}
                            rating={review.rate}
                            starSpacing='2px'
                            starDimension='22px'
                            starRatedColor='#FFCC00'
                            starEmptyColor='#CCCCCC'
                            starHoverColor='#FFCC00'
                          />
                          <div className={styles.date}>{review.date}</div>
                        </div>
                        <div className={styles.text}>{review.text}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            <Sidebar
              franchiseId={params.id}
              isFavorite={favorite}
              views={franchise.views}
              purchases={franchise.purchases}
            />
          </div>
        )
      )}
    </>
  );
}

export default Franchise;
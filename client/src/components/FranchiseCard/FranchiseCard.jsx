import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import star from 'assets/icons/star.png';
import classNames from 'classnames';
import { Icon } from '@chakra-ui/react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import styles from './FranchiseCard.module.scss';

const FranchiseCard = ({ franchise, tag = null, isFavorite = null, favoriteHandler }) => {
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(isFavorite);

  const tagColor = tag === 'на рассмотрении' ? 'yellow':
    tag === 'отклонено' ? 'red' : 'green';

  return (
    <div className={styles.card} onClick={() => navigate(`/franchise/${franchise._id}`)}>
      <img
        className={styles.image}
        src={`/files/${franchise.cover}`}
        alt=''
      />
      <div className={styles.info}>
        <div>
          <div className={styles.topBlock}>
            <div className={styles.name}>{franchise.name}</div>
            {tag && <div className={classNames(styles.tag, styles[tagColor])}>{tag}</div>}
            {favorite !== null && (
              <>
                {favorite ? (
                  <div className={styles.favorite} onClick={e => {
                    e.stopPropagation(); 
                    favoriteHandler(franchise._id);
                  }}>
                    <Icon as={BsSuitHeartFill} className={styles.icon}/>
                  </div>
                ) : (
                  <div className={styles.notFavorite} onClick={e => {
                    e.stopPropagation(); 
                    favoriteHandler(franchise._id);
                  }}>
                    <Icon as={BsSuitHeart} className={styles.icon}/>
                  </div>
                )}
              </>
            )}
          </div>
          <div>{franchise.shortDescription ?? ''}</div>
        </div>
        <div className={styles.bottomBlock}>
          <div className={styles.investment}>
            <div>Инвестиции:</div>
            <div className={styles.investAmount}>От {franchise.investment} рублей</div>
          </div>
          <div className={styles.rating}>
            <img className={styles.star} src={star} alt='' />
            <div>{franchise.rating ?? 0}</div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default FranchiseCard;
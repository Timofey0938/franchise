import axios from 'axios';
import { baseUrl } from 'config';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Favorite.module.scss';
import FranchiseCard from 'components/FranchiseCard/FranchiseCard';

const Favorite = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const [franchises, setFranchises] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get(`${baseUrl}/franchises/favorite/${user.id}`);
      console.log(response.data);
      setFranchises(response.data);
    }

    fetchFavorites();
  }, []);

  const removeFromFavorite = (id) => {
    console.log(id);
    axios.delete(`${baseUrl}/profile/user/${user.id}/remove-from-favorites/${id}`);
    setFranchises(franchises.filter(franchise => franchise._id !== id));
  };
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.favorite}>
        <div className={styles.title}>
          {franchises.length > 0 ? 'Избранные франшизы:' : 'Пусто'}
        </div>
        {franchises.length > 0 && (
          franchises.map(franchise => (
            <FranchiseCard
              franchise={franchise}
              isFavorite={true}
              favoriteHandler={removeFromFavorite}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Favorite;
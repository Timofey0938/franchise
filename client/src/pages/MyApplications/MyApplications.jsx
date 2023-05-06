import axios from 'axios';
import { baseUrl } from 'config';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FranchiseCard from 'components/FranchiseCard/FranchiseCard';
import styles from './MyApplications.module.scss';

const MyApplications = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const [franchises, setFranchises] = useState([
    {
      name: 'Цветочный магазин',
      franchise_image: 'http://romaexplorer.pythonanywhere.com/media/franchise_logos/franchise.jpg',
      description: 'Краткое описание франшизы',
      investment: 30000,
      rating: 4.5
    },
    {
      name: 'Магазн компьютеров',
      franchise_image: 'http://romaexplorer.pythonanywhere.com/media/franchise_logos/franchise.jpg',
      description: 'Краткое описание франшизы',
      investment: 40000,
      rating: 4.8
    },
    {
      name: 'Компьютерный клуб',
      franchise_image: 'http://romaexplorer.pythonanywhere.com/media/franchise_logos/franchise.jpg',
      description: 'Краткое описание франшизы',
      investment: 42000,
      rating: 4.6
    },
  ]);

  useEffect(() => {
    if (!user.isAuth) {
      navigate('/');
    }

    // const fetchApplications = async () => {
    //   const response = await axios.get(baseUrl + `main/v1/applications/${type}`, {
    //     headers: {
    //       'Authorization': `JWT ${user.token}`
    //     }
    //   })

    //   const newApplications = response.data.filter(application => application.status === 'На рассмотрении')
    //   setApplications(newApplications);
    // }

    // fetchApplications();
  }, []);

  // console.log('applications: ', type, applications);
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.myFranchiseList}>
        <div className={styles.title}>
          {franchises.length > 0 ? 'Мои франшизы' : 'Пусто'}
        </div>
        <FranchiseCard franchise={franchises[0]} tag='на рассмотрении' />
        <FranchiseCard franchise={franchises[1]} tag='отклонено' />
        <FranchiseCard franchise={franchises[2]} tag='принято' />
        {/* {franchises.length > 0 && (
          franchises.map(franchise => (
            <FranchiseCard franchise={franchise} tag='На рассмотрении' />
          ))
        )} */}
      </div>
    </div>
  )
}

export default MyApplications;
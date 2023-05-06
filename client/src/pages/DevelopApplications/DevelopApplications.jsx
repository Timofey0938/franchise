import axios from 'axios';
import { baseUrl } from 'config';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Application from 'components/DevelopApplication/DevelopApplication';
import DevelopApplication from 'components/DevelopApplication/DevelopApplication';
import styles from './DevelopApplications.module.scss';

const DevelopApplications = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // if (!user.ownerProfileId) {
    //   navigate('/');
    // }

    // const fetchApplications = async () => {
    //   const response = await axios.get(baseUrl + `main/v1/develop_applications`, {
    //     headers: {
    //       'Authorization': `JWT ${user.token}`
    //     }
    //   })

    //   console.log(response.data);
    //   setApplications(response.data);
    // }

    // fetchApplications();
  });

  const accept = async (id) => {
    // const response = await axios.patch(baseUrl + `main/v1/applications/${type}/${id}/review`,{
    //   status: 'Принята',
    // }, {
    //   headers: {
    //     'Authorization': `JWT ${user.token}`
    //   }
    // })
    console.log('Заявка принята');
  }
  
  return (
    <div className={styles.applications}>
      <div className={styles.title}>
        {applications.length > 0 ? 'Заявки на покупку франишзы:' : 'Заявок нет'}
      </div>
      {applications.length > 0 && (
        applications.map(application => (
          <Application
            accept={accept}
            reject={() => console.log('заявка на франшизу отклонена')}
            id={application.id}
            key={application.id}
          >
            <DevelopApplication application={application} />
          </Application>
        ))
      )}
    </div>
  )
}

export default DevelopApplications;
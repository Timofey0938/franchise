import { baseUrl } from 'config';
import { useEffect, useState } from 'react';
import { useRequest } from 'hooks/useRequest';
import Application from './components/Application/Application';
import Loader from 'components/Loader/Loader';
import styles from './FranchiseApplications.module.scss';

const FranchiseApplications = ({ type }) => {
  const { request, loading } = useRequest();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const data = await request(baseUrl + '/applications/');
      setApplications(data);
    }

    fetchApplications();
  }, []);

  const accept = async (id) => {
    const data = await request(baseUrl + `/applications/${id}/accept`, { method: 'POST' });
    console.log(data);
  };

  const reject = async (id, reason) => {
    const data = await request(
      baseUrl + `/applications/${id}/reject`,
      {
        method: 'POST',
        body: {
          reason,
        }
      }
      );
    console.log(data);
  };
  
  return (
    <div className={styles.applications}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.title}>
          {applications.length > 0 ? (
            `Заявки на рассмотрении:`
          ) : 'Заявок нет'}
        </div>
        {applications.length > 0 && (
          applications.map(application => (
            <Application
              accept={accept}
              reject={reject}
              id={application._id}
              franchiseId={application.franchiseId}
              ownerId={application.ownerId}
              key={application._id}
            />
          )))}
        </>
      )}
    </div>
  );
};

export default FranchiseApplications;
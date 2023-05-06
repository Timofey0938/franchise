import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRequest } from 'hooks/useRequest';
import FilterBlock from './components/FilterBlock/FilterBlock';
import SortingBlock from './components/SortingBlock/SortingBlock';
import FranchiseCard from 'components/FranchiseCard/FranchiseCard';
import Loader from 'components/Loader/Loader';
import { baseUrl } from 'config';
import styles from './FranchiseSearch.module.scss';

const FranchiseSearch = () => {
  const { request, loading } = useRequest();

  const [filterConfig, setFilterConfig] = useState({});
  const [sortConfig, setSortConfig] = useState(['purchses', '-1']);
  const [franchises, setFranchises] = useState([]);

  useEffect(() => {
    const fetchFranchises = async () => {
      let queryString = '';

      for (const key in filterConfig) {
        if (key === 'categories' && filterConfig[key].length === 0) {
          continue;
        }
        queryString += queryString === '' ? '?' : '&';
        queryString += `${key}=${filterConfig[key].join(';')}`;
      }
      queryString += (queryString === '' ? '?' : '&') + 'sort=' + sortConfig.join(';');

      const data = await request(baseUrl + '/franchises' + queryString);
      setFranchises(data);
    }

    fetchFranchises();
  }, [filterConfig, sortConfig]);

  return (
    <div className={styles.fanchiseSearch}>
      <FilterBlock setFilterConfig={setFilterConfig} />
      <div className={styles.results}>
        <SortingBlock setSortConfig={setSortConfig} />
        {loading ? (
          <Loader />
        ) : (
          <>
            {franchises.length === 0 ? (
              <div className={styles.nothingFound}>Ничего не нашлось :(</div>
            ) : (
              <div className={styles.franchiseList}>
                {franchises && franchises.map(franchise => (
                  <FranchiseCard franchise={franchise} key={franchise.id} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FranchiseSearch;
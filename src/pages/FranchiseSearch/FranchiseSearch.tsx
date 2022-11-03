import { FC } from 'react';
// import { franchiseAPI } from '../../services/FranchiseService';
import { useSelector } from 'react-redux';
import { selectFranchises } from '../../store/selectors';
import { IFranchise } from '../../models/IFranchise';
import FilterBlock from './components/FilterBlock/FilterBlock';
import FranchiseCard from './components/FranchiseCard/FranchiseCard';

const FranchiseSearch: FC = () => {
  const franchises = useSelector(selectFranchises);

  // const { data: franchises, isLoading, error } = franchiseAPI.useFetchAllFranchisesQuery('');

  return (
    <div>
      <FilterBlock />
      {/* {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>Ошибка при загрузке франшиз</h1>} */}
      {franchises && franchises.map((franchise: IFranchise) => (
        <FranchiseCard franchise={franchise} key={franchise.id} />
      ))}
    </div>
  );
}

export default FranchiseSearch;
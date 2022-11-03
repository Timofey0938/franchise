import { FC } from 'react';
import { IFranchise } from '../../../../models/IFranchise';
import styles from './FranchiseCard.module.scss';

interface FranchiseCardProps {
  franchise: IFranchise;
}

const FranchiseCard: FC<FranchiseCardProps> = ({ franchise }) => {
  return (
    <div className={styles.card}>
      <h1>{franchise.name}</h1>
      <p>{franchise.description}</p>
    </div>
  )
}

export default FranchiseCard;
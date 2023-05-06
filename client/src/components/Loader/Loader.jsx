import { ThreeDots } from 'react-loader-spinner';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <ThreeDots color='red'/>
    </div>
  )
}

export default Loader;

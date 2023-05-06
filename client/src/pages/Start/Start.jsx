import { Link } from 'react-router-dom';
import styles from './Start.module.scss';

const Start = () => {
  return (
    <div className={styles.start}>
      <Link to='/register'>
        <button className={styles.button}>
          Пройти обучение
        </button>
      </Link>
      <Link to='/search'>
        <button className={styles.button}>
          Выбрать франшизу
        </button>
      </Link>
    </div>
  )
}

export default Start;
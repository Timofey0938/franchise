import { FC } from 'react';
import Header from '../Header/Header';
import AppRouter from '../AppRouter';
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <AppRouter />
      </div>
    </div>
  )
}

export default App;
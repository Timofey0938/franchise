import Header from 'components/Header/Header';
import AppRouter from 'components/AppRouter';
import styles from './App.module.scss';

const App = () => {
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
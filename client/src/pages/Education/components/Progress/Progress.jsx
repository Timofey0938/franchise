import { Progress as ProgressBar } from '@chakra-ui/react'
import styles from './Progress.module.scss';

const Progress = () => {
  const progress = 37;
  const lesson = 2;
  const block = 3;
  const totalBlocks = 5;
  const totalLessons = 3;

  return (
    <div className={styles.progress}>
      <div className={styles.progressLine}>
        <div className={styles.title}>Ваш прогресс: {progress}%</div>
        <ProgressBar
          value={progress}
          className={styles.progressBar}
          height='24px'
        />
      </div>
      <div className={styles.currentLesson}>
        <div className={styles.block}>Блок: {block}/{totalBlocks}</div>
        <div className={styles.lesson}>Урок: {lesson}/{totalLessons}</div>
      </div>
    </div>
  );
};

export default Progress;

import Content from './components/Content/Content';
import Test from './components/Test/Test';
import styles from './Lesson.module.scss';

const Lesson = () => {
  return (
    <div className={styles.lesson}>
      Lesson
      <Content />
      <Test />
    </div>
  );
};

export default Lesson;

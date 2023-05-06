import Container from 'components/Container/Container';
import Progress from './components/Progress/Progress';
import Menu from './components/Menu/Menu';
import styles from './Education.module.scss';

const Education = () => {
  return (
    <Container title='Обучение'>
      <Progress />
      <Menu />
    </Container>
  );
};

export default Education;

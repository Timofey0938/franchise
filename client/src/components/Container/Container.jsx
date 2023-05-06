import classNames from 'classnames';
import styles from './Container.module.scss';

const Container = ({ title, children, centered = true, ...props }) => {
  return (
    <div className={classNames(styles.wrapper, { [styles.centered]: centered })}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.container} {...props}>
        {children}
      </div>
    </div>
    
  )
}

export default Container;
// import moment from 'moment';
import styles from './DevelopApplication.module.scss';

const DevelopApplication = ({ application }) => {
  console.log(application)
  // const { franchise, profile } = application;
  // const { company } = franchise;

  return (
    <>
      <div className={styles.block}>
        Заявка
        {/* <img className={styles.image} src={franchise.franchise_image} alt='' />
        <div className={styles.info}>
          <div className={styles.name}>{franchise.name}</div>
          <div>{franchise.short_description}</div>
          <div>Год основания: {franchise.start_year}</div>
          <div>Инвестиции: {franchise.investment}₽</div>
          <div>Срок окупаемости: {company.payback_time}</div>
          <div>Роялти: {company.royalty}%</div>
          <div>Прибыль: {franchise.profit}₽</div>
          <div>Паушальный взнос: {franchise.lump_sum_payment}</div>
          <div>Количество открытых: {franchise.num_open}</div>
        </div>
      </div>
      <div>
        <div>Описание:</div>
        <div className={styles.description}>{franchise.description}</div>
        <div>Категории:</div>
        <div className={styles.categories}>
          {franchise.categories.length > 0 ? franchise.categories.join('; ') : 'Нет категорий'}.</div>

        <div className={styles.name}>
          {profile.last_name}&nbsp;
          {profile.first_name}&nbsp;
          {profile.middle_name}
        </div>
        <div>{profile.birthdate}</div>
        <div>Пол: {profile.sex}</div>
        <div>Телефон: {profile.phone}</div>
        <div>Паспорт: {profile.passport_data.series}&nbsp;{profile.passport_data.number}</div>
        <div>
          Выдан {profile.passport_data.receipt_place}&nbsp;
          {moment(profile.passport_data.receipt_date).format('DD.MM.YYYY')}
        </div>
        <div className={styles.company}>Компания: {company.name}</div> */}
      </div>
    </>
  );
}

export default DevelopApplication;

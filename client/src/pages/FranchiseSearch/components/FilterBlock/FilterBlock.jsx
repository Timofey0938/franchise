import { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { Select } from '@chakra-ui/react';
import Button from 'components/Form/Button/Button';
import { categories } from 'constants/categories';
import styles from './FilterBlock.module.scss';

const FilterBlock = ({ setFilterConfig }) => {
  const [localFilterConfig, setLocalFilterConfig] = useState({
    categories: [],
  });

  const onCategorySelect = (selectedList, selectedItem) => {
    setLocalFilterConfig(prev => ({
      ...prev,
      categories: [...prev.categories, selectedItem.name],
    }));
  };

  const onCategoryRemove = (selectedList, removedItem) => {
    setLocalFilterConfig(prev => ({
      ...prev,
      categories: prev.categories.filter(category => category !== removedItem.name),
    }));
  };

  const investmentOptions = [
    { id: 0, key: '$gt', val: 0, name: 'Любые' },
    { id: 1, key: '$lt', val: 100000, name: 'До 100 000 рублей' },
    { id: 2, key: '$lt', val: 300000, name: 'До 300 000 рублей' },
    { id: 3, key: '$lt', val: 500000, name: 'До 500 000 рублей' },
    { id: 4, key: '$lt', val: 1000000, name: 'До 1 000 000 рублей' },
    { id: 5, key: '$lt', val: 2000000, name: 'До 2 000 000 рублей' },
    { id: 6, key: '$gt', val: 2000000, name: 'Более 2 000 000 рублей' },
  ];

  const onInvestmentChange = e => {
    const investment = investmentOptions[e.target.value];
    setLocalFilterConfig(prev => ({
      ...prev,
      investment: [investment.key, investment.val],
    }));
  };

  const paybackTimeOptions = [
    { id: 0, key: '$gt', val: 0, name: 'Любая' },
    { id: 1, key: '$lt', val: 6, name: 'до 6 месяцев' },
    { id: 2, key: '$lt', val: 9, name: 'до 9 месяцев' },
    { id: 3, key: '$lt', val: 12, name: 'до 1 года' },
    { id: 4, key: '$lt', val: 18, name: 'до 1,5 лет' },
    { id: 5, key: '$lt', val: 24, name:  'до 2 лет' },
  ];

  const onPaybackTimeChange = e => {
    const paybackTime = paybackTimeOptions[e.target.value];
    setLocalFilterConfig(prev => ({
      ...prev,
      paybackTime: [paybackTime.key, paybackTime.val],
    }));
  };

  const profitOptions = [
    { id: 0, key: '$gt', val: 0, name: 'Любая' },
    { id: 1, key: '$gt', val: 100000, name: 'от 100 тыс. рублей' },
    { id: 2, key: '$gt', val: 300000, name: 'от 300 тыс. рублей' },
    { id: 3, key: '$gt', val: 600000, name: 'от 600 тыс. рублей' },
    { id: 4, key: '$gt', val: 1000000, name: 'от 1 млн рублей' },
    { id: 5, key: '$gt', val: 1500000, name:  'от 1,5 млн рублей' },
  ];

  const onProfitChange = e => {
    const profit = profitOptions[e.target.value];
    setLocalFilterConfig(prev => ({
      ...prev,
      profit: [profit.key, profit.val],
    }));
  };

  const rateOptions = [
    { id: 0, key: '$gt', val: 0, name: 'Любые' },
    { id: 1, key: '$gt', val: 3.8, name: '3,8 и выше' },
    { id: 2, key: '$gt', val: 4, name: '4 и выше' },
    { id: 3, key: '$gt', val: 4.3, name: '4,3 и выше' },
    { id: 4, key: '$gt', val: 4.6, name: '4,6 и выше' },
  ];

  const onRateChange = e => {
    const rate = rateOptions[e.target.value];
    setLocalFilterConfig(prev => ({
      ...prev,
      rate: [rate.key, rate.val],
    }));
  };

  const applyFilters = () => setFilterConfig(localFilterConfig);

  return (
    <div className={styles.filterBlock}>
      <div className={styles.title}>Категории:</div>
      <Multiselect
        options={categories}
        onSelect={onCategorySelect}
        onRemove={onCategoryRemove}
        displayValue='name'
        showArrow={true}
        closeIcon='cancel'
        placeholder='Все категории'
        hidePlaceholder={true}
        emptyRecordMsg='Нет доступных вариантов'
        style={{
          searchBox: {
            borderColor: '#E1E8F2',
            borderRadius: 5,
          },
          chips: {
            background: '#E43E3F',
            color: 'white',
            fontWeight: 500,
          },
          optionContainer: {
            background: '#ECF2F7',
          }
        }}
      />
    
      <div className={styles.title}>Вложения: </div>
      <Select onChange={e => onInvestmentChange(e)}>
        {investmentOptions.map(option => (
          <option
            value={option.id}
            key={option.id}
          >{option.name}</option>
        ))}
      </Select>

      <div className={styles.title}>Окупаемость: </div>
      <Select onChange={e => onPaybackTimeChange(e)}>
        {paybackTimeOptions.map(option => (
          <option
            value={option.id}
            key={option.id}
          >{option.name}</option>
        ))}
      </Select>
    
      <div className={styles.title}>Прибыль: </div>
      <Select onChange={e => onProfitChange(e)}>
        {profitOptions.map(option => (
          <option
            value={option.id}
            key={option.id}
          >{option.name}</option>
        ))}
      </Select>

      <div className={styles.title}>Оценки: </div>
      <Select onChange={e => onRateChange(e)}>
        {rateOptions.map(option => (
          <option
            value={option.id}
            key={option.id}
          >{option.name}</option>
        ))}
      </Select>

      <Button
        text='Применить фильтры'
        style={{ marginTop: 20 }}
        onClick={applyFilters}
      />
    </div>
  )
}

export default FilterBlock;
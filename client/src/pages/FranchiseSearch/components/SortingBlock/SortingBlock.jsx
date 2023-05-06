import { Select } from '@chakra-ui/react';
import styles from './SortingBlock.module.scss';

const SortingBlock = ({ setSortConfig }) => {
  const sortOptions = [
    { id: 0, key: 'purchases', direction: '-1', name: 'популярности' },
    { id: 1, key: 'investment', direction: '1', name: 'размеру вложений' },
    { id: 2, key: 'paybackTime', direction: '1', name: 'сроку окупаемости' },
    { id: 3, key: 'profit', direction: '1', name: 'размеру прибыли' },
    { id: 4, key: 'rate', direction: '-1', name: 'оценкам' },
  ];

  const onSortChange = e => {
    const sort = sortOptions[e.target.value];
    setSortConfig([sort.key, sort.direction]);
  };

  return (
    <div className={styles.sortingBlock}>
      <div className={styles.title}>Сортировать по: </div>
      <Select
        className={styles.select}
        onChange={e => onSortChange(e)}
      >
        {sortOptions.map(option => (
          <option
            value={option.id}
            key={option.id}
          >{option.name}</option>
        ))}
      </Select>
    </div>
  )
}

export default SortingBlock;
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import Multiselect from 'multiselect-react-dropdown';
import FormController from 'components/Form/FormController/FormController';
import Button from 'components/Form/Button/Button';
import { categories as categoryOptions } from 'constants/categories';
import { schema } from './schema';
import styles from './Form.module.scss';

const Form = ({ franchise }) => {
  const [buttonName, setButtonName] = useState('Редактировать');
  const [categories, setCategories] = useState(franchise.categories);
  const [editing, setEditing] = useState(false);

  console.log(categoryOptions);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: franchise.name,
      shortDescription: franchise.shortDescription,
      description: franchise.description,
      investment: franchise.investment,
      profit: franchise.profit,
      paybackTime: franchise.paybackTime,
      startYear: franchise.startYear,
      numOpen: franchise.numOpen,
      lumpSumPayment: franchise.lumpSumPayment,
      royalty: franchise.royalty,
    }
  });

  const onSelect = (selectedList, selectedItem) => {
    setCategories([...categories, selectedItem.name])
  };

  const onRemove = (selectedList, removedItem) => {
    setCategories(categories.filter(category => category === removedItem.name));
  };

  const clickHandler = () => {
    if (editing) {
      cancelEditing();
      handleSubmit(onSubmit);
    } else {
      setEditing(true);
      setButtonName('Сохранить');
    }
  }

  const cancelEditing = () => {
    setEditing(false);
    setButtonName('Редактировать');
  }

  const onSubmit = data => {
    // const formatedDate = moment(new Date(data.birthDate)).format('YYYY-MM-DD');
    // submitHandler({...data, birthDate: formatedDate});
  }

  return (
    <form>
      <FormController
        name='name'
        label='Название'
        register={register}
        errors={errors}
        margin='bottom'
        disabled={!editing}
      />
      
      {editing ? (
        <FormControl style={{ marginBottom: 20 }}>
          <FormLabel>Категории</FormLabel>
          <Multiselect
            disabled={!editing}
            options={categoryOptions}
            selectedValues={
              categoryOptions.filter(category => categories.includes(category.name))
            }
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue='name'
            showArrow={true}
            closeIcon='cancel'
            placeholder=''
            hidePlaceholder={true}
            emptyRecordMsg='Нет доступных вариантов'
            style={{
              searchBox: {
                borderColor: '#E1E8F2',
                backgroundColor: '#ECF2F7',
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
        </FormControl>
      ) : (
        <>
          <FormLabel>Категории</FormLabel>
          <Input
            value={franchise.categories.join(', ')}
            variant='filled'
            isReadOnly={true}
            style={{ marginBottom: 20 }}
          />
        </>
      )}
      

      <FormController
        name='shortDescription'
        label='Краткое описание'
        register={register}
        errors={errors}
        control={control}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='description'
        label='Описание'
        type='text-area'
        register={register}
        errors={errors}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='startYear'
        label='Год основания'
        type='number'
        register={register}
        errors={errors}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='numOpen'
        label='Число открытых франшиз'
        type='number'
        register={register}
        errors={errors}
        control={control}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='investment'
        label='Размер инвестиций'
        register={register}
        errors={errors}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='profit'
        label='Прибыль'
        register={register}
        errors={errors}
        control={control}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />
      <FormController
        name='paybackTime'
        label='Срок окупаемости'
        register={register}
        errors={errors}
        control={control}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='lumpSumPayment'
        label='Паушальный взнос'
        register={register}
        errors={errors}
        control={control}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <FormController
        name='royalty'
        label='Роялти'
        register={register}
        errors={errors}
        control={control}
        inline={true}
        margin='bottom'
        disabled={!editing}
      />

      <div className={styles.block}>
        {editing ? (
          <Button
            text='Отменить'
            width='45%'
            color='gray'
            onClick={cancelEditing}
          />
        ) : (
          <div className={styles.emptySpace} />
        )}

        <Button
          text={buttonName}
          width='45%'
          onClick={clickHandler}
        />
      </div>
    </form>
  );
}

export default Form;
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormController from 'components/Form/FormController/FormController';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import Button from 'components/Form/Button/Button';
import { useNavigate } from 'react-router-dom';
import { schema } from './schema';
import classNames from 'classnames';
import UploadFile from 'components/Form/UploadFile/UploadFile';
import UploadSeveralFiles from 'components/Form/UploadSevaralFiles/UploadSevaralFiles';
import Multiselect from 'multiselect-react-dropdown';
import { categories as categoryOptions } from 'constants/categories';
import styles from './Form.module.scss';

const Form = ({ submitHandler, loading, formError }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [cover, setCover] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [presentation, setPresentation] = useState(null);
  const [finPlan, setFinPlan] = useState(null);
  const [logo, setLogo] = useState(null);
  const [procuration, setProcuration] = useState(null);
  const [withProcuration, setWithProcuration] = useState(false);

  const onSelect = (selectedList, selectedItem) => {
    setCategories([...categories, selectedItem.name])
  };

  const onRemove = (selectedList, removedItem) => {
    setCategories(categories.filter(category => category === removedItem.name));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      sex: 'Мужской',
    }
  });

  const onSubmit = data => {
    const franchise = {
      name: data.name,
      shortDescription: data.shortDescription,
      categories,
      description: data.description,
      investment: data.investment,
      profit: data.profit,
      paybackTime: data.paybackTime,
      startYear: data.startYear,
      numOpen: data.numOpen,
      franchiseImage: data.franchiseImage,
      lumpSumPayment: data.lumpSumPayment,
      royalty: data.royalty,
      advantages: data.advantages,
      companyName: data.companyName,
      companyDescription: data.companyDescription,
      companyStartYear: data.companyStartYear,
      companySiteUrl: data.companySiteUrl,
      inn: data.inn,
      ogrn: data.ogrn,
    };
  
    submitHandler(franchise, cover, gallery, presentation, finPlan, logo, procuration);
  }

  return (
    <form>
      <div className={styles.title}>Данные о франшизе:</div>
      <div className={styles.block}>
        <FormController
          name='name'
          label='Название'
          register={register}
          errors={errors}
          isRequired={true}
          margin='right'
        />
        
        <FormControl isRequired={true}>
          <FormLabel>Категории:</FormLabel>
          <Multiselect
            options={categoryOptions}
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
      </div>

      <div className={styles.block}>
        <FormController
          name='shortDescription'
          label='Краткое описание'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='startYear'
          label='Год основания'
          type='number'
          register={register}
          errors={errors}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='description'
          label='Описание'
          type='text-area'
          register={register}
          errors={errors}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <UploadFile
          file={cover}
          setFile={setCover}
          isRequired={true}
          label='Обложка франшизы'
        />

        <UploadSeveralFiles
          files={gallery}
          setFiles={setGallery}
          isRequired={true}
          label='Фото франшизы (не более 10 файлов)'
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='numOpen'
          label='Число открытых франшиз'
          type='number'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='investment'
          label='Размер инвестиций'
          register={register}
          errors={errors}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='paybackTime'
          label='Срок окупаемости'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='profit'
          label='Прибыль'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='royalty'
          label='Роялти'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='lumpSumPayment'
          label='Паушальный взнос'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
        />
      </div>

      <div className={classNames(styles.block, styles.left)}>
        <UploadFile
          file={presentation}
          setFile={setPresentation}
          isRequired={true}
          label='Презентация франшизы'
          name='presentation'
        />
        
        <UploadFile
          file={finPlan}
          setFile={setFinPlan}
          isRequired={true}
          label='Финансовый план'
          name='finPlan'
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='advantages'
          label='Преимущества'
          type='text-area'
          register={register}
          errors={errors}
          isRequired={true}
        />
      </div>

      <div className={styles.title}>Данные о компании:</div>
      <div className={styles.block}>
        <FormController
          name='companyName'
          label='Название'
          register={register}
          errors={errors}
          isRequired={true}
          margin='right'
        />

        <UploadFile
          file={logo}
          setFile={setLogo}
          isRequired={true}
          label='Логотип'
          name='logo'
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='companyDescription'
          label='Описание'
          register={register}
          errors={errors}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='companyStartYear'
          label='Год основания'
          type='number'
          register={register}
          errors={errors}
          isRequired={true}
          margin='right'
          style={{ width: 100 }}
        />

        <FormController
          name='companySiteUrl'
          label='Ссылка на сайт'
          register={register}
          errors={errors}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormController
          name='inn'
          label='ИНН'
          type='number'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
          margin='right'
        />

        <FormController
          name='ogrn'
          label='ОГРН'
          type='number'
          register={register}
          errors={errors}
          control={control}
          isRequired={true}
        />
      </div>

      <div className={styles.block}>
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='email-alerts' mb='0'>
            Я действую по доверенности
          </FormLabel>
          <Switch
            defaultChecked={false}
            checked={withProcuration}
            onChange={() => setWithProcuration(!withProcuration)}
          />
        </FormControl>

        {withProcuration && (
          <UploadFile
            file={procuration}
            setFile={setProcuration}
            isRequired={true}
            label='Доверенность'
            name='procuration'
          />
        )}
      </div>

      {formError !== '' && (
        <div className={styles.formError}>{formError}</div>
      )}

      <Button
        text='Создать франшизу'
        onClick={handleSubmit(onSubmit)}
        isLoading={loading}
      />
    </form>
  );
}

export default Form;

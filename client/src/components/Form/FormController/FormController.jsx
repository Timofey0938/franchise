import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  RadioGroup,
  Stack,
  Radio,
  Textarea,
  NumberInput,
  NumberInputField,
  Select,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import classNames from 'classnames';
import styles from './FormController.module.scss';

const FormController = (props) => {
  const {
    name,
    label,
    register,
    errors,
    type = 'input',
    control = null,
    isRequired = false,
    options = [],
    inline = false,
    margin = null,
    disabled = false
  } = props;

  const phoneClassName = !!errors?.phoneNumber ? styles.error : styles.input;
  const style = inline ? { display: 'flex' } : {};

  return (
    <FormControl
      isInvalid={!!errors[name]}
      className={classNames({
        [styles.rightMargin]: margin === 'right',
        [styles.bottomMargin]: margin === 'bottom'
      })}
      isRequired={isRequired}
    >
      <div style={style}>
        <FormLabel width={278}>{label}:</FormLabel>
        {type === 'input' && <Input {...register(name)} variant='filled' isReadOnly={disabled} />}
        {type === 'password' && <Input type='password' {...register(name)} variant='filled' isReadOnly={disabled} />}
        {type === 'text-area' && <Textarea {...register(name)} variant='filled' isReadOnly={disabled} />}
        {type === 'date' && <Input type='date' {...register(name)} variant='filled' isReadOnly={disabled} />}
        {type === 'number' && (
          <NumberInput variant='filled' isReadOnly={disabled}>
            <NumberInputField {...register(name)} variant='filled' />
          </NumberInput>
        )}
        {type === 'select' && (
          <Select variant='filled' isReadOnly={disabled}>
            {options.map(option => (
              <option value={option.id} key={option.id}>{option.name}</option>
            ))}
          </Select>
        )}
        {(type === 'phone' || type === 'radio') && (
          <Controller
            name={name}
            control={control}
            rules={{ required: isRequired }}
            render={({ field }) => (<>
              {type === 'phone' ? (
                <PhoneInput
                  country={'ru'}
                  specialLabel=''
                  disabled={disabled}
                  {...field}
                  inputClass={phoneClassName}
                />
              ) : (
                <RadioGroup {...field}>
                  <Stack direction='row'>
                    <Radio value='Мужской' isReadOnly={disabled}>Мужской</Radio>
                    <Radio value='Женский' isReadOnly={disabled}>Женский</Radio>
                  </Stack>
                </RadioGroup>
              )}
            </>)}
          />
        )}
      </div>
      {errors[name] && (
        <FormErrorMessage>
          {errors[name]?.message ?? 'Ошибка'}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export default FormController;

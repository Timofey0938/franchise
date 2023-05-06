import { useState } from 'react';
import { FormControl, FormLabel, Icon } from '@chakra-ui/react';
import { GrFormUpload, GrClose } from 'react-icons/gr';
import styles from './UploadFile.module.scss';

const UploadFile = ({ file, setFile, isRequired, label, name = 'file' }) => {
  const [fileAdded, setFileAdded] = useState(!!file);

  const addFile = e => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
      setFileAdded(true);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFileAdded(false);
  };

  return (
    <FormControl isRequired={isRequired} width='250px'>
      <FormLabel>{label}</FormLabel>
      <div className={styles.uploadPhoto}>
        <div className={styles.wrapper}>
          <input
            name={name}
            type='file'
            id={label}
            className={styles.fileInput}
            multiple
            onChange={addFile}
          />
          <label htmlFor={label} className={styles.fileButton}>
            <div className={styles.iconWrapper}>
              <Icon as={GrFormUpload} />
            </div>
          </label>
        </div>

        {fileAdded && (
          <>
            <div className={styles.fileAdded}>Добавлен<br/>1 файл</div>
            <div className={styles.removeFile} onClick={removeFile}>
              <Icon as={GrClose} />
            </div>
          </>
        )}
      </div>
    </FormControl>
  );
};

export default UploadFile;

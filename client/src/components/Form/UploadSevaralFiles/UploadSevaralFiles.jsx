import { useState } from 'react';
import { FormControl, FormLabel, Icon } from '@chakra-ui/react';
import { GrFormUpload, GrClose } from 'react-icons/gr';
import styles from './UploadSevaralFiles.module.scss';

const UploadSeveralFiles = ({ files, setFiles, isRequired, label }) => {
  const [numberOfFiles, setNumberOfFiles] = useState(files.length);

  const addFile = e => {
    if (e.target.files !== null) {
      setFiles(e.target.files);
      setNumberOfFiles(e.target.files.length);
    }
  };

  const removeFiles = () => {
    setFiles([]);
    setNumberOfFiles(0);
  };

  return (
    <FormControl isRequired={isRequired} width='320px'>
      <FormLabel>{label}</FormLabel>
      <div className={styles.uploadPhoto}>
        <div className={styles.wrapper}>
          <input
            name='file'
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

        {numberOfFiles > 0 && (
          <>
            <div className={styles.fileAdded}>Добавлено<br/>файлов:&nbsp;{numberOfFiles}</div>
            <div className={styles.removeFile} onClick={removeFiles}>
              <Icon as={GrClose} />
            </div>
          </>
        )}
      </div>
    </FormControl>
  );
};

export default UploadSeveralFiles;

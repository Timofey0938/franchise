import { useState } from 'react';
import UploadFile from 'components/Form/UploadFile/UploadFile';
import UploadSeveralFiles from 'components/Form/UploadSevaralFiles/UploadSevaralFiles';
import styles from './MediaForm.module.scss';

const MediaForm = ({ submitHandler, loading, formError }) => {
  const [gallery, setGallery] = useState([]);
  const [presentation, setPresentation] = useState(null);
  const [finPlan, setFinPlan] = useState(null);
 
  return (
    <form>
      <UploadSeveralFiles
        files={gallery}
        setFiles={setGallery}
        isRequired={true}
        label='Фото франшизы (не более 10 файлов)'
      />
  
      <div className={styles.block}>
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
    </form>
  );
}

export default MediaForm;

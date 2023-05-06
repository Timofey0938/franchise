import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { useRequest } from 'hooks/useRequest';
import Form from './components/Form/Form';
import Container from 'components/Container/Container';
import { baseUrl } from 'config';

const CreateFranchise = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const { loading, request, error, clearError } = useRequest();
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
    clearError();
  }, [error, clearError]);

  const createFranchiseHandler = async (
    franchise,
    cover,
    gallery,
    presentation,
    finPlan,
    logo,
    procuration
  ) => {
     try {
      console.log(franchise, cover, gallery, presentation, finPlan, logo, procuration);
      const categories = franchise.categories.join(';');

      const franchiseData = new FormData();
      franchiseData.append('ownerId', user.id);
      franchiseData.append('name', franchise.name);
      franchiseData.append('shortDescription', franchise.shortDescription);
      franchiseData.append('categories', categories);
      franchiseData.append('description', franchise.description);
      franchiseData.append('startYear', franchise.startYear);
      franchiseData.append('investment', franchise.investment);
      franchiseData.append('profit', franchise.profit);
      franchiseData.append('paybackTime', franchise.paybackTime);
      franchiseData.append('numOpen', franchise.numOpen);
      franchiseData.append('lumpSumPayment', franchise.lumpSumPayment);
      franchiseData.append('royalty', franchise.royalty);
      franchiseData.append('advantages', franchise.advantages);
      franchiseData.append('companyName', franchise.companyName);
      franchiseData.append('companyDescription', franchise.companyDescription);
      franchiseData.append('companyStartYear', franchise.companyStartYear);
      franchiseData.append('companySiteUrl', franchise.companySiteUrl);
      franchiseData.append('inn', franchise.inn);
      franchiseData.append('ogrn', franchise.ogrn);
      franchiseData.append('cover', cover);
      franchiseData.append('logo', logo);
      franchiseData.append('finPlan', finPlan);
      franchiseData.append('presentation', presentation);
      for (let i = 0; i < gallery.length; i++) {
        franchiseData.append(`gallery`, gallery[i]);
      }
      if (procuration) {
        franchiseData.append('procuration', procuration);
      }

      const franchiseResponse = await fetch(
        baseUrl + '/franchise/create',
        {
          method: 'POST',
          body: franchiseData,
        }
      );
      const franchiseId = await franchiseResponse.json();
      await fetch(
        baseUrl + '/applications/create',
        {
          method: 'POST',
          body: {
            franchiseId,
            ownerId: user.id,
          }
        }
      );
      user.setFranchise(franchiseId);
      navigate('/develop-applications');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container title='Создание франшизы'>
      <Form
        submitHandler={createFranchiseHandler}
        loading={loading}
        formError={formError}
      />
    </Container>
  )
}

export default CreateFranchise;
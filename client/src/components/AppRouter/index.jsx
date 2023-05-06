import { Routes, Route } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import Start from 'pages/Start/Start';
import FranchiseSearch from 'pages/FranchiseSearch/FranchiseSearch';
import Franchise from 'pages/Franchise/Franchise';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import CreateFranchise from 'pages/CreateFranchise/CreateFranchise';
import UserAccount from 'pages/UserAccount/UserAccount';
import Favorite from 'pages/Favorite/Favorite';
import MyApplications from 'pages/MyApplications/MyApplications';
import Education from 'pages/Education/Education';
import Lesson from 'pages/Lesson/Lesson';
import OwnerAccount from 'pages/OwnerAccount/OwnerAccount';
import MyFranchise from 'pages/MyFranchise/MyFranchise';
import FranchiseApplications from 'pages/FranchiseApplications/FranchiseApplications';
import RegisterOwner from 'pages/RegisterOwner/RegisterOwner';
import DevelopApplications from 'pages/DevelopApplications/DevelopApplications';

const AppRouter = () => {
  const user = useAuth();

  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/search' element={<FranchiseSearch />} />
      <Route path='/franchise/:id' element={<Franchise />} />

      {!user.isAuth && (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/register-owner' element={<RegisterOwner />} />          
        </>
      )}
      {user.isUser && (
        <>
          <Route path='/user-account' element={<UserAccount />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/my-applications' element={<MyApplications />} />
          <Route path='/education' element={<Education />} />
          <Route path='/lesson' element={<Lesson />} />
        </>
      )}
      {user.isOwner && (
        <>
          <Route path='/create-franchise' element={<CreateFranchise />} />
          <Route path='/owner-account' element={<OwnerAccount />} />
          <Route path='/my-franchise' element={<MyFranchise />} />
          <Route path='/develop-applications' element={<DevelopApplications />} />
        </>
      )}
      {user.isAdmin && (
        <>
          <Route path='/franchise-applications' element={<FranchiseApplications />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;

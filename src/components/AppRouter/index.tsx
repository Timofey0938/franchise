import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from '../../pages/Account/Account';
import Franchise from '../../pages/Franchise/Franchise';
import FranchiseSearch from '../../pages/FranchiseSearch/FranchiseSearch';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FranchiseSearch />} />
        <Route path='/franchise/:id' element={<Franchise />} />
        <Route path='/account' element={<Account />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

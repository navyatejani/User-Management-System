import { Routes, Route } from 'react-router-dom';

import AllUsers from './pages/AllUsers';
import UserDetails from './pages/UserDetails';
import CreateNewUser from './pages/CreateNewUser';
import UpdateUserDetails from './pages/UpdateUserDetails';

import Navbar from './components/Navbar';

import './App.css';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/users" element={<AllUsers />} />
        <Route path="/users/new" element={<CreateNewUser />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/:id/edit" element={<UpdateUserDetails />} />
      </Routes>
    </>
  )
}

export default App;
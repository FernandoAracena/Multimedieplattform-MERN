import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreateMediaContent from './pages/CreateMediaContent';
import EditMediaContent from './pages/EditMediaContent';
import DeleteMediaContent from './pages/DeleteMediaContent';
import ShowMediaContent from './pages/ShowMediaContent';
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import {AuthProvider} from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
      <Route path='/' element={<SignUp />}/>
      <Route path='/users/register' element={<SignUp/>}/>
      <Route path='/users/login' element={<LogIn/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/mediaContents/create' element={<CreateMediaContent/>}/>
      <Route path='/mediaContents/details/:id' element={<ShowMediaContent/>}/>
      <Route path='/mediaContents/edit/:id' element={<EditMediaContent/>}/>
      <Route path='/mediaContents/delete/:id' element={<DeleteMediaContent/>}/>
      </Routes>
    </AuthProvider>
  )
}

export default App
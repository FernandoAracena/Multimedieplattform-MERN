import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreateMediaContent from './pages/CreateMediaContent';
import EditMediaContent from './pages/EditMediaContent';
import DeleteMediaContent from './pages/DeleteMediaContent';
import ShowMediaContent from './pages/ShowMediaContent';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/mediaContents/create' element={<CreateMediaContent/>}/>
      <Route path='/mediaContents/details/:id' element={<ShowMediaContent/>}/>
      <Route path='/mediaContents/edit/:id' element={<EditMediaContent/>}/>
      <Route path='/mediaContents/delete/:id' element={<DeleteMediaContent/>}/>
  </Routes>
  )
}

export default App
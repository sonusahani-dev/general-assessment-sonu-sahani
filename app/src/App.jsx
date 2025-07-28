import React from 'react';
import {BrowserRouter, Routes,Route,Link} from 'react-router-dom';
import HotelList from './components/hotels/HotelList';
import AddHotel from './components/hotels/AddHotel';
import EditHotel from './components/hotels/EditHotel';
import Navbar from './components/Navbar';
import ViewHotel from './components/hotels/ViewHotel';

const App = () => {
  return (<>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/add" element={<AddHotel />} />
        <Route path="/edit/:id" element={<EditHotel />} />
        <Route path="/hotels/:id" element={<ViewHotel />} />
      </Routes>
    </BrowserRouter>
  </>);
};

export default App;


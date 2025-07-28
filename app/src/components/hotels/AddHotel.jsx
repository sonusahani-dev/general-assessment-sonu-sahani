import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import HotelForm from './HotelForm';

const AddHotel = () => {
  const navigate = useNavigate();

const handleAdd = async (data) => {
  try {
    await api.addHotel(data);
    navigate('/');
  } catch (err) {
    console.error("Hotel creation failed:", err.response?.data || err.message);
  }
};


  return (
    <div className="container mt-4">
      <h2 className='text-center'>Add Hotel</h2>
      <HotelForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddHotel;


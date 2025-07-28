import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import HotelForm from './HotelForm';

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    api.getHotel(id)
      .then(res => {
        const hotel = res.data;

        // Normalize multilingual fields to plain strings
        const cleaned = {
          ...hotel,
          name: typeof hotel.name === 'object' ? hotel.name.en : hotel.name,
          address: typeof hotel.address === 'object' ? hotel.address.en : hotel.address,
          roomType: Array.isArray(hotel.roomType)
            ? hotel.roomType.map(r => ({
                name: typeof r.name === 'object' ? r.name.en : r.name,
                price: Number(r.price),
                facilities: Array.isArray(r.facilities) ? r.facilities : [],
              }))
            : [],
          nearByAttractions: Array.isArray(hotel.nearByAttractions)
            ? hotel.nearByAttractions.map(a => ({
                name: typeof a.name === 'object' ? a.name.en : a.name,
                distance: a.distance || ''
              }))
            : [],
          photo: Array.isArray(hotel.photo) ? hotel.photo : [],
        };

        setInitialData(cleaned);
      })
      .catch(err => console.error('❌ Failed to load hotel:', err));
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      // Format fields properly before sending
      const cleaned = {
        ...data,
        name: data.name || '',
        address: data.address || '',
        star: Number(data.star),
        rating: Number(data.rating),
        priceFrom: Number(data.priceFrom),
        roomType: data.roomType.map(r => ({
          name: r.name,
          price: Number(r.price),
          facilities: r.facilities.filter(f => f.trim())
        })),
        nearByAttractions: data.nearByAttractions.map(a => ({
          name: a.name,
          distance: a.distance
        })),
        photo: data.photo.filter(p => p.url && p.url.trim())
      };

      await api.updateHotel(id, cleaned);
      navigate('/');
    } catch (err) {
      console.error('❌ Update failed:', err);
      alert('Update failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Hotel</h2>
      {initialData ? (
        <HotelForm initialData={initialData} onSubmit={handleUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditHotel;

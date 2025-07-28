import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

useEffect(() => {
  api.getHotels()
    .then(res => {
      // console.log("📦 Hotels from API:", res.data);
      setHotels(res.data);
    })
    .catch(err => {
      console.error("❌ Failed to fetch hotels:", err);
    });
}, []);


  const handleDelete = async (id) => {
    await api.deleteHotel(id);
    setHotels(hotels.filter(h => h._id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className='text-center mb-3 fw-bold'>Hotel List</h2>
      <div className="row">
        {hotels.map(hotel => (
          <div className="col-md-3" key={hotel._id}>
            <div className="card mb-3 h-80 shadow-sm">
              {/* ✅ Image section */}
              <img
                src={hotel.photo?.[0]?.url || 'https://dummyimage.com/400x250/cccccc/000000&text=No+Image'}
                alt={hotel.name?.en || hotel.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />

              <div className="card-body">
                <h5>{hotel.name?.en || hotel.name}</h5>
                <p>{hotel.address?.en || hotel.address}</p>
                <p>⭐ {hotel.star} | Rating: {hotel.rating}</p>
                <p><strong>From ₹</strong>{hotel.priceFrom}</p>
                <p className="text-muted">📍 {hotel.destination?.name?.en || hotel.destination?.name || 'Unknown'}</p>

                <Link to={`/edit/${hotel._id}`} className="btn btn-sm btn-warning ms-1 me-1">Edit</Link>
                <Link to={`/hotels/${hotel._id}`} className="btn btn-sm btn-primary ms-5 me-3">View</Link>
                <button onClick={() => handleDelete(hotel._id)} className="btn btn-sm btn-danger ms-5">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;

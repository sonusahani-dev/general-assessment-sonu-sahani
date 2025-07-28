import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const HotelForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    star: '',
    rating: '',
    priceFrom: '',
    destination: '',
    roomType: [{ name: '', price: '', facilities: [''] }],
    nearByAttractions: [{ name: '', distance: '' }],
    photo: [{ url: '' }],
    ...initialData,
  });

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    api.getDestinations()
      .then(res => {
        // console.log("🎯 Destinations loaded:", res.data);
        setDestinations(res.data);
      })
      .catch(err => {
        console.error("❌ Failed to load destinations:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.destination || form.destination.trim().length !== 24) {
      alert("Please select a valid destination.");
      return;
    }

    const cleaned = {
      ...form,
      star: Number(form.star),
      rating: Number(form.rating),
      priceFrom: Number(form.priceFrom),
      roomType: form.roomType.map(r => ({
        name: r.name,
        price: Number(r.price),
        facilities: Array.isArray(r.facilities)
          ? r.facilities.filter(f => f.trim() !== '')
          : []
      })),
      nearByAttractions: Array.isArray(form.nearByAttractions)
        ? form.nearByAttractions.filter(a => a.name && a.distance)
        : [],
      photo: Array.isArray(form.photo)
        ? form.photo.filter(p => p.url && p.url.trim() !== '')
        : []
    };

    onSubmit(cleaned);
  };

  const addRoomType = () => {
    setForm(prev => ({
      ...prev,
      roomType: [...prev.roomType, { name: '', price: '', facilities: [''] }],
    }));
  };

  const updateRoomType = (index, key, value) => {
    const updated = [...form.roomType];
    updated[index][key] = value;
    setForm(prev => ({ ...prev, roomType: updated }));
  };

  const updateFacility = (roomIndex, facIndex, value) => {
    const updated = [...form.roomType];
    if (!Array.isArray(updated[roomIndex].facilities)) {
      updated[roomIndex].facilities = [];
    }
    updated[roomIndex].facilities[facIndex] = value;
    setForm(prev => ({ ...prev, roomType: updated }));
  };

  const addFacility = (roomIndex) => {
    const updated = [...form.roomType];
    if (!Array.isArray(updated[roomIndex].facilities)) {
      updated[roomIndex].facilities = [];
    }
    updated[roomIndex].facilities.push('');
    setForm(prev => ({ ...prev, roomType: updated }));
  };

  const removeRoomType = (index) => {
    const updated = [...form.roomType];
    updated.splice(index, 1);
    setForm(prev => ({ ...prev, roomType: updated }));
  };

  const addAttraction = () => {
    setForm(prev => ({
      ...prev,
      nearByAttractions: [...prev.nearByAttractions, { name: '', distance: '' }],
    }));
  };

  const updateAttraction = (index, key, value) => {
    const updated = [...form.nearByAttractions];
    updated[index][key] = value;
    setForm(prev => ({ ...prev, nearByAttractions: updated }));
  };

  const removeAttraction = (index) => {
    const updated = [...form.nearByAttractions];
    updated.splice(index, 1);
    setForm(prev => ({ ...prev, nearByAttractions: updated }));
  };

  const addPhoto = () => {
    setForm(prev => ({
      ...prev,
      photo: [...prev.photo, { url: '' }],
    }));
  };

  const updatePhoto = (index, value) => {
    const updated = [...form.photo];
    updated[index].url = value;
    setForm(prev => ({ ...prev, photo: updated }));
  };

  const removePhoto = (index) => {
    const updated = [...form.photo];
    updated.splice(index, 1);
    setForm(prev => ({ ...prev, photo: updated }));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input name="name" value={form.name} onChange={handleChange} className="form-control mb-2" placeholder="Hotel Name" />
      <input name="address" value={form.address} onChange={handleChange} className="form-control mb-2" placeholder="Address" />
      <input name="star" value={form.star} onChange={handleChange} className="form-control mb-2" placeholder="Star Rating" />
      <input name="rating" value={form.rating} onChange={handleChange} className="form-control mb-2" placeholder="Rating" />
      <input name="priceFrom" value={form.priceFrom} onChange={handleChange} className="form-control mb-2" placeholder="Price From" />

      <select
        name="destination"
        value={form.destination}
        onChange={handleChange}
        className="form-control mb-4"
        required
      >
        <option value="">Select Destination</option>
        {destinations.map(dest => (
          <option key={dest._id} value={dest._id}>
            {typeof dest.name === 'string' ? dest.name : dest.name?.en || 'Unnamed'}
          </option>
        ))}
      </select>

      <h5>Room Types</h5>
      {form.roomType.map((room, i) => (
        <div key={i} className="border p-3 mb-2">
          <input value={room.name} onChange={(e) => updateRoomType(i, 'name', e.target.value)} className="form-control mb-2" placeholder="Room Name" />
          <input value={room.price} onChange={(e) => updateRoomType(i, 'price', e.target.value)} className="form-control mb-2" placeholder="Room Price" />
          <label>Facilities:</label>
          {room.facilities.map((fac, j) => (
            <input key={j} value={fac} onChange={(e) => updateFacility(i, j, e.target.value)} className="form-control mb-1" placeholder={`Facility ${j + 1}`} />
          ))}
          <button type="button" onClick={() => addFacility(i)} className="btn btn-sm btn-secondary mb-2">+ Add Facility</button>
          <button type="button" onClick={() => removeRoomType(i)} className="btn btn-sm btn-danger ms-2 mb-2">Remove Room</button>
        </div>
      ))}
      <button type="button" onClick={addRoomType} className="btn btn-outline-primary mb-4">+ Add Room Type</button>

      <h5>Photos</h5>
      {form.photo.map((p, i) => (
        <div key={i} className="d-flex mb-2">
          <input value={p.url} onChange={(e) => updatePhoto(i, e.target.value)} className="form-control me-2" placeholder="Photo URL" />
          <button type="button" onClick={() => removePhoto(i)} className="btn btn-sm btn-danger">X</button>
        </div>
      ))}
      <button type="button" onClick={addPhoto} className="btn btn-outline-primary mb-4">+ Add Photo</button>

      <h5>Nearby Attractions</h5>
      {form.nearByAttractions.map((attr, i) => (
        <div key={i} className="border p-2 mb-2">
          <input value={attr.name} onChange={(e) => updateAttraction(i, 'name', e.target.value)} className="form-control mb-2" placeholder="Attraction Name" />
          <input value={attr.distance} onChange={(e) => updateAttraction(i, 'distance', e.target.value)} className="form-control mb-2" placeholder="Distance" />
          <button type="button" onClick={() => removeAttraction(i)} className="btn btn-sm btn-danger">Remove</button>
        </div>
      ))}
      <button type="button" onClick={addAttraction} className="btn btn-outline-primary mb-4">+ Add Attraction</button>

      <button className="btn btn-success ms-2 mb-4">Save Hotel</button>
    </form>
  );
};

export default HotelForm;

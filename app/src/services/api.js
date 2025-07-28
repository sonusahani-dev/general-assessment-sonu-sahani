import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});
  
export const getHotels = () => API.get('/hotels');
export const getHotel = (id) => API.get(`/hotels/${id}`);
export const addHotel = (data) => API.post('/hotels', data);
export const updateHotel = (id, data) => API.put(`/hotels/${id}`, data);
export const deleteHotel = (id) => API.delete(`/hotels/${id}`);
export const getDestinations = () => API.get('/destinations');
export const getHotelById = (id) => API.get(`/hotels/${id}`);

export default {
  getHotels,
  getHotel,
  addHotel,
  updateHotel,
  deleteHotel,
  getDestinations,
  getHotelById
};


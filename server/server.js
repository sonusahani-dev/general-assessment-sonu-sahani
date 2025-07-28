const express = require('express');
const cors = require('cors')  
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const DataBase = require('./config/dbConnect');
DataBase();
const destinationRoutes = require('./routes/destinationRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const path = require('path');

app.use(cors()); 
app.use(express.json());  
app.use('/api/destinations', destinationRoutes);
app.use('/api/hotels', hotelRoutes);

const port = process.env.PORT || 5000;
const uri = process.env.BASE_URI;
app.listen(port, (url) => {
    console.log(`Server is running on port: ${port}`);
});
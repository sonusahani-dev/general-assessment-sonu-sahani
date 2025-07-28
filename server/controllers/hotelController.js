const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const Destination = require('../models/Destination');

exports.createHotel = async (req, res) => {
  try {
    const { destination } = req.body;

    if (!mongoose.Types.ObjectId.isValid(destination)) {
      return res.status(400).json({
        error: "Invalid destination ID format. Must be 24-character hex string"
      });
    }

    const destinationExists = await Destination.findById(destination);
    if (!destinationExists) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const hotel = new Hotel(req.body);
    await hotel.save();

    res.status(201).json(hotel);
  } catch (err) {
    console.error("Create Hotel Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};


exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('destination');
    res.send(hotels);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ 1. Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid hotel ID format (must be 24-character hex)' });
    }

    // ✅ 2. Fetch hotel by ID with destination populated
    const hotel = await Hotel.findById(id).populate('destination');

    // ✅ 3. Handle hotel not found
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.status(200).json(hotel);
  } catch (err) {
    console.error('❌ Error fetching hotel by ID:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!hotel) return res.status(404).send();
    res.send(hotel);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).send();
    res.send({ message: 'Hotel deleted' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


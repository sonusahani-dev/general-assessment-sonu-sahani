const Destination = require('../models/Destination');

exports.createDestination = async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).send(destination);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};


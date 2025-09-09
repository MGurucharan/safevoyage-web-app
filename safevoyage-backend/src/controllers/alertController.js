const Alert = require("../models/Alert");

exports.createPanicAlert = async (req, res) => {
  try {
    const alert = await Alert.create({
      touristId: req.user,
      type: "panic",
      location: req.body.location,
    });
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ touristId: req.user });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

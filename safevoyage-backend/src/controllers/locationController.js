const { calculateSafetyScore } = require("../utils/safetyScore");

exports.updateLocation = async (req, res) => {
  try {
    const { lat, lon } = req.body;
    const result = calculateSafetyScore(lat, lon);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

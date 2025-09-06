exports.calculateSafetyScore = (lat, lon) => {
  // Example: Restricted zone hardcoded
  const restrictedZone = { lat: 28.61, lon: 77.23, radius: 5 }; // Delhi Red Zone

  const distance = Math.sqrt(
    Math.pow(lat - restrictedZone.lat, 2) + Math.pow(lon - restrictedZone.lon, 2)
  );

  if (distance < 0.1) {
    return { score: 40, alert: "You are in a high-risk zone!" };
  }

  return { score: 90, alert: "Safe" };
};

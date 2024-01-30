const filterEvents = (req, res, next) => {
    const { city, genre, maxPrice } = req.query;
  
    const filters = {};
    if (city) filters.city = city;
    if (genre) filters.genre = genre;
    if (maxPrice) filters.price = { $lte: parseFloat(maxPrice) };
  
    req.filters = filters;
    next();
  };
  
  module.exports = filterEvents;
  
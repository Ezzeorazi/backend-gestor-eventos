const axios = require('axios');

module.exports = function () {
  return {
    name: 'searchNearby',
    description: 'Buscar lugares cercanos usando Google Places',
    schema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        lat: { type: 'number' },
        lng: { type: 'number' },
        radius: { type: 'number' }
      },
      required: ['query']
    },
    async execute({ query, lat, lng, radius = 2000 }) {
      const params = {
        query,
        key: process.env.GOOGLE_PLACES_API_KEY,
        radius
      };
      if (lat && lng) {
        params.location = `${lat},${lng}`;
      }
      const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
      const resp = await axios.get(url, { params });
      return resp.data.results.slice(0, 5).map(r => ({
        name: r.name,
        address: r.formatted_address,
        rating: r.rating,
        placeId: r.place_id,
        mapUrl: `https://www.google.com/maps/place/?q=place_id:${r.place_id}`
      }));
    }
  };
};

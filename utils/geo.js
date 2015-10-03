var GooglePlaces = require('googleplaces');
var googlePlaces = new GooglePlaces(process.env.MOAR_BACONZ_GOOGLE_PLACES_KEY || 'your api key', 'json');

module.exports = {
	getNearbyStores: function(callback){
		googlePlaces.placeSearch({
					location: [req.body.location.latitude, req.body.location.longitude],
					radius: 300, // probably meters
					types: "grocery_or_supermarket",
					opennow: true
				},callback);
	}
}
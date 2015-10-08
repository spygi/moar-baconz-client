var GooglePlaces = require('googleplaces');
var googlePlaces = new GooglePlaces(process.env.MOAR_BACONZ_GOOGLE_PLACES_KEY || 'your api key', 'json');

module.exports = {
	getNearbyStores: function(location, callback){
		googlePlaces.placeSearch({
			location: [location.latitude, location.longitude],
					radius: 5000, // probably meters
					types: "grocery_or_supermarket",
					// opennow: true // for testing in the night :)
	}, function(error, response){
		
		if(response && response.results){
			callback(response.results)
		}else{
			callback([]);
		}
	});
	}
}
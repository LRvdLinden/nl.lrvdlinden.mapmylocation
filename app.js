const Homey = require('homey');
const axios = require('axios');

class MapMyLocationApp extends Homey.App {
        async onInit() {
            this.log('MapMyLocation is running');
    
            // Haal de geolocatie van Homey op
            this.homeylat = await this.homey.geolocation.getLatitude();
            this.homeylong = await this.homey.geolocation.getLongitude();
    
            this.log(`Homey's latitude: ${this.homeylat}`);
            this.log(`Homey's longitude: ${this.homeylong}`);
    
            // Registreer de actiekaarten
            this.registerActionCard('create_api_url_3', this.handleActionCard3);
            this.registerActionCard('create_api_url_6', this.handleActionCard6);
            this.registerActionCard('create_api_url_9', this.handleActionCard9);
            this.registerActionCard('create_api_url_10', this.handleActionCard10);
            this.registerActionCard('create_api_url_11', this.handleActionCard11);
            this.registerActionCard('create_api_url_12', this.handleActionCard12);
    
            // Initialiseer de afbeelding
// Initialiseer de afbeelding
await this.initImage();
await this.fetchImage();

        }
    
        async initImage(locatieUrl) { 
            try {
                this.image = await this.fetchImage(locatieUrl);
            } catch (error) {
                this.error("Error initializing image:", error);
            }
        }
        
    
        async fetchImage(locatieUrl) {
            try {
                const image = await this.homey.images.createImage();
                await image.setStream(async (stream) => {
                    const response = await axios.get(locatieUrl, { responseType: "stream" });
    
                    if (response.status !== 200) {
                        this.error("Error fetching image:", response.statusText);
                        throw new Error("Error fetching image");
                    }
    
                    response.data.pipe(stream);
                });
    
                return image;
            } catch (error) {
                this.error("Error setting image:", error);
                throw new Error("Error setting image");
            }
        }    

    registerActionCard(cardName, handler) {
        let actionCard = this.homey.flow.getActionCard(cardName);
        actionCard.registerRunListener(handler.bind(this));
    }

    async handleActionCard3(args, state) {
        this.log('Action card 3 is triggered');
    
        // Google Static Map API voor afbeelding
        const locatieUrl1 = `https://maps.googleapis.com/maps/api/staticmap?auto=&scale&size=${args.size}&zoom=${args.zoom}&format=png&maptype=${args.maptype}&key=${args.apikey}&markers=size:mid%7Ccolor:0xe22400%7Clabel:%7C${args.lat_long}`;
       // Sla de locatieUrl op in het object voor later gebruik
       await this.initImage(locatieUrl1);
        // URLs voor navigatie en zoekopdrachten
        const googleSearch = `Google Search: https://www.google.com/maps/search/?api=1&query=${args.lat_long}`;
        const googleMaps = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=${this.homeylat},${this.homeylong}&destination=${args.lat_long}&travelmode=driving`;
        const googleMapsBicycling = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=${this.homeylat},${this.homeylong}&destination=${args.lat_long}&travelmode=bicycling`;
        const googleMapsTransit = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=${this.homeylat},${this.homeylong}&destination=${args.lat_long}&travelmode=transit`;
        const googleMapsWalking = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=${this.homeylat},${this.homeylong}&destination=${args.lat_long}&travelmode=walking`;
        const appleMaps = `Apple Maps route: http://maps.apple.com/?daddr=${args.lat_long}&dirflg=d`;
        
        return {
            'locatie_url': locatieUrl1, 
            'google_maps_url': googleSearch,
            'google_maps_route': googleMaps,
            'google_maps_route_bicycling': googleMapsBicycling,
            'google_maps_route_transit': googleMapsTransit,
            'google_maps_route_walking': googleMapsWalking,
            'apple_maps': appleMaps,
            'image': this.image
        };
    }    

    async handleActionCard6(args, state) {
        this.log('Action card 6 is triggered');
        const encodedStreet = encodeURIComponent(args.street);
        const encodedNumber = encodeURIComponent(args.number);
        const encodedCity = encodeURIComponent(args.city);

        // Google Static Map API voor afbeelding
        const locatieUrl2 = `https://maps.googleapis.com/maps/api/staticmap?auto=&scale&size=${args.size}&zoom=${args.zoom}&format=png&maptype=${args.maptype}&key=${args.apikey}&markers=size:mid%7Ccolor:0xe22400%7Clabel:%7C${encodedStreet}${encodedNumber}%2C${encodedCity}`;

        await this.initImage(locatieUrl2);

    
        // URLs voor navigatie en zoekopdrachten
        const googleSearch = `Google Search: https://www.google.com/maps/search/?api=1&query=${encodedStreet}${encodedNumber}%2C${encodedCity}`;
        const googleMaps = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${encodedStreet}%20${encodedNumber}%2C${encodedCity}&travelmode=driving`;
        const googleMapsBicycling = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${encodedStreet}%20${encodedNumber}%2C${encodedCity}&travelmode=bicycling`;
        const googleMapsTransit = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${encodedStreet}%20${encodedNumber}%2C${encodedCity}&travelmode=transit`;
        const googleMapsWalking = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${encodedStreet}%20${encodedNumber}%2C${encodedCity}&travelmode=walking`;
        const appleMaps = `Apple Maps route: http://maps.apple.com/?daddr=${encodedStreet}+${encodedNumber},${encodedCity}&dirflg=d`;
        
        return {
            'locatie_url': locatieUrl2, 
            'google_maps_url': googleSearch,
            'google_maps_route': googleMaps,
            'google_maps_route_bicycling': googleMapsBicycling,
            'google_maps_route_transit': googleMapsTransit,
            'google_maps_route_walking': googleMapsWalking,
            'apple_maps': appleMaps,
            'image': this.image
        };
    } 

    async handleActionCard9(args, state) {
        this.log('Action card 9 is triggered');
    
        // URLs voor navigatie en zoekopdrachten
        const googleSearch = `Google Search: https://www.google.com/maps/search/?api=1&query=${args.lat_long}`;
        const googleMaps = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${args.lat_long}&travelmode=driving`;      
        const googleMapsBicycling = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${args.lat_long}&travelmode=bicycling`;
        const googleMapsTransit = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${args.lat_long}&travelmode=transit`;
        const googleMapsWalking = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${args.lat_long}&travelmode=walking`;
        const appleMaps = `Apple Maps route: http://maps.apple.com/?daddr=${args.lat_long}&dirflg=d`;
        
        return {
            'google_maps_url': googleSearch,
            'google_maps_route': googleMaps,
            'google_maps_route_bicycling': googleMapsBicycling,
            'google_maps_route_transit': googleMapsTransit,
            'google_maps_route_walking': googleMapsWalking,
            'apple_maps': appleMaps,
        };
    } 

    async handleActionCard10(args, state) {
        this.log('Action card 10 is triggered');
        const encodedStreet = encodeURIComponent(args.street);
        const encodedNumber = encodeURIComponent(args.number);
        const encodedCity = encodeURIComponent(args.city);

        // URLs voor navigatie en zoekopdrachten
        const googleSearch = `Google Search: https://www.google.com/maps/search/?api=1&query=${encodedStreet}${encodedNumber}%2C${encodedCity}`;
        const googleMaps = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${encodedStreet}%20${encodedNumber}%2C${encodedCity}&travelmode=driving`;
        const googleMapsBicycling = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${encodedStreet}%20${encodedNumber}%2C${encodedCity}&travelmode=bicycling`;
        const googleMapsTransit = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${encodedStreet}%20${encodedNumber}%2C${encodedCity}&travelmode=transit`;
        const googleMapsWalking = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${encodedStreet}%20${encodedNumber}%2C${encodedCity}&travelmode=walking`;
        const appleMaps = `Apple Maps route: http://maps.apple.com/?daddr=${encodedStreet}+${encodedNumber},${encodedCity}&dirflg=d`;
        
        return {
            'google_maps_url': googleSearch,
            'google_maps_route': googleMaps,
            'google_maps_route_bicycling': googleMapsBicycling,
            'google_maps_route_transit': googleMapsTransit,
            'google_maps_route_walking': googleMapsWalking,
            'apple_maps': appleMaps,
        };
    } 

    async handleActionCard11(args, state) {
        this.log('Action card 11 is triggered');

        // Google Static Map API voor afbeelding
        const locatieUrl = `https://maps.googleapis.com/maps/api/staticmap?auto=&scale&size=400x400&zoom=18&format=png&key=${args.apikey}&markers=size:mid%7Ccolor:0xe22400%7Clabel:%7C${this.homeylat}%2C${this.homeylong}`;
        const image = await this.fetchImage(locatieUrl);
    
        // URLs voor navigatie en zoekopdrachten
        const googleSearch = `Google Search: https://www.google.com/maps/search/?api=1&query=${this.homeylat}%2C${this.homeylong}`;
        const googleMaps = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${this.homeylat}%2C${this.homeylong}&travelmode=driving`;
        const googleMapsBicycling = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${this.homeylat}%2C${this.homeylong}&travelmode=bicycling`;
        const googleMapsTransit = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${this.homeylat}%2C${this.homeylong}&travelmode=transit`;
        const googleMapsWalking = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${this.homeylat}%2C${this.homeylong}&travelmode=walking`;
        const appleMaps = `Apple Maps route: http://maps.apple.com/?daddr=${this.homeylat}%2C${this.homeylong}&dirflg=d`;
        
        return {
            'locatie_url': locatieUrl, 
            'google_maps_url': googleSearch,
            'google_maps_route': googleMaps,
            'google_maps_route_bicycling': googleMapsBicycling,
            'google_maps_route_transit': googleMapsTransit,
            'google_maps_route_walking': googleMapsWalking,
            'apple_maps': appleMaps,
            'image': image
        };
    } 

    async handleActionCard12(args, state) {
        this.log('Action card 12 is triggered');
    
        // URLs voor navigatie en zoekopdrachten
        const googleSearch = `Google Search: https://www.google.com/maps/search/?api=1&query=${this.homeylat}%2C${this.homeylong}`;
        const googleMaps = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${this.homeylat}%2C${this.homeylong}&travelmode=driving`;
        const googleMapsBicycling = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${this.homeylat}%2C${this.homeylong}&travelmode=bicycling`;
        const googleMapsTransit = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${this.homeylat}%2C${this.homeylong}&travelmode=transit`;
        const googleMapsWalking = `Google Maps route: https://www.google.com/maps/dir/?api=1&origin=&destination=${this.homeylat}%2C${this.homeylong}&travelmode=walking`;
        const appleMaps = `Apple Maps route: http://maps.apple.com/?daddr=${this.homeylat}%2C${this.homeylong}&dirflg=d`;
        
        return {
            'google_maps_url': googleSearch,
            'google_maps_route': googleMaps,
            'google_maps_route_bicycling': googleMapsBicycling,
            'google_maps_route_transit': googleMapsTransit,
            'google_maps_route_walking': googleMapsWalking,
            'apple_maps': appleMaps
        };
    } 



    }

module.exports = MapMyLocationApp;

import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationServiceProvider {    
    latitude: Number = 0;
    longitude: Number = 0;

    constructor(public geolocation: Geolocation) {
        this.watchLocation();
    }

    public watchLocation() {
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
            if (data.coords && data.coords.latitude) {
                console.log('coords: ', JSON.stringify(data));
                this.latitude = data.coords.latitude;
                this.longitude = data.coords.longitude;        
            } else {
                console.log('Error getting location', data);
            }
        
        });
    }

}

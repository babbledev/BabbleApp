import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { AuthServiceProvider } from './auth-service';
import { LocationServiceProvider } from './location-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';

@Injectable()
export class PostServiceProvider {
    posts: any = [];
    loadingPosts: boolean = false;

    constructor(public geolocation: Geolocation, public locationService: LocationServiceProvider,
                public authService: AuthServiceProvider, public http: Http) {
            
    }

    public updateFeed() {
        return Observable.create(observer => {
            this.loadingPosts = true;

            if (!this.locationService.longitude || !this.locationService.latitude) {
                console.log('Location not found. Cancelling feed update.');
                this.loadingPosts = false;
                observer.next(true);
                observer.complete();
                return;
            }

            let query = '?lon=' + this.locationService.longitude + '&lat=' + this.locationService.latitude;

            console.log('headers: ' + JSON.stringify(this.authService.createHeaders()));
            this.http.get(AuthServiceProvider.API_URL + '/posts' + query,
                this.authService.createHeaders())
                .subscribe(response => {
                    this.loadingPosts = false;
                    let data = response.json();

                    console.log("received feed update: " + JSON.stringify(data));

                    data.posts.forEach((post) => {
                        if(post.distanceMiles < 1) {
                            post.distanceMiles = "Less than a mile away."
                        } else {
                            if(post.distanceMiles > 5) {
                                post.distanceMiles = Math.round(post.distanceMiles);
                                post.distanceMiles = post.distanceMiles + " miles away."
                            } else {
                                post.distanceMiles = post.distanceMiles + " miles away."
                            }
                        }
                    })

                    this.posts = data.posts;

                    observer.next(false);
                    observer.complete();
                }, err => {
                    this.loadingPosts = false;
                    let data = err.json();
                    console.log('error updating posts.')
                    console.log(JSON.stringify(data));

                    observer.next(true);
                    observer.complete();
                }
            );
        })
    }

}

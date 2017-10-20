import { Http } from '@angular/http';
import { LocationServiceProvider } from './../../services/location-service';
import { AuthServiceProvider } from './../../services/auth-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    posts: any = [];
    loadingPosts: boolean = false;

    constructor(public navCtrl: NavController, public authService: AuthServiceProvider,
        public locationService: LocationServiceProvider, public http: Http) {

    }

    ionViewDidLoad() {
        this.updateFeed();
    }

    public updateFeed() {
        this.loadingPosts = true;

        let query = '?lat=' + this.locationService.latitude + '&lon=' + this.locationService.latitude;

        this.http.get(AuthServiceProvider.API_URL + '/posts' + query,
            this.authService.createHeaders())
            .subscribe(response => {
                this.loadingPosts = false;
                let data = response.json();

                console.log("received feed update: " + JSON.stringify(data));
                this.posts = data.posts;
            }, err => {
                this.loadingPosts = false;
                let data = err.json();
                console.log('error updating posts.')
                console.log(JSON.stringify(data));
            }
        );
    }

}

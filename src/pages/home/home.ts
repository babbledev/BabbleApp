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
    posts: any;
    loadingPosts: boolean = false;

    constructor(public navCtrl: NavController, public authService: AuthServiceProvider,
    locationService: LocationServiceProvider, public http: Http) {

    }

    public updateFeed() {
        this.loadingPosts = true;
        this.http.get(AuthServiceProvider.API_URL + '/posts',
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

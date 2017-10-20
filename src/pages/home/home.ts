import { NewPostComponent } from './../../components/new-post/new-post';
import { Http } from '@angular/http';
import { LocationServiceProvider } from './../../services/location-service';
import { AuthServiceProvider } from './../../services/auth-service';
import { Component, Inject } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    posts: any = [];
    loadingPosts: boolean = false;

    constructor(private authService: AuthServiceProvider, private locationService: LocationServiceProvider,
         private http: Http, private modalController: ModalController) {

    }

    ionViewDidLoad() {
        this.updateFeed();
    }

    public updateFeed() {
        this.loadingPosts = true;

        let query = '?lat=' + this.locationService.latitude + '&lon=' + this.locationService.latitude;

        console.log('headers: ' + JSON.stringify(this.authService.createHeaders()));
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

    public presentNewPostModal() {
        let newPostModal = this.modalController.create(NewPostComponent);
        newPostModal.present();
    }

}

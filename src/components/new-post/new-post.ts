import { LocationServiceProvider } from './../../services/location-service';
import { AuthServiceProvider } from './../../services/auth-service';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the NewPostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'new-post',
  templateUrl: 'new-post.html'
})
export class NewPostComponent {

    postContent: string;

    constructor(public http: Http, public locationService: LocationServiceProvider,
        public authService: AuthServiceProvider, public viewController: ViewController){
        console.log('Hello NewPostComponent Component');
        
    }

    publish() {
        this.http.post(AuthServiceProvider.API_URL + '/post',
            {
                content: this.postContent,
                longitude: this.locationService.longitude,
                latitude: this.locationService.latitude
            },
            this.authService.createHeaders())
            .subscribe(response => {
                let data = response.json();
                this.viewController.dismiss();
            }, err => {
                let data = err.json();

                console.log('failed to post. error: ', JSON.stringify(data));
            }
        );
    }

    dismiss() {
        this.viewController.dismiss();
    }
}

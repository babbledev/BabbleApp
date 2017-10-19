import { TabsPage } from './../tabs/tabs';
import { AuthServiceProvider } from './../../services/auth-service';
import { HttpModule } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Device } from "@ionic-native/device";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpModule,
        public platform: Platform, public device: Device, public authService: AuthServiceProvider,
        public nav: NavController) {
        
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            let deviceId = this.device.uuid;
            if (!deviceId) {
                deviceId = "test_browser";
            }

            console.log('Device ID: ' + deviceId);
            this.authService.login({ device_id: deviceId }).subscribe(err => {
                if (err) {
                    console.log('error logging in: ' + err);
                } else {
                    this.nav.setRoot(TabsPage);
                }
            });
        })
    }

    
}    

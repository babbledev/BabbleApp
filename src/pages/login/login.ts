import { RegisterPage } from './../register/register';
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
        this.login();
    }

    login() {
        this.platform.ready().then(() => {
            let deviceId = this.device.uuid;
            if (!deviceId) {
                deviceId = "test_browser";
            }

            console.log('Device ID: ' + deviceId);
            this.authService.login(deviceId).subscribe(err => {
                if (err) {
                    if (err.noAccount) {
                        this.navCtrl.setRoot(RegisterPage);
                    } else {
                        console.log('error logging in: ' + JSON.stringify(err));

                        //retry in 5 seconds
                        setTimeout(() => {
                            this.login()
                        }, 5000);
                    }
                } else {
                    this.navCtrl.setRoot(TabsPage);
                }
            });
        })
    }


}    

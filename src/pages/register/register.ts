import { HomePage } from './../home/home';
import { AuthServiceProvider } from './../../services/auth-service';
import { Device } from '@ionic-native/device';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public platform: Platform, public device: Device, public authService: AuthServiceProvider,
        public nav: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
      this.platform.ready().then(() => {
          let deviceId = this.device.uuid;
          if (!deviceId) {
              deviceId = "test_browser";
          }

          console.log('Device ID: ' + deviceId);
          this.authService.register({ device_id: deviceId }).subscribe(err => {
              if (err) {
                  console.log('error registering: ' + err);
              }

              this.nav.setRoot(HomePage);
          });
      })
  }  
}

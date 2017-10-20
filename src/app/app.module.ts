import { RegisterPage } from './../pages/register/register';
import { NewPostComponent } from './../components/new-post/new-post';
import { LocationServiceProvider } from './../services/location-service';
import { AuthServiceProvider } from './../services/auth-service';
import { Device } from '@ionic-native/device';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

import { ProfilePage } from '../pages/profile/profile';
import { NotificationsPage } from '../pages/notifications/notifications';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    NewPostComponent,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule, 
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    NewPostComponent,
    RegisterPage
  ],
  providers: [
    StatusBar,
    Device, 
    AuthServiceProvider,
    LocationServiceProvider,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

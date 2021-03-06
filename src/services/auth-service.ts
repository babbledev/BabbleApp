import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Rx";

export class User {
    _id: String;
    token: String;

    constructor(_id: String, token: String) {
        this._id = _id;
        this.token = token;
    }
}

@Injectable()
export class AuthServiceProvider {
    public static API_URL = 'http://localhost:3000'; 

    currentUser: User;
    
    constructor(public http: Http) {
        console.log('Hello AuthServiceProvider Provider');

    }

    public login(deviceId) {
        return Observable.create(observer => {
            this.http.post(AuthServiceProvider.API_URL + '/users/login',
                {deviceId: deviceId},
                {
                    headers: new Headers({ 'Content-Type': 'application/json' })
                })
                .subscribe(response => {
                    let data = response.json();

                    if (data.error) {
                        this.currentUser = null;
                        observer.next(data.error);
                        observer.complete();
                    } else {
                        console.log("login token: " + data.token);
                        this.currentUser = new User(data.email, data.token);

                        // navController.setRoot(TabsPage);
                        observer.next(false);
                        observer.complete();
                    }
                }, err => {
                    let data = err.json();

                    if (data.noAccount) {
                        // navController.setRoot(RegisterPage);
                        observer.next({noAccount: true});
                        observer.complete();
                    } else {
                        observer.next({error: true});
                        observer.complete();
                    }
                }
            );
        });
    }

    public createHeaders(): any {
        return {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.getToken()
            })
        }
    }

    public register(deviceId) {
        return Observable.create(observer => {
            this.http.post(AuthServiceProvider.API_URL + '/users/register',
                { deviceId: deviceId },
                {
                    headers: new Headers({ 'Content-Type': 'application/json' })
                })
                .subscribe(response => {
                    let data = response.json();

                    console.log("register token: " + JSON.stringify(data));
                    this.currentUser = new User(data._id, data.token);

                    observer.next(false);
                    observer.complete();
                }, err => {
                    this.currentUser = null;

                    let data = err.json();
                    console.log('error in registration.')
                    console.log(data);

                    observer.next(data);
                    observer.complete();
                }
            );
        });
    }

    public getCurrentUser(): User {
        return this.currentUser;
    }

    public getToken(): String {
        return this.currentUser ? this.currentUser.token : "";
    }

    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }

}

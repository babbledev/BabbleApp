import { PostServiceProvider } from './../../services/post-service';
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
         private http: Http, private modalController: ModalController, private postService: PostServiceProvider) {
        this.posts = postService.posts;
        this.loadingPosts = postService.loadingPosts;
    }

    ionViewDidLoad() {
        this.postService.updateFeed();
    }

    public presentNewPostModal() {
        let newPostModal = this.modalController.create(NewPostComponent);
        newPostModal.present();
    }

    getPosts() {
        return this.postService.posts;
    }

    updateFeed() {
        this.postService.updateFeed();
    }

}

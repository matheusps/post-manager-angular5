import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './create-post/create-post.component';

import { PostService } from './shared/post-service.service';
import { EditorComponent } from './helpers/editor/editor.component'

const appRoutes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'create-post/new', component: CreatePostComponent },
  { path: 'create-post/:id', component: CreatePostComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsComponent,
    CreatePostComponent,
    EditorComponent
  ],
  imports: [
    
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [
    PostsComponent
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PostService {

  private url: string = "http://localhost:8080/posts/";
  private headers: Headers;
  private options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({ 
      'Content-Type': 'application/json', 
      'Accept': 'q=0.8;application/json;q=0.9'
    });

    this.options = new RequestOptions({ headers: this.headers });
  }
  
  getPosts(){
    return this.http.get(this.url)
      .map(res => res.json());
  }
  
  getPost(id){
    return this.http.get(this.getPostUrl(id))
      .map(res => res.json());
  }
  
  addPost(post){
    return this.http.post(this.url, JSON.stringify(post))
      .map(res => res.json());
  }
  
  updatePost(post){
    let body = JSON.stringify(post);
    let url = this.getPostUrl(post.id);

    return this.http.put(url, body, this.options)
      .map(res => res.json());
  }
  
  deletePost(id){
    return this.http.delete(this.getPostUrl(id))
      .map(res => res.json());
  }
  
  private getPostUrl(id){
    return this.url + id;
  }

}

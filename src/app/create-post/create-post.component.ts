import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Post } from '../shared/post';
import { PostService } from '../shared/post-service.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html'
})

export class CreatePostComponent implements OnInit {

  title: string;
  post: Post = new Post();
  defaultPostBody: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ){}

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Post' : 'New Post';

      if (!id)
        return;

      this.postService.getPost(id)
        .subscribe(
          post => {
            this.post = post;
            this.defaultPostBody = post.body;
          },
          res => {
            if (res.status == 404) {
              this.router.navigate(['']);
            }
          });
    });
  }

  save() {

    var result;

    if (this.post.id){
      result = this.postService.updatePost(this.post);
    } else {
      result = this.postService.addPost(this.post);
    }

    result.subscribe(data => this.router.navigate(['']));
  }

  handleKeyup(event){
    this.post.body = event;
  }

}

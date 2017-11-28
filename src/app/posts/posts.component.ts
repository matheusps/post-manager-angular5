import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post-service.service';

import { Post } from '../shared/post';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})

export class PostsComponent implements OnInit {
  posts: Post[] = [];
  activePost: Post = new Post();

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.postService.getPosts()
    .subscribe(data => this.posts = data);
  }

  deletePost(post){
    if (confirm("Are you sure you want to delete " + post.title + "?")) {
      var index = this.posts.indexOf(post);
      this.posts.splice(index, 1);

      this.postService.deletePost(post.id)
        .subscribe(null,
          err => {
            alert("Could not delete user.");
            // Revert the view back to its original state
            this.posts.splice(index, 0, post);
          });
    }
  }

  setAsActive(post){
    this.activePost = post;
  }

}

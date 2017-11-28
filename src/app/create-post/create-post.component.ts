import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Post } from '../shared/post';
import { PostService } from '../shared/post-service.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html'
})

export class CreatePostComponent implements OnInit {

  form: FormGroup;
  title: string;
  post: Post = new Post();

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) { 
    this.form = formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      body: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
    });
  }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit User' : 'New User';

      if (!id)
        return;

      this.postService.getPost(id)
        .subscribe(
          post => this.post = post,
          response => {
            if (response.status == 404) {
              this.router.navigate(['']);
            }
          });
    });
  }

  save() {

    var result,
    postValue = this.form.value;

    if (this.post.id){
      result = this.postService.updatePost(this.post);
    } else {
      result = this.postService.addPost(postValue);
    }

    result.subscribe(data => this.router.navigate(['']));
  }

}

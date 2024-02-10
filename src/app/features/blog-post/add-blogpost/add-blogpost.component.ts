import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  blogpostSubscription ?: Subscription;

  constructor(private services : BlogPostService,
    private router: Router){
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date()
    }
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onFormSubmit(){
    this.blogpostSubscription = this.services.createBlogPost(this.model)
    .subscribe(
    {
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    }
    )
   
  }

  ngOnDestroy(): void {
    this.blogpostSubscription ?.unsubscribe();
  }
}

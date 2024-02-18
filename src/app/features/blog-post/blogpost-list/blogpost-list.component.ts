import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent  implements OnInit,OnDestroy {
  blogposts: BlogPost[] = [];
  blogPostSubscription ?: Subscription;
  constructor(private services : BlogPostService){

  }
  ngOnDestroy(): void {
    this.blogPostSubscription ?. unsubscribe();
  }
  ngOnInit(): void {
    this.blogPostSubscription = this.services.getAllBlogPosts().subscribe({
      next: (response: BlogPost[])=>{
        this.blogposts = response;
      }
    })
  }

}

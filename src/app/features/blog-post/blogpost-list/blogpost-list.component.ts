import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent  implements OnInit,OnDestroy {
  blogpost[]: Blogpost;
  blogPostSubscription ?: Subscription;
  constructor(private services : BlogPostService){

  }
  ngOnDestroy(): void {
    this.blogPostSubscription ?. unsubscribe();
  }
  ngOnInit(): void {
    this.blogPostSubscription = this.services.getAllBlogPosts().subscribe({
      next: (response)=>{
        this.blogpost = {

        }
      }
    })
  }

}

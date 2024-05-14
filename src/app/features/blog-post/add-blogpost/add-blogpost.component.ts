import { CategoryService } from './../../category/services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from '../../category/models/CategoryList.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  categories$ ?: Observable<Category[]>;
  blogpostSubscription ?: Subscription;

  constructor(private services : BlogPostService,
    private router: Router,
  private categoryService: CategoryService){
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
    this.categories$ = this.categoryService.getAllCategories();
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

import { CategoryService } from './../../category/services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Category } from '../../category/models/CategoryList.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  routeSubscription ?: Subscription;
  model?: BlogPost;
  categories$ ?: Observable<Category[]>; 
  selectedCategories ?: string[]; 
  updateBlogPostSubscription ?: Subscription;
  getBlogPostSubscription?: Subscription;

  constructor(private route:ActivatedRoute,
    private blogPostService: BlogPostService,
    private CategoryService: CategoryService, 
    private router:Router
  ){

  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
  }

  ngOnInit(): void {

   this.categories$ = this.CategoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
       this.id = params.get('id');
       if(this.id){
        this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
          next:(res)=>{
              this.model = res;
              this.selectedCategories = res.categories.map(x => x.id);
          }
        })
       }
       
      }
    })
  }

  onFormSubmit(): void {
    if(this.model && this.id){
      var updateBlogPost : UpdateBlogPost ={
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      }

     this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
        next:(rs)=>{
          this.router.navigateByUrl('/admin/blogposts')
        }
      });
    }
  }
}

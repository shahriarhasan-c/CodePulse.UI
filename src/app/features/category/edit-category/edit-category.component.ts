import { CategoryService } from './../services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/CategoryList.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramSubscription ?: Subscription;
  editCategorySubscription ?: Subscription;
  category ?: Category;


  constructor(private route: ActivatedRoute,
    private CategoryService: CategoryService,
    private router: Router){ 

  }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id){
          this.CategoryService.getCategoryById(this.id)
          .subscribe({
            next:(response)=>{
              this.category = response;
            }
          });
        }
      }
    });
  }

  onFormSubmit(){
    const updateCategoryRequest: UpdateCategoryRequest={
      name: this.category?.name ?? "",
      urlHandle: this.category?.urlHandle ?? "",
    };
    if(this.id){
      this.editCategorySubscription = this.CategoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next: () => this.router.navigateByUrl('/admin/categories')
      })
    }
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/CategoryList.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
 categories$ ?: Observable<Category[]>;
  constructor(private _categoryService: CategoryService){
  }
  ngOnInit(): void {
    this.categories$ = this._categoryService.getAllCategories()
  }
}

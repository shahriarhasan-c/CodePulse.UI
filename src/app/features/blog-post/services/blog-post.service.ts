import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http : HttpClient) { }

  createBlogPost(data: AddBlogPost) : Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost`, data)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { environment } from 'src/environments/environment.development';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http : HttpClient) { }

  createBlogPost(data: AddBlogPost) : Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost`, data);
  }
  
  getAllBlogPosts() : Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPost`);
  }

  getBlogPostById(id: string) : Observable<BlogPost>{
    debugger;
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/Blogpost/${id}`);
  }

  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPost) : Observable<BlogPost>{
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}`,updatedBlogPost);
  }
}

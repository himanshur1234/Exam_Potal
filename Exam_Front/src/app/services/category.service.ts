import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

 export interface Category {
  id: number;  // Make id optional for new categories
  title: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }


  // load all categories

  public _categories(){
    return this.http.get(`${baseUrl}/category/`)
  }

  //load single category
  public getCategory(cid:number){
    return this.http.get(`${baseUrl}/category/${cid}`);
  }

  //add new category
  public addcategory(category:any){
    return this.http.post(`${baseUrl}/category/`,category);
  }

  // update category
  public updatecategory(category:any){
    return this.http.put(`${baseUrl}/category/`,category);
  }

  //delete category
  public deletecategory(cid:number){
    return this.http.delete(`${baseUrl}/category/${cid}`);
  }
}

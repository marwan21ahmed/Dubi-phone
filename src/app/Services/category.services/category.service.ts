import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICategory } from '../../Models/icategory';
@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private URL!:string
  constructor(private httpClient:HttpClient) {
    this.URL=environment.serverURL+"/api/Category"
  }
  getAllCategoriesWithBrands() {
    return this.httpClient.get<ICategory[]>(`${this.URL}/GetAllCategoriesWithBrands`);
  }
  getAllBrands():Observable<ICategory[]>{
    return this.httpClient.get<ICategory[]>(this.URL)
  }
}

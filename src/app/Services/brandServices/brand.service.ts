import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../../Models/ibrand';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private URL!:string
  constructor(private httpClient:HttpClient) {
    this.URL=environment.serverURL+"/api/Brand"
  }

  GetAllBrandsWithCategories() {
    return this.httpClient.get<IBrand[]>(`${this.URL}/GetAllBrandsWithCategories`);
  }

  getBrands():Observable<IBrand[]>{
    return this.httpClient.get<IBrand[]>(this.URL)
  }

}

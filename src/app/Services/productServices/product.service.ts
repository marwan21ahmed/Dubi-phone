import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';

import { IProduct } from '../../Models/product/iproduct';
import { IPagination } from '../../Models/ipagination';
import { IProductDetails } from '../../Models/product/iproduct-details';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private URL!: string;
  constructor(private httpClient: HttpClient) {
    this.URL = environment.serverURL + '/api/product';
  }

  //////////////////////////////////////////////////////////////////////////
  //Pagination
  getProductsPagination(URLurlParams: IPagination): Observable<IProduct[]> {
    let urlParams = new HttpParams();

    urlParams = urlParams
      .append('numOfProductPerPage', URLurlParams.numOfProductPerPage)
      .append('pageNumber', URLurlParams.pageNumber);

    if (URLurlParams.categoryId != undefined)
      urlParams = urlParams.append('categoryId', URLurlParams.categoryId);
    if (URLurlParams.brandId != undefined)
      urlParams = urlParams.append('brandId', URLurlParams.brandId);

    return this.httpClient.get<IProduct[]>(`${this.URL}/GetProductPagination`, {
      params: urlParams,
    });
  }
  ////////////////////////////////////////////////////////////
  //min & max

  getMinPrice(
    categoryId: number | null=null,
    brandId: number | null=null
  ): Observable<number> {
    let urlParams = new HttpParams();

    if (categoryId != null)
      urlParams = urlParams.append('categoryId', categoryId);
    if (brandId != null) urlParams = urlParams.append('brandId', brandId);

    return this.httpClient.get<number>(`${this.URL}/MinPrice`, {
      params: urlParams,
    });
  }

  getMaxPrice( categoryId: number | null=null,brandId: number | null=null): Observable<number> {
    let urlParams = new HttpParams();

    if (categoryId != null)
      urlParams = urlParams.append('categoryId', categoryId);
    if (brandId != null) urlParams = urlParams.append('brandId', brandId);

    return this.httpClient.get<number>(`${this.URL}/MaxPrice`, {
      params: urlParams,
    });
  }



  ////////////////////////////////////////////////////////////
  //OrderBy
  getProductsOrderBy(
    criteria: string,
    way: string,
    URLurlParams: IPagination
  ): Observable<IProduct[]> {
    let urlParams = new HttpParams();

    urlParams = urlParams
      .append('numOfProductPerPage', URLurlParams.numOfProductPerPage)
      .append('pageNumber', URLurlParams.pageNumber);

    if (URLurlParams.categoryId != undefined)
      urlParams = urlParams.append('categoryId', URLurlParams.categoryId);
    if (URLurlParams.brandId != undefined)
      urlParams = urlParams.append('brandId', URLurlParams.brandId);

    if (criteria === 'price')
      return this.httpClient.get<IProduct[]>(
        `${this.URL}/OrderByPrice?way=${way}`,
        { params: urlParams }
      );
    return this.httpClient.get<IProduct[]>(
      `${this.URL}/OrderByName?way=${way}`,
      { params: urlParams }
    );
  }
  ///////////////////////////////////////////////////////////////////////////
  //filterByPrice
  getProductsFilterByPrice(
    min: number,
    max: number,
    URLurlParams: IPagination
  ): Observable<IProduct[]> {
    let urlParams = new HttpParams();

    urlParams = urlParams
      .append('numOfProductPerPage', URLurlParams.numOfProductPerPage)
      .append('pageNumber', URLurlParams.pageNumber)
      .append('min', min)
      .append('max', max);
    if (URLurlParams.categoryId != undefined)
      urlParams = urlParams.append('categoryId', URLurlParams.categoryId);
    if (URLurlParams.brandId != undefined)
      urlParams = urlParams.append('brandId', URLurlParams.brandId);

    return this.httpClient.get<IProduct[]>(
      `${this.URL}/FilterByPrice`,
      { params: urlParams }
    );
  }
  //////////////////////////////////////////////////////////////////////////////
  //filterByStock
  getProductsFilterByStock(URLurlParams: IPagination): Observable<IProduct[]> {
    let urlParams = new HttpParams();

    urlParams = urlParams
      .append('numOfProductPerPage', URLurlParams.numOfProductPerPage)
      .append('pageNumber', URLurlParams.pageNumber);

    if (URLurlParams.categoryId != undefined)
      urlParams = urlParams.append('categoryId', URLurlParams.categoryId);
    if (URLurlParams.brandId != undefined)
      urlParams = urlParams.append('brandId', URLurlParams.brandId);

    return this.httpClient.get<IProduct[]>(`${this.URL}/FilterByStock`, {
      params: urlParams,
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  getProductsByName(name: string,URLurlParams: IPagination): Observable<IProduct[]> {
    let urlParams = new HttpParams();

    urlParams = urlParams
      .append('numOfProductPerPage', URLurlParams.numOfProductPerPage)
      .append('pageNumber', URLurlParams.pageNumber);

    return this.httpClient.get<IProduct[]>(this.URL + '/' + name,{
      params: urlParams,
    });
  }

  getProductByID(id: number): Observable<IProductDetails> {
    return this.httpClient.get<IProductDetails>(this.URL + '/' + id);
  }
  getProductsCountByCategory(id: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.URL + '/catCount/' + id);
  }
  getProductsCountByBrand(id: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.URL + '/catCount/' + id);
  }
}

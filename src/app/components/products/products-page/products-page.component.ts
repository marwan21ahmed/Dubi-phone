import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CardComponent } from '../../shared/card/card.component';
import { BrandsComponent } from '../../shared/brands/brands.component';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

import { IBrand } from '../../../Models/ibrand';

import { ICategory } from '../../../Models/icategory';
import { BrandService } from '../../../Services/brandServices/brand.service';
import { CategoryService } from '../../../Services/category.services/category.service';
import { CategoriesComponent } from '../../shared/categories/categories.component';
import { ProductService } from '../../../Services/productServices/product.service';

import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { delay } from 'rxjs';
import { IProduct } from '../../../Models/product/iproduct';
import { IPagination } from '../../../Models/ipagination';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationService } from '../../../Services/localiztionService/localization.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  imports: [
    DropdownModule,
    CardComponent,
    BrandsComponent,
    BrandsComponent,
    CategoriesComponent,
    RouterModule,
    FormsModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule,
    TranslateModule,
  ],
})
export class ProductsPageComponent implements OnInit, AfterViewInit {
  categories: ICategory[] = [];
  brands: IBrand[] = [];
  mainUrl: string = '';
  firstPartUrl: string = '';
  SecondPartUrl: string = '';
  isFilter1 = true;
  sorts: any[] = [
    { name: 'Sort by price: low to high', value: 1 },
    { name: 'Sort by price: High to low ', value: 2 },
    { name: 'Sort by name: ascending', value: 3 },
    { name: 'Sort by name: descending', value: 4 },
  ];
  sortsAR: any[] = [
    { name: 'ترتيب حسب: الأدنى سعراً للأعلى', value: 1 },
    { name: 'ترتيب حسب: الأعلى سعراً للأدنى ', value: 2 },
    { name: 'ترتيب حسب: الأدنى الاسم للأعلى', value: 3 },
    { name: 'ترتيب حسب: الأعلى الاسم للأدنى ', value: 4 },
  ];

  selectedSort!: string;
  products: IProduct[] = [];
  @ViewChild('ProductGrid') productGrid!: ElementRef;
  @ViewChild('test') test!: ElementRef;
  @ViewChild('minRef') minRef!: ElementRef;
  @ViewChild('maxRef') maxRef!: ElementRef;

  // infinite scroll
  isLoading: boolean = false;
  currentPage!: number;
  itemPerPage!: number;
  maxPageNumber!: number;
  count!: number;
  stock!: number;
  minPrice!: number;
  maxPrice!: number;

  isArabic!: boolean;

  isFilterPrice: boolean = false;
  isFilterStock: boolean = false;

  isOrderBy: boolean = false;
  isSearch: boolean = false;
  showBreadcrumbs: boolean = true;

  searchResult: string = '';
  criteria!: string;
  way!: string;
  toggleIsLoading = () => (this.isLoading = !this.isLoading);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _brandService: BrandService,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private localizationService: LocalizationService
  ) {
    this.localizationService.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isLoading) {
          this.onScroll();
          if (this.maxPageNumber === this.currentPage) {
            observer.unobserve(entry.target);
          }
        }
      });
    });
    observer.observe(this.test.nativeElement);

    this.isOrderBy = false;
    this.isFilterPrice = false;
    this.isFilterStock = false;

    this.itemPerPage = 6;
    this.currentPage = 1;
  }

  ngOnInit() {


    this._productService.getMinPrice().subscribe((p) => (this.minPrice = p));
    this._productService.getMaxPrice().subscribe((p) => (this.maxPrice = p));

    this.mainUrl = this.router.url.split('/')[1];
    this.firstPartUrl = this.router.url.split('/')[2];
    this.SecondPartUrl = this.router.url.split('/')[3];

    this._productService.getMinPrice().subscribe((p) => (this.minPrice = p));
    this._productService.getMaxPrice().subscribe((p) => (this.maxPrice = p));
    //

    //Load the Data
    this.loadData();
    if (this.mainUrl === 'brand') {
      this._categoryService.getAllBrands().subscribe({
        next: (categories) => {
          this.categories = categories;
        },
      });
       this.routeBrandCheck();
    } else {
      this._brandService.getBrands().subscribe({
        next: (brands) => {
          this.brands = brands;
        },
      });
       if (!this.isSearch) this.routeCategoryCheck();
    }
  }

  handleGrid(e: Event) {
    let img = ((e.target as HTMLElement).querySelector('img') ??
      (e.target as HTMLElement)) as HTMLImageElement;
    this.isFilter1 = !this.isFilter1;
    if (this.isFilter1) {
      img.src = 'assets/Images/filter.svg';
      this.productGrid.nativeElement.className = 'products-grid';
    } else {
      img.src = 'assets/Images/filter-2.svg';
      this.productGrid.nativeElement.className = 'products-grid-one';
    }
  }

  routeCategoryCheck() {
    let isCorrect = false;
    if (this.firstPartUrl !== undefined && this.SecondPartUrl !== undefined) {
      this._categoryService.getAllCategoriesWithBrands().subscribe({
        next: (categories: ICategory[]) => {
          categories.forEach((category: ICategory) => {
            if (
              category.name.split(' ').join('').toLowerCase() ===
              this.firstPartUrl
            ) {
              if (
                category.brands?.some(
                  (brands) => brands.toLowerCase() === this.SecondPartUrl
                )
              )
                isCorrect = true;
            }
          });
          if (!isCorrect) this.router.navigate(['/NotFound']);
        },
      });
    } else if (this.firstPartUrl !== undefined) {
      this._categoryService.getAllCategoriesWithBrands().subscribe({
        next: (categories: ICategory[]) => {
          categories.forEach((category: ICategory) => {
            if (
              category.name.split(' ').join('').toLowerCase() ===
              this.firstPartUrl
            ) {
              isCorrect = true;
            }
          });
          if (!isCorrect) this.router.navigate(['/NotFound']);
        },
      });
    }
  }
  routeBrandCheck() {
    let isCorrect = false;
    if (this.firstPartUrl !== undefined) {
      this._brandService.GetAllBrandsWithCategories().subscribe({
        next: (brands: IBrand[]) => {
          brands.forEach((brand: IBrand) => {
            if (
              brand.name.split(' ').join('').toLowerCase() === this.firstPartUrl
            ) {
              isCorrect = true;
            }
          });
          if (!isCorrect) this.router.navigate(['/NotFound']);
        },
      });
    }
  }
  OrderBy(test: any) {

    this.ngAfterViewInit();
    let criteria = '';
    let way = '';

    switch (test.value) {
      case 1:
        criteria = 'price';
        way = 'ASC';
        break;
      case 2:
        criteria = 'price';
        way = 'DESC';
        break;
      case 3:
        criteria = 'name';
        way = 'ASC';
        break;
      case 4:
        criteria = 'price';
        way = 'DESC';
        break;
    }

    this.criteria = criteria;
    this.way = way;

    this.toggleIsLoading();
    this.isOrderBy = true;

    let URLparams: IPagination = {
      numOfProductPerPage: this.itemPerPage,
      pageNumber: this.currentPage,
    };
    this._productService
      .getProductsOrderBy(criteria, way, URLparams)
      .subscribe({
        next: (data: any) => {
          this.products = data.entity;
          this.maxPageNumber = Math.ceil(data.count / this.itemPerPage);
          this.count = data.count;
          this.stock = data.stock;
        },
        complete: () => {
          this.toggleIsLoading();
        },
      });
  }
  ///////////////////////////////////////////////////////////////
  //filter
  //by Price
  public filterByPrice() {
    this.ngAfterViewInit();
    this.toggleIsLoading();
    this.isFilterPrice = true;

    const min = Number(this.minRef.nativeElement.value);
    const max = Number(this.maxRef.nativeElement.value);
    let URLparams: IPagination = {
      numOfProductPerPage: this.itemPerPage,
      pageNumber: this.currentPage,
    };
    this._productService
      .getProductsFilterByPrice(min, max, URLparams)
      .pipe(delay(2000))
      .subscribe({
        next: (data: any) => {
          this.products = data.entity;
          this.maxPageNumber = Math.ceil(data.count / this.itemPerPage);
          this.count = data.count;
          this.stock = data.stock;
        },
        error: (error) => {
          console.log(error.message);
        },
        complete: () => {
          this.toggleIsLoading();
        },
      });
  }

  // by Stock
  public filterByStock() {
    this.ngAfterViewInit();
    this.toggleIsLoading();
    this.isFilterPrice = false;

    let URLparams: IPagination = {
      numOfProductPerPage: this.itemPerPage,
      pageNumber: this.currentPage,
    };
    this._productService
      .getProductsFilterByStock(URLparams)
      .pipe(delay(2000))
      .subscribe({
        next: (data: any) => {
          this.products = data.entity;
          this.maxPageNumber = Math.ceil(data.count / this.itemPerPage);
          this.count = data.count;
          this.stock = data.stock;
          console.log(this.products);
        },
        error: (error) => {
          console.log(error.message);
        },
        complete: () => {
          this.toggleIsLoading();
        },
      });
  }

  ////////////////////////////////////////////////////////////////

  //Infinite Scroll Functions
  loadData() {
    this.itemPerPage = 6;
    this.currentPage = 1;
    this.toggleIsLoading();
    let URLparams: IPagination = {
      numOfProductPerPage: this.itemPerPage,
      pageNumber: this.currentPage,
    };
    if (this.router.url.includes('search')) {
      this.searchResult = history.state['searchResult'];
      this._productService.getProductsByName(this.searchResult, URLparams).subscribe({
        next: (data: any) => {
          this.products = data.entity;
          this.maxPageNumber = Math.ceil(data.count / this.itemPerPage);
          this.count = data.count;
          this.stock = data.stock;
        },
        error: (error) => {
          console.log(error.message);
        },
        complete: () => {
          this.toggleIsLoading();
        },
      });
      this.showBreadcrumbs = false;
      this.isSearch = true;
    } else
      this._productService.getProductsPagination(URLparams).subscribe({
        next: (data: any) => {
          this.products = data.entity;
          this.maxPageNumber = Math.ceil(data.count / this.itemPerPage);
          this.count = data.count;
          this.stock = data.stock;
        },
        error: (error) => {
          console.log(error.message);
        },
        complete: () => {
          this.toggleIsLoading();
        },
      });
  }
  appendData() {
    this.toggleIsLoading();
    let URLparams: IPagination = {
      numOfProductPerPage: this.itemPerPage,
      pageNumber: this.currentPage,
    };
    if (this.isFilterPrice) {
      const min = Number(this.minRef.nativeElement.value);
      const max = Number(this.maxRef.nativeElement.value);
      this._productService
        .getProductsFilterByPrice(min, max, URLparams)
        .pipe(delay(2000))
        .subscribe({
          next: (data: any) => {
            this.products = [...this.products, ...data.entity];
          },
          error: (error) => {
            console.log(error.message);
          },
          complete: () => {
            this.toggleIsLoading();
          },
        });
    } else if (this.isFilterStock) {
      this._productService
        .getProductsFilterByStock(URLparams)
        .pipe(delay(2000))
        .subscribe({
          next: (data: any) => {
            this.products = [...this.products, ...data.entity];
          },
          error: (error) => {
            console.log(error.message);
          },
          complete: () => {
            this.toggleIsLoading();
          },
        });
    } else if (this.isOrderBy) {
      this._productService
        .getProductsOrderBy(this.criteria, this.way, URLparams)
        .pipe(delay(2000))
        .subscribe({
          next: (data: any) => {
            this.products = [...this.products, ...data.entity];
          },
          error: (error) => {
            console.log(error.message);
          },
          complete: () => {
            this.toggleIsLoading();
          },
        });
    } else if (this.isSearch) {
      const res = history.state['searchResult'];
      this._productService
        .getProductsByName(res, URLparams)
        .pipe(delay(2000))
        .subscribe({
          next: (data: any) => {
            this.products = [...this.products, ...data.entity];
          },
          error: (error) => {
            console.log(error.message);
          },
          complete: () => {
            this.toggleIsLoading();
          },
        });
    } else {
      this._productService
        .getProductsPagination(URLparams)
        .pipe(delay(2000))
        .subscribe({
          next: (data: any) => {
            this.products = [...this.products, ...data.entity];
          },
          error: (error) => {
            console.log(error.message);
          },
          complete: () => {
            this.toggleIsLoading();
          },
        });
    }
  }
  onScroll() {
    if (this.currentPage!=this.maxPageNumber) {
      this.currentPage++;
      this.appendData();
    }
  }
}

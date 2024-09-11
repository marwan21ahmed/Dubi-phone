import { Component, Input, OnInit } from '@angular/core';
import { CategoriesComponent } from '../shared/categories/categories.component';
import { BrandsComponent } from '../shared/brands/brands.component';
import { CardComponent } from '../shared/card/card.component';
import { ProductSectionComponent } from './product-section/product-section.component';
import { BrandService } from '../../Services/brandServices/brand.service';
import { CategoryService } from '../../Services/category.services/category.service';
import { ProductService } from '../../Services/productServices/product.service';
import { ICategory } from '../../Models/icategory';
import { IBrand } from '../../Models/ibrand';
import { IProduct } from '../../Models/product/iproduct';
import { LandingComponent } from "./landing/landing.component";
import { WhyUsComponent } from './why-us/why-us.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationService } from '../../Services/localiztionService/localization.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        CategoriesComponent,
        BrandsComponent,
        CardComponent,
        ProductSectionComponent,
        WhyUsComponent,
        LandingComponent,
        TranslateModule
    ]
})
export class HomeComponent {
  Categories: ICategory[] = [];
  Brands: IBrand[] = [];
  Products: IProduct[] = [];
  isArabic!: boolean ;

  constructor(
    private _brandService: BrandService,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private localizationService: LocalizationService
  ) {
  this.localizationService.IsArabic.subscribe(ar=>this.isArabic=ar);

  }
  ngOnInit() {

    this._productService.getProductsPagination({numOfProductPerPage:8,pageNumber:1}).subscribe({next:(prods:any)=>
      {
        this.Products=prods.entity;
      }

    })


      this._brandService.getBrands().subscribe({
        next: (brands) => {
          this.Brands = brands;
        },
      });


      this._categoryService.getAllBrands().subscribe({
        next: (categories) => {
          this.Categories = categories;
        },
      });

    }

  }




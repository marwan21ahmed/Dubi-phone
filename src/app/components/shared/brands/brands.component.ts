import { Component,Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IBrand } from '../../../Models/ibrand';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { LocalizationService } from '../../../Services/localiztionService/localization.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,RouterModule,CarouselModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  @Input() brands: IBrand[]=[] ;
  @Input() isSmall=false;
  @Input() showTitle=true;
  numOfBrands!: number;

  isArabic!: boolean;

  constructor(private localizationService: LocalizationService) {
    this.localizationService.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }
  ngOnInit(): void {
    if (this.isSmall)
      this.numOfBrands=8;
    else
      this.numOfBrands=5
  }
}

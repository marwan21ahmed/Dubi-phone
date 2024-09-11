import { Component, Input } from '@angular/core';

import { ICategory } from '../../../Models/icategory';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { LocalizationService } from '../../../Services/localiztionService/localization.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterModule, CarouselModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  @Input() Categories: ICategory[] = [];
  isArabic!: boolean;

  constructor(private localizationService: LocalizationService) {
    this.localizationService.IsArabic.subscribe((ar) => (this.isArabic = ar));
  }
}

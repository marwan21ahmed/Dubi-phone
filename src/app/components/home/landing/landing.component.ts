import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GalleriaModule } from 'primeng/galleria';
import { LocalizationService } from '../../../Services/localiztionService/localization.service';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [GalleriaModule,FormsModule,TranslateModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent{
  isArabic!: boolean ;
  constructor(
    private localizationService: LocalizationService ) {
      this.localizationService.IsArabic.subscribe(ar=>this.isArabic=ar);

  }
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
}

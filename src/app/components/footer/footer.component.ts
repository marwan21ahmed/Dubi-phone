import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationService } from '../../Services/localiztionService/localization.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isArabic!: boolean ;
  constructor(
    private localizationService: LocalizationService
  ) {
    this.localizationService.IsArabic.subscribe(ar=>this.isArabic=ar);
  }
  useLanguage(){
    this.localizationService.ChangeLanguage();
  }
}

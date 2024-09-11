import { AfterViewInit, Component, Input } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { IProduct } from '../../../Models/product/iproduct';
import { CarouselModule } from 'primeng/carousel';
import { LocalizationService } from '../../../Services/localiztionService/localization.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [ CardComponent,CarouselModule,TranslateModule],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent implements AfterViewInit {

responsiveOptions: any[] | undefined;
@Input() imagePath!:string;
@Input() title!:string;
@Input() products!:IProduct[];

isArabic!: boolean ;
constructor(private localizationService: LocalizationService) {
  this.localizationService.IsArabic.subscribe(ar=>this.isArabic=ar);
}
ngAfterViewInit(): void {

  this.responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];
}
}

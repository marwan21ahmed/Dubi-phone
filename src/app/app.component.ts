import {  Component, importProvidersFrom,  } from '@angular/core';
import { NavigationEnd, Route, Router, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';

import { TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',

    imports: [RouterOutlet, RouterModule, HeaderComponent,FooterComponent,TranslateModule]

})
export class AppComponent {
  title = 'DubaiPhoneClone';
  showHeader:boolean = true;
  constructor(private router:Router,private translate: TranslateService) {
    let lang=localStorage.getItem('language');
    translate.use(lang as string);
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.includes( '/checkout'))
          this.showHeader=false;
        else
        this.showHeader=true;
      }
    });
  }
}
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


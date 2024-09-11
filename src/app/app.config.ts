import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { customInterceptor } from './Services/custom.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([customInterceptor])),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'black' },
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage:localStorage.getItem('language') ?? 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};

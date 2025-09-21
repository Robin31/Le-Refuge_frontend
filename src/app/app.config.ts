import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { myPreset } from './lara.theme';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    MessageService,
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    providePrimeNG({
      theme: {
        preset: myPreset,
        options: {
          colorScheme: 'light',
        },
      },
    }),
  ],
};

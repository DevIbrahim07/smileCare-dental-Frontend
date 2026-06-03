// import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
// };
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular 21 — global browser error listeners (new in v21)
    provideBrowserGlobalErrorListeners(),

    // Zone.js change detection — coalescing for performance
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Router with smooth scroll + view transitions
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),

    // HttpClient — interceptors added in Phase 2 (JWT)
    provideHttpClient(
      withInterceptors([]), // auth interceptor added in Phase 2
    ),
  ],
};

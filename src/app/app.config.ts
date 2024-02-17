import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { VectorService } from '../vector/vector-service/vector-service.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)],
};

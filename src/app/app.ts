import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreloaderComponent } from './layout/preloader';
import { SiteHeaderComponent } from './layout/site-header';
import { SiteFooterComponent } from './layout/site-footer';
import { ScrollProgressComponent } from './layout/scroll-progress';
import { FloatingActionsComponent } from './layout/floating-actions';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PreloaderComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    ScrollProgressComponent,
    FloatingActionsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly ready = signal(false);
  readonly showPreloader = signal(true);

  private readonly document = inject(DOCUMENT);

  onPreloaderFinished(): void {
    this.ready.set(true);
    this.showPreloader.set(false);
    this.document.body.classList.add('is-ready');
  }
}

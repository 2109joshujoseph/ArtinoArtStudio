import {
  Component,
  DOCUMENT,
  PLATFORM_ID,
  afterNextRender,
  inject,
  output,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  template: `
    @if (visible()) {
      <div class="preloader" [class.is-leaving]="leaving()" role="status" aria-live="polite">
        <div class="preloader__noise" aria-hidden="true"></div>

        <div class="preloader__center">
          <svg class="preloader__mark" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="0.7" opacity=".25" />
            <path class="draw draw--ink" d="M27 72 50 25l23 47" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            <path class="draw draw--clay" d="M38.5 58h23" fill="none" stroke="var(--clay)" stroke-width="1.6" stroke-linecap="round" />
            <path class="draw draw--clay" d="M15 86c12-5 18 3 30-4 12-7 21 1 35-6" fill="none" stroke="var(--clay)" stroke-width="1.2" stroke-linecap="round" />
          </svg>

          <div class="preloader__wordmark">
            <span class="preloader__name">Artino</span>
            <span class="preloader__sub">Studio · Art Academy</span>
          </div>

          <p class="preloader__note">Preparing the studio</p>
        </div>

        <div class="preloader__bottom">
          <span class="preloader__count">{{ progress().toString().padStart(3, '0') }}</span>
          <span class="preloader__bar" aria-hidden="true"><span [style.transform]="'scaleX(' + progress() / 100 + ')'"></span></span>
          <span class="preloader__place">Fort Kochi · Kerala</span>
        </div>

        <span class="sr-only">Loading Artino Studio Art Academy</span>
      </div>
    }
  `,
  styleUrl: './preloader.scss',
})
export class PreloaderComponent {
  readonly finished = output<void>();
  readonly progress = signal(0);
  readonly visible = signal(true);
  readonly leaving = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        this.visible.set(false);
        this.finished.emit();
        return;
      }

      this.document.body.classList.add('is-locked');

      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const duration = reduced ? 120 : 1450;
      const start = performance.now();

      const tick = (now: number) => {
        const linear = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - linear, 3);
        this.progress.set(Math.round(eased * 100));

        if (linear < 1) {
          requestAnimationFrame(tick);
        } else {
          this.progress.set(100);
          this.finish();
        }
      };

      requestAnimationFrame(tick);
    });
  }

  private finish(): void {
    window.setTimeout(() => {
      this.leaving.set(true);
      this.document.body.classList.remove('is-locked');

      window.setTimeout(() => {
        this.visible.set(false);
        this.finished.emit();
      }, 520);
    }, 180);
  }
}

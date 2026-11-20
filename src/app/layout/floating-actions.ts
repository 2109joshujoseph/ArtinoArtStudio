import { Component, DOCUMENT, NgZone, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-floating-actions',
  standalone: true,
  templateUrl: './floating-actions.html',
  styleUrl: './floating-actions.scss',
})
export class FloatingActionsComponent {
  readonly visible = signal(false);
  readonly whatsappUrl =
    'https://wa.me/919847012345?text=Hello%20Artino%20Studio%2C%20I%27d%20like%20to%20know%20more%20about%20your%20programmes.';

  private readonly zone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.zone.runOutsideAngular(() => {
        const onScroll = () => {
          const next = window.scrollY > 640;
          if (next !== this.visible()) {
            this.zone.run(() => this.visible.set(next));
          }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      });
    });
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

    const target = this.document.querySelector<HTMLElement>('.site-header a, .skip-link');
    target?.focus({ preventScroll: true });
  }
}

import { Component, DOCUMENT, NgZone, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  template: `
    <div class="scroll-progress" aria-hidden="true">
      <span [style.transform]="'scaleX(' + progress() + ')'"></span>
    </div>
  `,
  styleUrl: './scroll-progress.scss',
})
export class ScrollProgressComponent {
  readonly progress = signal(0);

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.zone.runOutsideAngular(() => {
        let frame = 0;

        const update = () => {
          frame = 0;
          const doc = this.document.documentElement;
          const max = doc.scrollHeight - window.innerHeight;
          const value = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
          this.zone.run(() => this.progress.set(value));
        };

        const onScroll = () => {
          if (!frame) {
            frame = window.requestAnimationFrame(update);
          }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
      });
    });
  }
}

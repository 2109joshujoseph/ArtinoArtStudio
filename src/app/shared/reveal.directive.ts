import {
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type RevealVariant = 'up' | 'left' | 'right' | 'zoom' | 'fade';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  /** Accepts a bare `appReveal` attribute (empty string) as well as an explicit variant. */
  readonly appReveal = input('up', {
    transform: (value: string): RevealVariant => {
      const variant = (value || 'up').trim() as RevealVariant;
      return ['up', 'left', 'right', 'zoom', 'fade'].includes(variant) ? variant : 'up';
    },
  });
  readonly revealDelay = input<number>(0);

  constructor() {
    const host = this.element.nativeElement;
    host.classList.add('reveal');
    host.dataset['reveal'] = this.appReveal();

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      host.style.setProperty('--reveal-delay', `${this.revealDelay()}ms`);

      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion || typeof IntersectionObserver === 'undefined') {
        host.classList.add('is-visible');
        return;
      }

      this.zone.runOutsideAngular(() => {
        this.observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                host.classList.add('is-visible');
                this.observer?.unobserve(host);
              }
            }
          },
          { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
        );
        this.observer.observe(host);
      });
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

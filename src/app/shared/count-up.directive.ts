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

@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private frame?: number;

  readonly value = input.required<number>({ alias: 'appCountUp' });
  readonly suffix = input<string>('');
  readonly duration = input<number>(1700);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const host = this.element.nativeElement;
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion || typeof IntersectionObserver === 'undefined') {
        host.textContent = this.formatted(this.value());
        return;
      }

      this.zone.runOutsideAngular(() => {
        this.observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              this.start();
              this.observer?.disconnect();
            }
          },
          { threshold: 0.4 },
        );
        this.observer.observe(host);
      });
    });
  }

  private start(): void {
    const host = this.element.nativeElement;
    const target = this.value();
    const start = performance.now();
    const duration = this.duration();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      host.textContent = this.formatted(Math.round(target * eased));

      if (progress < 1) {
        this.frame = requestAnimationFrame(tick);
      } else {
        host.textContent = this.formatted(target);
      }
    };

    host.textContent = this.formatted(0);
    this.frame = requestAnimationFrame(tick);
  }

  private formatted(value: number): string {
    return `${value.toLocaleString('en-IN')}${this.suffix()}`;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }
}

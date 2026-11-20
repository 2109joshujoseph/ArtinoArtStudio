import { Component, OnDestroy, PLATFORM_ID, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TESTIMONIALS, Testimonial } from '../core/site-data';

@Component({
  selector: 'app-testimonial-slider',
  standalone: true,
  template: `
    <div
      class="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Student and parent testimonials"
      (mouseenter)="paused.set(true)"
      (mouseleave)="paused.set(false)"
      (focusin)="paused.set(true)"
      (focusout)="paused.set(false)"
    >
      <span class="slider__mark" aria-hidden="true">“</span>

      <div class="slider__viewport">
        <div class="slider__track" [style.transform]="'translate3d(-' + index() * 100 + '%, 0, 0)'">
          @for (item of items(); track item.name; let i = $index) {
            <figure class="slide" [attr.aria-hidden]="i !== index()" [attr.aria-label]="i + 1 + ' of ' + items().length">
              <div class="stars" aria-label="Five out of five">
                <span aria-hidden="true">★★★★★</span>
              </div>
              <blockquote class="slide__quote">{{ item.quote }}</blockquote>
              <figcaption class="slide__meta">
                <span class="slide__avatar" aria-hidden="true">{{ initials(item.name) }}</span>
                <span class="slide__person">
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.context }}</span>
                </span>
                <span class="slide__program">{{ item.program }}</span>
              </figcaption>
            </figure>
          }
        </div>
      </div>

      <div class="slider__controls">
        <div class="slider__arrows">
          <button type="button" class="slider__button" aria-label="Previous testimonial" (click)="previous()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M19 12H5m6-6-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button type="button" class="slider__button" aria-label="Next testimonial" (click)="next()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <span class="slider__counter" aria-hidden="true">
          <span>{{ (index() + 1).toString().padStart(2, '0') }}</span>
          <span class="slider__counter-line"></span>
          <span>{{ items().length.toString().padStart(2, '0') }}</span>
        </span>

        <div class="slider__dots" role="tablist" aria-label="Choose testimonial">
          @for (item of items(); track item.name; let i = $index) {
            <button
              type="button"
              class="slider__dot"
              [class.is-active]="index() === i"
              [attr.aria-label]="'Go to testimonial ' + (i + 1)"
              [attr.aria-selected]="index() === i"
              role="tab"
              (click)="goTo(i)"
            ></button>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './testimonial-slider.scss',
})
export class TestimonialSliderComponent implements OnDestroy {
  readonly items = input<Testimonial[]>(TESTIMONIALS);
  readonly index = signal(0);
  readonly paused = signal(false);
  readonly current = computed(() => this.items()[this.index()]);

  private readonly platformId = inject(PLATFORM_ID);
  private timer?: number;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      this.timer = window.setInterval(() => {
        if (!this.paused()) {
          this.next();
        }
      }, 7000);
    });
  }

  next(): void {
    this.index.update((value) => (value + 1) % this.items().length);
  }

  previous(): void {
    this.index.update((value) => (value - 1 + this.items().length) % this.items().length);
  }

  goTo(index: number): void {
    this.index.set(index);
  }

  initials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('');
  }

  ngOnDestroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
  }
}

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  template: `
    <div class="marquee" [class.marquee--dark]="theme() === 'dark'" aria-hidden="true">
      <div class="marquee__track">
        <div class="marquee__group">
          @for (item of items(); track item) {
            <span class="marquee__item">{{ item }}</span>
          }
        </div>
        <div class="marquee__group">
          @for (item of items(); track item) {
            <span class="marquee__item">{{ item }}</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .marquee {
        padding-block: 1.1rem;
      }

      .marquee__track {
        display: flex;
        width: max-content;
        gap: 0;
        padding: 0;
        animation: marquee 36s linear infinite;
      }

      .marquee__group {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        gap: 2rem;
        padding-right: 2rem;
      }

      .marquee__item {
        display: inline-flex;
        align-items: center;
        gap: 2rem;
      }

      .marquee--dark {
        background: var(--ink);
        border-color: var(--line-light);
      }

      .marquee--dark .marquee__item {
        color: var(--cream);
      }

      .marquee:hover .marquee__track {
        animation-play-state: paused;
      }
    `,
  ],
})
export class MarqueeComponent {
  readonly items = input<string[]>([]);
  readonly theme = input<'light' | 'dark'>('light');
}

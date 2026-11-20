import {
  Component,
  DOCUMENT,
  HostListener,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GalleryItem } from '../core/site-data';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  template: `
    @if (current(); as item) {
      <div
        class="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Artwork viewer"
        (click)="onBackdrop($event)"
      >
        <div class="lightbox__bar">
          <span class="lightbox__count">{{ (index() ?? 0) + 1 }} / {{ items().length }}</span>
          <button type="button" class="lightbox__close" aria-label="Close artwork viewer" (click)="close()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Previous artwork" (click)="previous()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
            <path d="M19 12H5m6-6-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <figure class="lightbox__figure" (click)="$event.stopPropagation()">
          <img [src]="item.image" [alt]="item.alt" decoding="async" />
          <figcaption class="lightbox__caption">
            <div>
              <h3 class="h4">{{ item.title }}</h3>
              <p>{{ item.artist }} · {{ item.medium }} · {{ item.year }}</p>
            </div>
            <span class="tag">{{ item.category }}</span>
          </figcaption>
        </figure>

        <button type="button" class="lightbox__nav lightbox__nav--next" aria-label="Next artwork" (click)="next()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    }
  `,
  styleUrl: './lightbox.scss',
})
export class LightboxComponent {
  readonly items = input<GalleryItem[]>([]);
  readonly index = model<number | null>(null);

  readonly current = computed(() => {
    const i = this.index();
    return i === null ? null : (this.items()[i] ?? null);
  });

  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private lastFocused: HTMLElement | null = null;

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const open = this.index() !== null;

      if (open) {
        if (!this.lastFocused) {
          this.lastFocused = this.document.activeElement as HTMLElement | null;
        }
        this.document.body.classList.add('is-locked');
        window.setTimeout(() => {
          this.document.querySelector<HTMLButtonElement>('.lightbox__close')?.focus();
        }, 60);
      } else {
        this.document.body.classList.remove('is-locked');
        this.lastFocused?.focus?.();
        this.lastFocused = null;
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.index() === null) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
    }
  }

  close(): void {
    this.index.set(null);
  }

  next(): void {
    const total = this.items().length;
    if (!total) {
      return;
    }
    this.index.update((i) => ((i ?? 0) + 1) % total);
  }

  previous(): void {
    const total = this.items().length;
    if (!total) {
      return;
    }
    this.index.update((i) => ((i ?? 0) - 1 + total) % total);
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}

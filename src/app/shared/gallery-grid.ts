import { Component, computed, input, signal } from '@angular/core';
import { GALLERY, GalleryCategory, GalleryItem } from '../core/site-data';
import { LightboxComponent } from './lightbox';
import { RevealDirective } from './reveal.directive';

@Component({
  selector: 'app-gallery-grid',
  standalone: true,
  imports: [LightboxComponent, RevealDirective],
  template: `
    @if (showFilters()) {
      <div class="filters" role="group" aria-label="Filter artwork by medium">
        @for (category of categories(); track category) {
          <button
            type="button"
            class="chip"
            [class.chip--active]="activeCategory() === category"
            [attr.aria-pressed]="activeCategory() === category"
            (click)="setCategory(category)"
          >
            {{ category }}
            <span class="filters__count">{{ countFor(category) }}</span>
          </button>
        }
      </div>
    }

    <div class="gallery" [class.gallery--masonry]="masonry()">
      @for (item of filtered(); track item.id; let i = $index) {
        <button
          type="button"
          class="gallery__item"
          [attr.data-ratio]="item.ratio"
          [attr.aria-label]="'View ' + item.title + ' by ' + item.artist"
          appReveal="zoom"
          [revealDelay]="(i % 3) * 80"
          (click)="open(i)"
        >
          <span class="gallery__media">
            <img [src]="item.image" [alt]="item.alt" loading="lazy" decoding="async" width="900" height="1200" />
          </span>
          <span class="gallery__overlay" aria-hidden="true">
            <span class="gallery__category">{{ item.category }}</span>
            <span class="gallery__title">{{ item.title }}</span>
            <span class="gallery__meta">{{ item.artist }} · {{ item.medium }}</span>
            <span class="gallery__plus">+</span>
          </span>
        </button>
      }
    </div>

    <app-lightbox [items]="filtered()" [(index)]="lightboxIndex" />
  `,
  styleUrl: './gallery-grid.scss',
})
export class GalleryGridComponent {
  readonly items = input<GalleryItem[]>(GALLERY);
  readonly showFilters = input(false);
  readonly masonry = input(true);

  readonly activeCategory = signal<GalleryCategory | 'All'>('All');
  readonly lightboxIndex = signal<number | null>(null);

  readonly categories = computed<(GalleryCategory | 'All')[]>(() => {
    const unique = Array.from(new Set(this.items().map((item) => item.category)));
    return ['All', ...unique];
  });

  readonly filtered = computed(() => {
    const category = this.activeCategory();
    return category === 'All' ? this.items() : this.items().filter((item) => item.category === category);
  });

  countFor(category: GalleryCategory | 'All'): number {
    return category === 'All' ? this.items().length : this.items().filter((item) => item.category === category).length;
  }

  setCategory(category: GalleryCategory | 'All'): void {
    this.activeCategory.set(category);
    this.lightboxIndex.set(null);
  }

  open(index: number): void {
    this.lightboxIndex.set(index);
  }
}

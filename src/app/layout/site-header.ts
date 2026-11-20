import {
  Component,
  DOCUMENT,
  HostListener,
  NgZone,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BrandLogoComponent } from '../shared/brand-logo';
import { NAV_LINKS, PROGRAMS, SITE } from '../core/site-data';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BrandLogoComponent],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeaderComponent {
  readonly site = SITE;
  readonly links = NAV_LINKS;
  readonly programmes = PROGRAMS.slice(0, 4);

  readonly stuck = signal(false);
  readonly menuOpen = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);
  private lastFocused: HTMLElement | null = null;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.zone.runOutsideAngular(() => {
        const onScroll = () => {
          const next = window.scrollY > 30;
          if (next !== this.stuck()) {
            this.zone.run(() => this.stuck.set(next));
          }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      });
    });
  }

  toggleMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu(): void {
    this.lastFocused = this.document.activeElement as HTMLElement | null;
    this.menuOpen.set(true);
    this.document.body.classList.add('is-locked');

    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(() => {
        const first = this.document.querySelector<HTMLElement>('#mobile-menu a, #mobile-menu button');
        first?.focus({ preventScroll: true });
      }, 60);
    }
  }

  closeMenu(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    this.document.body.classList.remove('is-locked');
    this.lastFocused?.focus({ preventScroll: true });
    this.lastFocused = null;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      routerLink="/"
      class="brand"
      [class.brand--light]="tone() === 'light'"
      [class.brand--compact]="compact()"
      aria-label="Artino Studio Art Academy — home"
    >
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="presentation" focusable="false">
          <circle cx="24" cy="24" r="23" fill="currentColor" />
          <path
            d="M15.4 33.4 24 13.4l8.6 20"
            fill="none"
            stroke="var(--mark-ink)"
            stroke-width="2.1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M19.1 27.2h9.8" stroke="var(--mark-accent)" stroke-width="2.1" stroke-linecap="round" />
          <path
            d="M8.6 39.2c5.4-2.7 8.2 1.2 13.2-1.6 3.8-2.1 6.2.3 9.4-1"
            fill="none"
            stroke="var(--mark-accent)"
            stroke-width="1.7"
            stroke-linecap="round"
            opacity=".85"
          />
        </svg>
      </span>
      <span class="brand__text">
        <span class="brand__name">Artino</span>
        <span class="brand__sub">Studio · Art Academy</span>
      </span>
    </a>
  `,
  styleUrl: './brand-logo.scss',
})
export class BrandLogoComponent {
  readonly tone = input<'dark' | 'light'>('dark');
  readonly compact = input(false);
}

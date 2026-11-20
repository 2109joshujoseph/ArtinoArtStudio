import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, STUDIO_IMAGES } from '../core/site-data';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="cta" aria-labelledby="cta-title">
      <div class="cta__media" aria-hidden="true">
        <img [src]="image()" alt="" loading="lazy" decoding="async" />
      </div>
      <div class="container cta__inner">
        <div class="cta__copy">
          <span class="eyebrow eyebrow--light">{{ eyebrow() }}</span>
          <h2 class="h2 cta__title" id="cta-title">
            {{ title() }}
            <em class="serif-italic">{{ accent() }}</em>
          </h2>
          <p class="cta__text">{{ description() }}</p>
          <div class="cta__actions">
            <a class="btn btn--paper" routerLink="/contact">
              {{ buttonLabel() }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
            <a class="btn btn--light" [href]="'tel:' + site.phoneHref">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path
                  d="M6.5 3.5h2l1.3 3.6-1.7 1.3a12 12 0 0 0 5.5 5.5l1.3-1.7 3.6 1.3v2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ site.phone }}
            </a>
          </div>
        </div>

        <div class="cta__aside">
          <p class="cta__label">The studio</p>
          <address>
            @for (line of site.addressLines; track line) {
              {{ line }}<br />
            }
            {{ site.locality }} {{ site.postalCode }}, {{ site.region }}
          </address>
          <p class="cta__aside-note">Visits by appointment · Tuesdays to Sundays</p>
          <span class="cta__seal" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="cta-circle" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
              </defs>
              <text>
                <textPath href="#cta-circle">ARTINO STUDIO · EST. 2014 · FORT KOCHI · </textPath>
              </text>
            </svg>
            <span class="cta__seal-star">✳</span>
          </span>
        </div>
      </div>
    </section>
  `,
  styleUrl: './cta-section.scss',
})
export class CtaSectionComponent {
  readonly eyebrow = input('Begin here');
  readonly title = input('Your first stroke');
  readonly accent = input('starts here.');
  readonly description = input(
    'Book a studio visit, meet a teacher, and see where your work could go. No portfolio required — just curiosity.',
  );
  readonly buttonLabel = input('Book a studio visit');
  readonly image = input(STUDIO_IMAGES.cta);

  readonly site = SITE;
}

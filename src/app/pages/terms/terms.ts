import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site-data';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terms.html',
  styleUrl: '../privacy/legal.scss',
})
export class TermsPage {
  readonly site = SITE;
  readonly updated = '1 November 2026';

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPage({
      title: 'Studio Terms & Conditions',
      description:
        'Enrolment, fees, attendance, cancellation, materials and studio conduct terms for Artino Studio Art Academy in Fort Kochi, Kochi.',
      path: '/terms',
      keywords: 'Artino Studio terms, art class enrolment policy, refund policy, studio conduct',
      crumbs: [
        { name: 'Home', path: '/' },
        { name: 'Terms', path: '/terms' },
      ],
      jsonLd: {
        '@type': 'WebPage',
        name: 'Studio Terms & Conditions — Artino Studio Art Academy',
        isPartOf: { '@id': `${SITE.url}/#website` },
      },
    });
  }
}

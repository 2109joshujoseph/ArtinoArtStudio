import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site-data';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy.html',
  styleUrl: './legal.scss',
})
export class PrivacyPage {
  readonly site = SITE;
  readonly updated = '1 November 2026';

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPage({
      title: 'Privacy Policy',
      description:
        'How Artino Studio Art Academy collects, uses and protects personal information shared through studio enquiries, admissions and the newsletter.',
      path: '/privacy',
      keywords: 'Artino Studio privacy policy, data protection, student information',
      crumbs: [
        { name: 'Home', path: '/' },
        { name: 'Privacy', path: '/privacy' },
      ],
      jsonLd: {
        '@type': 'WebPage',
        name: 'Privacy Policy — Artino Studio Art Academy',
        isPartOf: { '@id': `${SITE.url}/#website` },
      },
    });
  }
}

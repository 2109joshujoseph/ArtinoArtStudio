import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { APPROACH, FACULTY, SITE, STUDIO_IMAGES, TIMELINE, VALUES } from '../../core/site-data';
import { PageHeroComponent } from '../../shared/page-hero';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading';
import { CtaSectionComponent } from '../../shared/cta-section';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    PageHeroComponent,
    RevealDirective,
    SectionHeadingComponent,
    CtaSectionComponent,
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutPage {
  readonly site = SITE;
  readonly images = STUDIO_IMAGES;
  readonly values = VALUES;
  readonly timeline = TIMELINE;
  readonly approach = APPROACH;
  readonly faculty = FACULTY;

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPage({
      title: 'About the Studio — Our Story, Faculty & Method',
      description:
        'Meet Artino Studio Art Academy: a Fort Kochi art school founded in 2014, built on small cohorts, practising faculty and an end-of-term exhibition for every programme.',
      path: '/about',
      image: '/images/studio.jpg',
      keywords:
        'about Artino Studio, art academy Fort Kochi, art teachers Kochi, art school Kerala, small art classes',
      crumbs: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ],
      jsonLd: {
        '@type': 'AboutPage',
        name: 'About Artino Studio Art Academy',
        description:
          'The story, values, faculty and teaching method of Artino Studio Art Academy in Fort Kochi, Kerala.',
        mainEntity: { '@id': `${SITE.url}/#organization` },
      },
    });
  }
}

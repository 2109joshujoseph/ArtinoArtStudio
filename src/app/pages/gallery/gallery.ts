import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { GALLERY, SITE } from '../../core/site-data';
import { PageHeroComponent } from '../../shared/page-hero';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading';
import { GalleryGridComponent } from '../../shared/gallery-grid';
import { CtaSectionComponent } from '../../shared/cta-section';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    RouterLink,
    PageHeroComponent,
    RevealDirective,
    SectionHeadingComponent,
    GalleryGridComponent,
    CtaSectionComponent,
  ],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class GalleryPage {
  readonly items = GALLERY;
  readonly site = SITE;

  readonly notes = [
    { label: 'Exhibitions', value: 'Twice a year' },
    { label: 'Works in the archive', value: '120+' },
    { label: 'Disciplines', value: '5 mediums' },
    { label: 'Works for sale', value: 'On request' },
  ];

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPage({
      title: 'Gallery — Student & Faculty Work',
      description:
        'Browse paintings, drawings, ceramics, mixed media and murals made at Artino Studio Art Academy. An evolving archive from end-of-term exhibitions in Fort Kochi.',
      path: '/gallery',
      image: '/images/abstract-chromatic.jpg',
      keywords:
        'student art gallery Kochi, art exhibition Fort Kochi, painting portfolio, ceramics gallery Kerala',
      crumbs: [
        { name: 'Home', path: '/' },
        { name: 'Gallery', path: '/gallery' },
      ],
      jsonLd: [
        {
          '@type': 'CollectionPage',
          name: 'Artino Studio Gallery',
          description: 'An archive of student and faculty artwork made at Artino Studio Art Academy.',
          isPartOf: { '@id': `${SITE.url}/#website` },
          about: { '@id': `${SITE.url}/#organization` },
        },
        {
          '@type': 'ItemList',
          name: 'Selected works from the Artino Studio archive',
          itemListElement: GALLERY.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'VisualArtwork',
              name: item.title,
              creator: { '@type': 'Person', name: item.artist },
              artMedium: item.medium,
              dateCreated: item.year,
              image: `${SITE.url}/${item.image}`,
              description: item.alt,
            },
          })),
        },
      ],
    });
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import {
  APPROACH,
  FACULTY,
  FAQS,
  GALLERY,
  PROGRAMS,
  SITE,
  STUDIO_IMAGES,
  VALUES,
} from '../../core/site-data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading';
import { MarqueeComponent } from '../../shared/marquee';
import { CourseCardComponent } from '../../shared/course-card';
import { StatBandComponent } from '../../shared/stat-band';
import { GalleryGridComponent } from '../../shared/gallery-grid';
import { TestimonialSliderComponent } from '../../shared/testimonial-slider';
import { FaqAccordionComponent } from '../../shared/faq-accordion';
import { CtaSectionComponent } from '../../shared/cta-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RevealDirective,
    SectionHeadingComponent,
    MarqueeComponent,
    CourseCardComponent,
    StatBandComponent,
    GalleryGridComponent,
    TestimonialSliderComponent,
    FaqAccordionComponent,
    CtaSectionComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  readonly site = SITE;
  readonly images = STUDIO_IMAGES;
  readonly featured = PROGRAMS.filter((programme) => programme.featured);
  readonly galleryPreview = GALLERY.slice(0, 6);
  readonly faqs = FAQS.slice(0, 4);
  readonly values = VALUES.slice(0, 3);
  readonly approach = APPROACH;
  readonly faculty = FACULTY;

  readonly marqueeItems = [
    'Drawing',
    'Painting',
    'Ceramics',
    'Printmaking',
    'Digital art',
    'Portfolio atelier',
    'Fort Kochi',
  ];

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPage({
      title: 'Art Classes in Fort Kochi — Drawing, Painting & Ceramics',
      description:
        'Join a studio-first art academy in Fort Kochi, Kochi. Small-batch drawing, painting, ceramics, printmaking, digital art and portfolio preparation for children, teens and adults.',
      path: '/',
      image: '/images/hero-main.jpg',
      keywords:
        'art classes Kochi, art academy Fort Kochi, drawing classes Kerala, painting classes Kochi, ceramics classes, art portfolio preparation India',
      jsonLd: {
        '@type': 'FAQPage',
        mainEntity: this.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    });
  }
}

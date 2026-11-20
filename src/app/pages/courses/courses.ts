import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import {
  ADMISSION_STEPS,
  FAQS,
  PROGRAMS,
  PROGRAM_CATEGORIES,
  ProgramCategory,
  SITE,
} from '../../core/site-data';
import { PageHeroComponent } from '../../shared/page-hero';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadingComponent } from '../../shared/section-heading';
import { CourseCardComponent } from '../../shared/course-card';
import { FaqAccordionComponent } from '../../shared/faq-accordion';
import { CtaSectionComponent } from '../../shared/cta-section';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    RouterLink,
    PageHeroComponent,
    RevealDirective,
    SectionHeadingComponent,
    CourseCardComponent,
    FaqAccordionComponent,
    CtaSectionComponent,
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class CoursesPage {
  readonly categories = PROGRAM_CATEGORIES;
  readonly programs = PROGRAMS;
  readonly steps = ADMISSION_STEPS;
  readonly faqs = FAQS;
  readonly activeCategory = signal<ProgramCategory | 'All'>('All');

  readonly filtered = computed(() => {
    const category = this.activeCategory();
    return category === 'All' ? this.programs : this.programs.filter((item) => item.category === category);
  });

  readonly included = [
    {
      title: 'Studio time',
      text: 'Regular weekly sessions in a working studio, with north light, good tables and room to leave work out.',
    },
    {
      title: 'Faculty guidance',
      text: 'One teacher to eight students, weekly critique, and the kind of attention that changes how you work.',
    },
    {
      title: 'Materials & firing',
      text: 'Shared inks, charcoal, paper and glazes. Ceramics firing included. Personal surfaces are listed in the welcome note.',
    },
    {
      title: 'A wall to answer to',
      text: 'Every term closes with an exhibition. Family, friends and the neighbourhood are invited.',
    },
  ];

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPage({
      title: 'Art Classes & Programmes in Kochi',
      description:
        'Explore six term-long programmes at Artino Studio: foundation drawing, painting and colour, digital illustration, ceramics, printmaking and portfolio preparation in Fort Kochi.',
      path: '/courses',
      image: '/images/abstract-impasto.jpg',
      keywords:
        'art classes Kochi, drawing course Kerala, painting classes Fort Kochi, ceramics classes, printmaking course, art portfolio preparation',
      crumbs: [
        { name: 'Home', path: '/' },
        { name: 'Programmes', path: '/courses' },
      ],
      jsonLd: [
        {
          '@type': 'ItemList',
          name: 'Art programmes at Artino Studio Art Academy',
          itemListElement: PROGRAMS.map((programme, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Course',
              name: programme.title,
              description: programme.description,
              url: `${SITE.url}/courses#${programme.slug}`,
              provider: { '@id': `${SITE.url}/#organization` },
              offers: {
                '@type': 'Offer',
                price: programme.fee.replace(/[^\d]/g, ''),
                priceCurrency: 'INR',
                category: 'Term fee',
              },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'Onsite',
                courseWorkload: programme.duration,
                location: { '@id': `${SITE.url}/#organization` },
              },
            },
          })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ],
    });
  }

  setCategory(category: ProgramCategory | 'All'): void {
    this.activeCategory.set(category);
  }
}

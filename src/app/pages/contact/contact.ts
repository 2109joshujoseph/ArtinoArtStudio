import { Component, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeoService } from '../../core/seo.service';
import { FAQS, PROGRAMS, SITE } from '../../core/site-data';
import { PageHeroComponent } from '../../shared/page-hero';
import { RevealDirective } from '../../shared/reveal.directive';
import { FaqAccordionComponent } from '../../shared/faq-accordion';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, PageHeroComponent, RevealDirective, FaqAccordionComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactPage {
  readonly site = SITE;
  readonly faqs = FAQS;
  readonly submitted = signal(false);

  readonly interestOptions = [
    'General enquiry',
    'Studio visit',
    ...PROGRAMS.map((programme) => programme.title),
    'Fees and dates',
    'Exhibition invitation',
  ];

  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern(/^[+\d][\d\s-]{6,}$/)],
    }),
    interest: new FormControl('General enquiry', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(1200)],
    }),
    consent: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  constructor() {
    this.seo.setPage({
      title: 'Contact & Studio Visits',
      description:
        'Book a studio visit at Artino Studio Art Academy in Fort Kochi, Kochi. Ask about programmes, fees, term dates, exhibitions or portfolio preparation.',
      path: '/contact',
      image: '/images/palette.jpg',
      keywords:
        'contact Artino Studio, art classes enquiry Kochi, studio visit Fort Kochi, art admission Kerala',
      crumbs: [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ],
      jsonLd: {
        '@type': 'ContactPage',
        name: 'Contact Artino Studio Art Academy',
        description: 'Enquiries, studio visits and admissions for Artino Studio Art Academy, Fort Kochi.',
        mainEntity: {
          '@type': 'Organization',
          '@id': `${SITE.url}/#organization`,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'admissions',
            telephone: SITE.phoneHref,
            email: SITE.email,
            areaServed: 'IN',
            availableLanguage: ['English', 'Malayalam'],
          },
        },
      },
    });

    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const course = params.get('course');
      const subject = params.get('subject');

      if (course) {
        const interest = this.interestOptions.includes(course) ? course : 'General enquiry';
        this.form.patchValue({
          interest,
          message: `I would like to know more about the ${course} programme — dates, fees and the right batch.`,
        });
        return;
      }

      if (subject) {
        const interest = this.interestOptions.includes(subject) ? subject : 'General enquiry';
        this.form.patchValue({
          interest,
          message: `I am writing about: ${subject.toLowerCase()}.`,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      window.setTimeout(() => {
        const firstInvalid = document.querySelector<HTMLElement>('.contact__form .is-invalid');
        firstInvalid?.focus({ preventScroll: false });
      }, 30);
      return;
    }

    this.submitted.set(true);
    window.setTimeout(() => {
      document.querySelector<HTMLElement>('.contact__success')?.scrollIntoView({
        behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'center',
      });
    }, 40);
  }

  sendAnother(): void {
    this.form.reset({
      name: '',
      email: '',
      phone: '',
      interest: 'General enquiry',
      message: '',
      consent: false,
    });
    this.submitted.set(false);
  }
}

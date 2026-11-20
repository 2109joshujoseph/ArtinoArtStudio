import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { GALLERY } from '../../core/site-data';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFoundPage {
  readonly works = GALLERY.slice(0, 3);

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPage({
      title: 'Page Not Found',
      description:
        'The page you were looking for is not hanging here. Return to Artino Studio Art Academy or explore the programmes and gallery.',
      path: '/404',
      noindex: true,
    });
  }
}

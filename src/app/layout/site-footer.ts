import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandLogoComponent } from '../shared/brand-logo';
import { NewsletterComponent } from '../shared/newsletter';
import { RevealDirective } from '../shared/reveal.directive';
import { NAV_LINKS, PROGRAMS, SITE } from '../core/site-data';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink, BrandLogoComponent, NewsletterComponent, RevealDirective],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooterComponent {
  readonly site = SITE;
  readonly links = NAV_LINKS;
  readonly programmes = PROGRAMS;
  readonly year = new Date().getFullYear();
}

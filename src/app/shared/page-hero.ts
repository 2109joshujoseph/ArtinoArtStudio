import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from './reveal.directive';
import { Crumb } from '../core/seo.service';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="page-hero">
      <div class="container page-hero__inner">
        <div class="page-hero__copy">
          @if (crumbs().length) {
            <nav class="crumbs" aria-label="Breadcrumb">
              <ol>
                @for (crumb of crumbs(); track crumb.path; let last = $last) {
                  <li>
                    @if (!last) {
                      <a [routerLink]="crumb.path">{{ crumb.name }}</a>
                      <span aria-hidden="true">/</span>
                    } @else {
                      <span aria-current="page">{{ crumb.name }}</span>
                    }
                  </li>
                }
              </ol>
            </nav>
          }

          <span class="eyebrow page-hero__eyebrow">{{ eyebrow() }}</span>
          <h1 class="h1 page-hero__title">
            {{ title() }}
            @if (accent()) {
              <em class="serif-italic clay">{{ accent() }}</em>
            }
          </h1>
          <p class="lead page-hero__lead">{{ description() }}</p>
          <div class="page-hero__actions">
            <ng-content />
          </div>
        </div>

        <div class="page-hero__media" appReveal="right">
          <figure class="page-hero__frame">
            <img [src]="image()" [alt]="alt()" loading="eager" decoding="async" />
          </figure>
          <span class="page-hero__stamp">
            <span>Since 2014</span>
            <span class="dot" aria-hidden="true"></span>
            <span>Fort Kochi</span>
          </span>
          <span class="page-hero__blob" aria-hidden="true"></span>
        </div>
      </div>
    </section>
  `,
  styleUrl: './page-hero.scss',
})
export class PageHeroComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly accent = input<string>('');
  readonly description = input.required<string>();
  readonly image = input.required<string>();
  readonly alt = input<string>('');
  readonly crumbs = input<Crumb[]>([]);
}

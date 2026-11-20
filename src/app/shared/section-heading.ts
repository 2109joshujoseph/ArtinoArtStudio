import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header
      class="section-head"
      [class.section-head--center]="align() === 'center'"
      [class.section-head--light]="theme() === 'light'"
    >
      <div class="section-head__main">
        <span class="eyebrow" [class.eyebrow--light]="theme() === 'light'">{{ eyebrow() }}</span>
        <h2 class="h2 section-head__title">
          {{ title() }}
          @if (accent()) {
            <em class="serif-italic clay section-head__accent">{{ accent() }}</em>
          }
        </h2>
      </div>

      @if (description() || linkLabel()) {
        <div class="section-head__aside-wrap">
          @if (description()) {
            <p class="section-head__aside">{{ description() }}</p>
          }
          @if (linkLabel() && linkPath()) {
            <a class="link-arrow" [routerLink]="linkPath()">{{ linkLabel() }}</a>
          }
        </div>
      }
    </header>
  `,
  styles: [
    `
      .section-head__main {
        min-width: 0;
      }

      .section-head__accent {
        margin-left: 0.16em;
      }

      .section-head__aside-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.1rem;
        max-width: 36ch;
      }

      .section-head--center .section-head__aside-wrap {
        align-items: center;
        margin-inline: auto;
      }

      @media (max-width: 860px) {
        .section-head__aside-wrap {
          max-width: 52ch;
        }
      }
    `,
  ],
})
export class SectionHeadingComponent {
  readonly eyebrow = input<string>('The studio');
  readonly title = input.required<string>();
  readonly accent = input<string>('');
  readonly description = input<string>('');
  readonly linkLabel = input<string>('');
  readonly linkPath = input<string>('');
  readonly align = input<'left' | 'center'>('left');
  readonly theme = input<'light' | 'dark'>('dark');
}

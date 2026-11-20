import { Component, input } from '@angular/core';
import { STATS, Stat } from '../core/site-data';
import { CountUpDirective } from './count-up.directive';
import { RevealDirective } from './reveal.directive';

@Component({
  selector: 'app-stat-band',
  standalone: true,
  imports: [CountUpDirective, RevealDirective],
  template: `
    <section class="stat-band" aria-labelledby="stat-band-title">
      <div class="container">
        <div class="stat-band__head">
          <div>
            <span class="eyebrow eyebrow--light">In numbers</span>
            <h2 class="h2 stat-band__title" id="stat-band-title">
              A small studio with a <em class="serif-italic">long reach.</em>
            </h2>
          </div>
          <p class="stat-band__intro">
            No auditoriums, no autopilot. Just years of looking closely at work, and the people who make it.
          </p>
        </div>

        <div class="stat-band__grid">
          @for (stat of stats(); track stat.label; let i = $index) {
            <article class="stat" appReveal [revealDelay]="i * 90">
              <span class="stat__value">
                <span [appCountUp]="stat.value" [suffix]="stat.suffix">{{ stat.value }}{{ stat.suffix }}</span>
              </span>
              <h3 class="stat__label">{{ stat.label }}</h3>
              <p class="stat__note">{{ stat.note }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './stat-band.scss',
})
export class StatBandComponent {
  readonly stats = input<Stat[]>(STATS);
}

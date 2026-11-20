import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Program } from '../core/site-data';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="course">
      <a class="course__media" [routerLink]="'/contact'" [queryParams]="{ course: program().title }" [attr.aria-label]="'Enquire about ' + program().title">
        <img
          [src]="program().image"
          [alt]="program().alt"
          loading="lazy"
          decoding="async"
          width="900"
          height="675"
        />
        <span class="tag course__tag">{{ program().category }}</span>
        <span class="course__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M7 17 17 7M8 7h9v9" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </a>

      <div class="course__body">
        <div class="course__topline">
          <span>{{ program().duration }}</span>
          <span class="dot" aria-hidden="true"></span>
          <span>{{ program().ageGroup }}</span>
          <span class="dot" aria-hidden="true"></span>
          <span>{{ program().level }}</span>
        </div>

        <h3 class="h3 course__title">
          <a [routerLink]="'/contact'" [queryParams]="{ course: program().title }">{{ program().title }}</a>
        </h3>
        <p class="course__copy">{{ program().description }}</p>

        <div class="course__footer">
          <span class="course__fee">
            <span class="course__fee-label">Term fee</span>
            {{ program().fee }}
          </span>
          <a class="link-arrow" [routerLink]="'/contact'" [queryParams]="{ course: program().title }">Enquire</a>
        </div>
      </div>
    </article>
  `,
  styleUrl: './course-card.scss',
})
export class CourseCardComponent {
  readonly program = input.required<Program>();
}

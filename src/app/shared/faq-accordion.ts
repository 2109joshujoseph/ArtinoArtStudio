import { Component, input, signal } from '@angular/core';
import { Faq } from '../core/site-data';

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  template: `
    <div class="faq">
      @for (faq of items(); track faq.question; let i = $index) {
        <div class="faq__item" [class.is-open]="openIndex() === i">
          <h3 class="faq__heading">
            <button
              type="button"
              class="faq__trigger"
              [id]="'faq-trigger-' + i"
              [attr.aria-expanded]="openIndex() === i"
              [attr.aria-controls]="'faq-panel-' + i"
              (click)="toggle(i)"
            >
              <span class="faq__number">{{ (i + 1).toString().padStart(2, '0') }}</span>
              <span class="faq__question">{{ faq.question }}</span>
              <span class="faq__icon" aria-hidden="true">
                <span></span>
                <span></span>
              </span>
            </button>
          </h3>
          <div
            class="faq__answer"
            [id]="'faq-panel-' + i"
            role="region"
            [attr.aria-labelledby]="'faq-trigger-' + i"
            [attr.aria-hidden]="openIndex() !== i"
          >
            <div class="faq__answer-inner">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './faq-accordion.scss',
})
export class FaqAccordionComponent {
  readonly items = input<Faq[]>([]);
  readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}

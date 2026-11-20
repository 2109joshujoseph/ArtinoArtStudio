import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  template: `
    <div class="newsletter">
      <p class="newsletter__label">The studio letter</p>
      <h3 class="newsletter__title">A quiet note, once a month.</h3>
      <p class="newsletter__copy">New programmes, studio notes and exhibitions. No noise, no daily emails.</p>

      <form class="newsletter__form" (submit)="onSubmit($event)" novalidate>
        <label class="sr-only" for="newsletter-email">Email address</label>
        <div class="newsletter__field">
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="you@example.com"
            [value]="email()"
            [class.is-invalid]="state() === 'error'"
            [attr.aria-invalid]="state() === 'error'"
            [attr.aria-describedby]="state() === 'error' ? 'newsletter-error' : null"
            (input)="onInput($event)"
          />
          <button type="submit" class="newsletter__button" aria-label="Subscribe to the studio letter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        @if (state() === 'error') {
          <p class="newsletter__message newsletter__message--error" id="newsletter-error" role="alert">
            Please enter a valid email address.
          </p>
        } @else if (state() === 'success') {
          <p class="newsletter__message newsletter__message--success" role="status">
            Thank you — you are on the list. The next letter arrives with the new term.
          </p>
        }
      </form>
    </div>
  `,
  styleUrl: './newsletter.scss',
})
export class NewsletterComponent {
  readonly email = signal('');
  readonly state = signal<'idle' | 'error' | 'success'>('idle');

  onInput(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
    if (this.state() === 'error') {
      this.state.set('idle');
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const value = this.email().trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

    if (!valid) {
      this.state.set('error');
      return;
    }

    this.state.set('success');
    this.email.set('');
  }
}

// import { AfterViewInit, Component, OnDestroy } from '@angular/core';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// interface ContactCard {
//   title: string;
//   value: string;
//   helper: string;
//   icon: string;
// }

// @Component({
//   selector: 'app-contact-component',
//   imports: [],
//   templateUrl: './contact-component.html',
//   styleUrl: './contact-component.scss',
// })
// export class ContactComponent {
//   readonly contactCards: ContactCard[] = [
//     {
//       title: 'Call Us',
//       value: '+92 300 1234567',
//       helper: 'Speak with our clinic team during working hours.',
//       icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.45-1.28a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z',
//     },
//     {
//       title: 'Email Us',
//       value: 'info@smilecare.com',
//       helper: 'Send us your question and we will get back to you.',
//       icon: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 0 8 7 8-7',
//     },
//     {
//       title: 'Visit Us',
//       value: 'Main Boulevard, Gulberg, Lahore',
//       helper: 'Easy-to-reach clinic location in the heart of the city.',
//       icon: 'M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1 1 18 0zm-9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
//     },
//     {
//       title: 'Working Hours',
//       value: 'Mon - Sat, 9:00 AM - 7:00 PM',
//       helper: 'Appointments and support are available throughout the week.',
//       icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
//     },
//   ];

//   ngAfterViewInit(): void {
//     this.animateHero();
//     this.animateContactCards();
//     this.animateMainSection();
//     this.animateLocationSection();
//   }

//   ngOnDestroy(): void {
//     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//   }

//   private animateHero(): void {
//     const hero = document.querySelector<HTMLElement>('.contact-hero');
//     if (!hero) return;

//     const heroInner = hero.querySelector<HTMLElement>('.contact-hero__inner');
//     if (heroInner) {
//       gsap.set(heroInner, {
//         transformPerspective: 1450,
//         transformStyle: 'preserve-3d',
//       });
//     }

//     gsap
//       .timeline()
//       .fromTo(
//         '.contact-hero__label',
//         { opacity: 0, y: 18, rotateX: -22, z: -60, transformPerspective: 1200 },
//         { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.5, ease: 'power2.out' },
//       )
//       .fromTo(
//         '.contact-hero__heading',
//         { opacity: 0, y: 28, rotateX: -16, z: -120, transformPerspective: 1400 },
//         { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.74, ease: 'power3.out' },
//         '-=0.18',
//       )
//       .fromTo(
//         '.contact-hero__text',
//         { opacity: 0, y: 20, rotateX: -10, z: -45, transformPerspective: 1200 },
//         { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.56, ease: 'power2.out' },
//         '-=0.22',
//       );

//     gsap.fromTo(
//       '.contact-hero__glow',
//       { opacity: 0, scale: 0.92, x: 36, y: -18 },
//       {
//         opacity: 1,
//         scale: 1,
//         x: 0,
//         y: 0,
//         duration: 1,
//         ease: 'power3.out',
//       },
//     );

//     gsap.to('.contact-hero__glow', {
//       x: -14,
//       y: 10,
//       duration: 5.2,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut',
//     });
//   }

//   private animateContactCards(): void {
//     const grid = document.querySelector<HTMLElement>('.contact-cards__grid');
//     if (!grid) return;

//     const cards = gsap.utils.toArray<HTMLElement>('.contact-card');

//     gsap.set(cards, {
//       transformPerspective: 1450,
//       transformStyle: 'preserve-3d',
//     });

//     gsap.fromTo(
//       cards,
//       { opacity: 0, y: 34, rotateX: -16, rotateY: -8, z: -90, scale: 0.97 },
//       {
//         opacity: 1,
//         y: 0,
//         rotateX: 0,
//         rotateY: 0,
//         z: 0,
//         scale: 1,
//         duration: 0.74,
//         ease: 'power3.out',
//         stagger: 0.1,
//         scrollTrigger: {
//           trigger: grid,
//           start: 'top 84%',
//           once: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       '.contact-card__icon',
//       { opacity: 0, y: 14, scale: 0.88, z: 28, transformPerspective: 1200 },
//       {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         z: 0,
//         duration: 0.46,
//         ease: 'power2.out',
//         stagger: 0.08,
//         delay: 0.16,
//         scrollTrigger: {
//           trigger: grid,
//           start: 'top 84%',
//           once: true,
//         },
//       },
//     );

//     cards.forEach((card, index) => {
//       const distance = index % 2 === 0 ? -10 : -14;
//       gsap.to(card, {
//         y: distance,
//         duration: 2.8 + index * 0.18,
//         repeat: -1,
//         yoyo: true,
//         ease: 'sine.inOut',
//         delay: 0.28 + index * 0.08,
//         scrollTrigger: {
//           trigger: grid,
//           start: 'top 84%',
//         },
//       });
//     });
//   }

//   private animateMainSection(): void {
//     const section = document.querySelector<HTMLElement>('.contact-main');
//     const layout = section?.querySelector<HTMLElement>('.contact-main__layout');
//     const form = section?.querySelector<HTMLElement>('.contact-form');
//     const support = section?.querySelector<HTMLElement>('.contact-support__panel');
//     if (!section || !layout || !form || !support) return;

//     gsap.set(form, {
//       transformPerspective: 1450,
//       transformStyle: 'preserve-3d',
//     });

//     gsap.set(support, {
//       transformPerspective: 1450,
//       transformStyle: 'preserve-3d',
//     });

//     gsap.fromTo(
//       form,
//       { opacity: 0, x: -28, rotateY: 12, rotateX: 6, z: -100, scale: 0.98 },
//       {
//         opacity: 1,
//         x: 0,
//         rotateY: 0,
//         rotateX: 0,
//         z: 0,
//         scale: 1,
//         duration: 0.82,
//         ease: 'power3.out',
//         scrollTrigger: {
//           trigger: layout,
//           start: 'top 84%',
//           once: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       support,
//       { opacity: 0, x: 28, rotateY: -12, rotateX: 6, z: -100, scale: 0.98 },
//       {
//         opacity: 1,
//         x: 0,
//         rotateY: 0,
//         rotateX: 0,
//         z: 0,
//         scale: 1,
//         duration: 0.82,
//         ease: 'power3.out',
//         delay: 0.08,
//         scrollTrigger: {
//           trigger: layout,
//           start: 'top 84%',
//           once: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       '.contact-form__intro .section-label, .contact-form__intro h2, .contact-form__intro p, .contact-form .form-group, .contact-form__actions',
//       { opacity: 0, y: 18, rotateX: -10, z: -30, transformPerspective: 1200 },
//       {
//         opacity: 1,
//         y: 0,
//         rotateX: 0,
//         z: 0,
//         duration: 0.48,
//         ease: 'power2.out',
//         stagger: 0.05,
//         delay: 0.14,
//         scrollTrigger: {
//           trigger: layout,
//           start: 'top 84%',
//           once: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       '.contact-support .section-label, .contact-support__title, .contact-support__text, .contact-support__item',
//       { opacity: 0, y: 18, rotateX: -10, z: -30, transformPerspective: 1200 },
//       {
//         opacity: 1,
//         y: 0,
//         rotateX: 0,
//         z: 0,
//         duration: 0.48,
//         ease: 'power2.out',
//         stagger: 0.06,
//         delay: 0.18,
//         scrollTrigger: {
//           trigger: layout,
//           start: 'top 84%',
//           once: true,
//         },
//       },
//     );
//   }

//   private animateLocationSection(): void {
//     const section = document.querySelector<HTMLElement>('.contact-location');
//     const layout = section?.querySelector<HTMLElement>('.contact-location__layout');
//     const copy = section?.querySelector<HTMLElement>('.contact-location__copy');
//     const mapSurface = section?.querySelector<HTMLElement>('.contact-map__surface');
//     if (!section || !layout || !copy || !mapSurface) return;

//     gsap.set(copy, {
//       transformPerspective: 1450,
//       transformStyle: 'preserve-3d',
//     });

//     gsap.set(mapSurface, {
//       transformPerspective: 1500,
//       transformStyle: 'preserve-3d',
//     });

//     gsap.fromTo(
//       copy,
//       { opacity: 0, x: -28, rotateY: 12, rotateX: 6, z: -100, scale: 0.98 },
//       {
//         opacity: 1,
//         x: 0,
//         rotateY: 0,
//         rotateX: 0,
//         z: 0,
//         scale: 1,
//         duration: 0.82,
//         ease: 'power3.out',
//         scrollTrigger: {
//           trigger: layout,
//           start: 'top 84%',
//           once: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       mapSurface,
//       { opacity: 0, x: 28, rotateY: -12, rotateX: 6, z: -100, scale: 0.98 },
//       {
//         opacity: 1,
//         x: 0,
//         rotateY: 0,
//         rotateX: 0,
//         z: 0,
//         scale: 1,
//         duration: 0.82,
//         ease: 'power3.out',
//         delay: 0.08,
//         scrollTrigger: {
//           trigger: layout,
//           start: 'top 84%',
//           once: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       '.contact-location__copy .section-label, .contact-location__copy h2, .contact-location__copy > p, .contact-location__details > div',
//       { opacity: 0, y: 18, rotateX: -10, z: -30, transformPerspective: 1200 },
//       {
//         opacity: 1,
//         y: 0,
//         rotateX: 0,
//         z: 0,
//         duration: 0.48,
//         ease: 'power2.out',
//         stagger: 0.06,
//         delay: 0.14,
//         scrollTrigger: {
//           trigger: layout,
//           start: 'top 84%',
//           once: true,
//         },
//       },
//     );

//     gsap.fromTo(
//       '.contact-map__frame',
//       { opacity: 0, y: 18, rotateX: -10, z: -30, transformPerspective: 1200 },
//       {
//         opacity: 1,
//         y: 0,
//         rotateX: 0,
//         z: 0,
//         duration: 0.48,
//         ease: 'power2.out',
//         stagger: 0.08,
//         delay: 0.18,
//         scrollTrigger: {
//           trigger: layout,
//           start: 'top 84%',
//           once: true,
//         },
//       },
//     );
//   }
// }

import { Component, AfterViewInit, OnDestroy, signal, inject } from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format-pipe';
import { TimeFormatPipe } from '../../shared/pipes/time-format-pipe';

gsap.registerPlugin(ScrollTrigger);

type SubmitState = 'idle' | 'loading' | 'success' | 'error';
interface ContactCard {
  title: string;
  value: string;
  helper: string;
  icon: string;
}

@Component({
  selector: 'app-contact-component',
  imports: [CommonModule, ReactiveFormsModule, TimeFormatPipe, PhoneFormatPipe],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.scss',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  readonly clinicDays = 'Mon - Sat';
  readonly clinicOpenTime = '09:00';
  readonly clinicCloseTime = '19:00';

  // ── Signals ───────────────────────────────────────────────────────────────
  submitState = signal<SubmitState>('idle');

  // ── Reactive Form ─────────────────────────────────────────────────────────
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.pattern(/^(\+92|0)[0-9]{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  // ── Contact cards data ────────────────────────────────────────────────────
  readonly contactCards: ContactCard[] = [
    {
      title: 'Call Us',
      value: '+92 300 1234567',
      helper: 'Speak with our clinic team during working hours.',
      icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.45-1.28a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z',
    },
    {
      title: 'Email Us',
      value: 'info@smilecare.com',
      helper: 'Send us your question and we will get back to you.',
      icon: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 0 8 7 8-7',
    },
    {
      title: 'Visit Us',
      value: 'Main Boulevard, Gulberg, Lahore',
      helper: 'Easy-to-reach clinic location in the heart of the city.',
      icon: 'M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1 1 18 0zm-9 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    },
    {
      title: 'Working Hours',
      value: '',
      helper: 'Appointments and support available throughout the week.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    },
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────
  // Quick field access in template
  field(name: string): AbstractControl {
    return this.contactForm.get(name)!;
  }

  // Show error only when field is dirty or touched
  showError(name: string): boolean {
    const ctrl = this.field(name);
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  // Get specific error message per field
  getError(name: string): string {
    const ctrl = this.field(name);
    if (!ctrl.errors) return '';
    if (ctrl.errors['required']) return 'This field is required.';
    if (ctrl.errors['email']) return 'Please enter a valid email address.';
    if (ctrl.errors['minlength']) {
      const min = ctrl.errors['minlength'].requiredLength;
      return `Minimum ${min} characters required.`;
    }
    if (ctrl.errors['pattern']) return 'Enter a valid Pakistani number (e.g. 03001234567).';
    return 'Invalid value.';
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  onSubmit(): void {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) return;

    this.submitState.set('loading');

    // Simulate API — replace with HttpClient POST in Phase 2
    setTimeout(() => {
      this.submitState.set('success');
      this.contactForm.reset();
    }, 1500);
  }

  resetForm(): void {
    this.submitState.set('idle');
    this.contactForm.reset();
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngAfterViewInit(): void {
    this.animateHero();
    this.animateContactCards();
    this.animateMainSection();
    this.animateLocationSection();
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  // ── GSAP (your existing animations — untouched) ───────────────────────────
  private animateHero(): void {
    const hero = document.querySelector<HTMLElement>('.contact-hero');
    if (!hero) return;
    const heroInner = hero.querySelector<HTMLElement>('.contact-hero__inner');
    if (heroInner)
      gsap.set(heroInner, { transformPerspective: 1450, transformStyle: 'preserve-3d' });

    gsap
      .timeline()
      .fromTo(
        '.contact-hero__label',
        { opacity: 0, y: 18, rotateX: -22, z: -60, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.5, ease: 'power2.out' },
      )
      .fromTo(
        '.contact-hero__heading',
        { opacity: 0, y: 28, rotateX: -16, z: -120, transformPerspective: 1400 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.74, ease: 'power3.out' },
        '-=0.18',
      )
      .fromTo(
        '.contact-hero__text',
        { opacity: 0, y: 20, rotateX: -10, z: -45, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.56, ease: 'power2.out' },
        '-=0.22',
      );

    gsap.fromTo(
      '.contact-hero__glow',
      { opacity: 0, scale: 0.92, x: 36, y: -18 },
      { opacity: 1, scale: 1, x: 0, y: 0, duration: 1, ease: 'power3.out' },
    );
    gsap.to('.contact-hero__glow', {
      x: -14,
      y: 10,
      duration: 5.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  private animateContactCards(): void {
    const grid = document.querySelector<HTMLElement>('.contact-cards__grid');
    if (!grid) return;
    const cards = gsap.utils.toArray<HTMLElement>('.contact-card');
    gsap.set(cards, { transformPerspective: 1450, transformStyle: 'preserve-3d' });
    gsap.fromTo(
      cards,
      { opacity: 0, y: 34, rotateX: -16, rotateY: -8, z: -90, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.74,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: grid, start: 'top 84%', once: true },
      },
    );
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: i % 2 === 0 ? -10 : -14,
        duration: 2.8 + i * 0.18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.28 + i * 0.08,
        scrollTrigger: { trigger: grid, start: 'top 84%' },
      });
    });
  }

  private animateMainSection(): void {
    const layout = document.querySelector<HTMLElement>('.contact-main__layout');
    const form = document.querySelector<HTMLElement>('.contact-form');
    const support = document.querySelector<HTMLElement>('.contact-support__panel');
    if (!layout || !form || !support) return;
    gsap.set([form, support], { transformPerspective: 1450, transformStyle: 'preserve-3d' });
    gsap.fromTo(
      form,
      { opacity: 0, x: -28, rotateY: 12, rotateX: 6, z: -100, scale: 0.98 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        rotateX: 0,
        z: 0,
        scale: 1,
        duration: 0.82,
        ease: 'power3.out',
        scrollTrigger: { trigger: layout, start: 'top 84%', once: true },
      },
    );
    gsap.fromTo(
      support,
      { opacity: 0, x: 28, rotateY: -12, rotateX: 6, z: -100, scale: 0.98 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        rotateX: 0,
        z: 0,
        scale: 1,
        duration: 0.82,
        ease: 'power3.out',
        delay: 0.08,
        scrollTrigger: { trigger: layout, start: 'top 84%', once: true },
      },
    );
  }

  private animateLocationSection(): void {
    const layout = document.querySelector<HTMLElement>('.contact-location__layout');
    const copy = document.querySelector<HTMLElement>('.contact-location__copy');
    const mapSurface = document.querySelector<HTMLElement>('.contact-map__surface');
    if (!layout || !copy || !mapSurface) return;
    gsap.set([copy, mapSurface], { transformPerspective: 1450, transformStyle: 'preserve-3d' });
    gsap.fromTo(
      copy,
      { opacity: 0, x: -28, rotateY: 12, rotateX: 6, z: -100, scale: 0.98 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        rotateX: 0,
        z: 0,
        scale: 1,
        duration: 0.82,
        ease: 'power3.out',
        scrollTrigger: { trigger: layout, start: 'top 84%', once: true },
      },
    );
    gsap.fromTo(
      mapSurface,
      { opacity: 0, x: 28, rotateY: -12, rotateX: 6, z: -100, scale: 0.98 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        rotateX: 0,
        z: 0,
        scale: 1,
        duration: 0.82,
        ease: 'power3.out',
        delay: 0.08,
        scrollTrigger: { trigger: layout, start: 'top 84%', once: true },
      },
    );
  }
}

import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  title: string;
  desc: string;
  highlight: string;
  icon: string;
}

interface TrustPoint {
  title: string;
  desc: string;
}

interface ProcessStep {
  number: string;
  title: string;
  desc: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-services-component',
  imports: [RouterLink],
  templateUrl: './services-component.html',
  styleUrl: './services-component.scss',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  readonly serviceCards: ServiceCard[] = [
    {
      title: 'Teeth Cleaning',
      desc: 'Professional cleaning that removes plaque buildup and keeps your smile fresh and healthy.',
      highlight: 'Gentle prevention-focused care',
      icon: 'M12 3c4.418 0 8 3.582 8 8 0 5.523-4.477 10-10 10S0 16.523 0 11c0-4.418 3.582-8 8-8h4z',
    },
    {
      title: 'Teeth Whitening',
      desc: 'Brighten stained or dull teeth with safe whitening plans tailored to your smile goals.',
      highlight: 'Visible cosmetic improvement',
      icon: 'M12 2l1.8 3.9 4.2.6-3 2.9.7 4.1L12 11.8 8.3 13.5l.7-4.1-3-2.9 4.2-.6L12 2z',
    },
    {
      title: 'Root Canal Treatment',
      desc: 'Relieve pain and save damaged teeth with precise modern endodontic treatment.',
      highlight: 'Tooth-saving restorative care',
      icon: 'M12 2a7 7 0 017 7c0 5.2-4.3 8.4-6 10.5-.4.5-.6 1.2-.7 1.9H11.7c-.1-.7-.3-1.4-.7-1.9C9.3 17.4 5 14.2 5 9a7 7 0 017-7z',
    },
    {
      title: 'Dental Implants',
      desc: 'Restore missing teeth with long-lasting implant solutions designed for comfort and function.',
      highlight: 'Strong, natural-feeling replacement',
      icon: 'M12 2c2.8 0 5 2.2 5 5 0 1.7-.9 3.3-2.2 4.2V15a2.8 2.8 0 11-5.6 0v-3.8A5 5 0 017 7c0-2.8 2.2-5 5-5z',
    },
    {
      title: 'Orthodontics',
      desc: 'Straighten alignment issues and improve bite balance with clear, guided orthodontic care.',
      highlight: 'Smile alignment and bite correction',
      icon: 'M3 8h18M5 12h14M7 16h10',
    },
    {
      title: 'Cosmetic Dentistry',
      desc: 'Refine shape, symmetry, and overall smile aesthetics with personalized cosmetic plans.',
      highlight: 'Confidence-focused smile design',
      icon: 'M4 13c2.5-4.5 13.5-4.5 16 0-2.5 4.5-13.5 4.5-16 0z',
    },
    {
      title: 'Pediatric Dentistry',
      desc: 'Friendly dental care for children in a calm setting that helps build lifelong healthy habits.',
      highlight: 'Child-friendly, reassuring visits',
      icon: 'M12 5a3 3 0 110 6 3 3 0 010-6zm-6 13a6 6 0 1112 0H6z',
    },
    {
      title: 'Emergency Dental Care',
      desc: 'Fast evaluation and urgent treatment for pain, swelling, trauma, and unexpected dental issues.',
      highlight: 'Prompt attention when it matters',
      icon: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z',
    },
  ];

  readonly trustPoints: TrustPoint[] = [
    {
      title: 'Experienced clinicians',
      desc: 'Our team combines specialist knowledge with practical experience across everyday and advanced cases.',
    },
    {
      title: 'Modern treatment environment',
      desc: 'We use updated tools and a clean clinical workflow to improve precision, comfort, and confidence.',
    },
    {
      title: 'Clear communication',
      desc: 'You will understand your options, expected outcomes, and next steps before treatment begins.',
    },
    {
      title: 'Patient comfort matters',
      desc: 'We design visits to feel calmer, gentler, and easier to navigate for both adults and children.',
    },
  ];

  readonly processSteps: ProcessStep[] = [
    {
      number: '01',
      title: 'Consultation',
      desc: 'We begin by understanding your concern, symptoms, goals, and treatment history.',
    },
    {
      number: '02',
      title: 'Assessment',
      desc: 'Our team examines your teeth, gums, and bite to identify the right treatment path.',
    },
    {
      number: '03',
      title: 'Treatment Plan',
      desc: 'You receive a clear explanation of the recommended treatment, timeline, and care priorities.',
    },
    {
      number: '04',
      title: 'Procedure',
      desc: 'Treatment is performed with a comfort-first approach and careful attention to detail.',
    },
    {
      number: '05',
      title: 'Aftercare',
      desc: 'We guide you through recovery, maintenance, and follow-up so results remain stable.',
    },
  ];

  readonly faqs: FaqItem[] = [
    {
      question: 'Will my treatment hurt?',
      answer: 'We plan treatment with comfort in mind and explain what to expect before we begin, so you feel informed and supported throughout the visit.',
    },
    {
      question: 'How do I know which service I need?',
      answer: 'You do not need to self-diagnose. A consultation lets our team assess the issue and recommend the most suitable treatment.',
    },
    {
      question: 'Do all treatments require multiple visits?',
      answer: 'Not always. Some services are completed in one visit, while others may need a phased plan depending on complexity and healing.',
    },
    {
      question: 'Can I book a consultation first?',
      answer: 'Yes. We encourage consultation-led care so you can understand your options before making treatment decisions.',
    },
  ];

  ngAfterViewInit(): void {
    this.animateHero();
    this.animateOverview();
    this.animateTrustSection();
    this.animateProcessSection();
    this.animateConsultationNote();
    this.animateFaqSection();
    this.animateCtaSection();
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  private animateHero(): void {
    const hero = document.querySelector<HTMLElement>('.services-hero');
    if (!hero) return;

    const heroInner = hero.querySelector<HTMLElement>('.services-hero__inner');
    if (heroInner) {
      gsap.set(heroInner, {
        transformPerspective: 1500,
        transformStyle: 'preserve-3d',
      });
    }

    gsap
      .timeline()
      .fromTo(
        '.services-hero__label',
        { opacity: 0, y: 18, rotateX: -20, z: -60, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.5, ease: 'power2.out' },
      )
      .fromTo(
        '.services-hero__heading',
        { opacity: 0, y: 28, rotateX: -16, z: -120, transformPerspective: 1400 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.72, ease: 'power3.out' },
        '-=0.16',
      )
      .fromTo(
        '.services-hero__text',
        { opacity: 0, y: 20, rotateX: -10, z: -45, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.56, ease: 'power2.out' },
        '-=0.24',
      )
      .fromTo(
        '.services-hero__actions .btn',
        { opacity: 0, y: 18, rotateX: -10, z: -30, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.48, ease: 'power2.out', stagger: 0.1 },
        '-=0.18',
      )
      .fromTo(
        '.services-hero__card',
        { opacity: 0, x: 34, rotateY: -14, rotateX: 8, z: -110, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          rotateX: 0,
          z: 0,
          scale: 1,
          duration: 0.82,
          ease: 'power3.out',
        },
        '-=0.42',
      );

    gsap.fromTo(
      '.services-hero__glow',
      { opacity: 0, scale: 0.92, x: 36, y: -20 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      },
    );

    gsap.to('.services-hero__glow', {
      x: -14,
      y: 10,
      duration: 5.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  private animateOverview(): void {
    const overview = document.querySelector<HTMLElement>('.services-overview');
    const grid = overview?.querySelector<HTMLElement>('.services-grid');
    const header = overview?.querySelector<HTMLElement>('.section-header');
    if (!overview || !grid || !header) return;

    const cards = gsap.utils.toArray<HTMLElement>('.service-card');

    gsap.set(header, {
      transformPerspective: 1300,
      transformStyle: 'preserve-3d',
    });

    gsap.set(cards, {
      transformPerspective: 1400,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      [header.querySelector('.section-label'), header.querySelector('h2'), header.querySelector('p')],
      { opacity: 0, y: 24, rotateX: -14, z: -70 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.62,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: overview,
          start: 'top 82%',
          once: true,
        },
      },
    );

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
        scrollTrigger: {
          trigger: grid,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.service-card__icon',
      { opacity: 0, y: 14, scale: 0.88, z: 26, transformPerspective: 1200 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        z: 0,
        duration: 0.46,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.16,
        scrollTrigger: {
          trigger: grid,
          start: 'top 84%',
          once: true,
        },
      },
    );
  }

  private animateTrustSection(): void {
    const section = document.querySelector<HTMLElement>('.services-trust');
    const intro = section?.querySelector<HTMLElement>('.trust-layout__intro');
    const grid = section?.querySelector<HTMLElement>('.trust-grid');
    if (!section || !intro || !grid) return;

    const cards = gsap.utils.toArray<HTMLElement>('.trust-card');

    gsap.set(intro, {
      transformPerspective: 1300,
      transformStyle: 'preserve-3d',
    });

    gsap.set(cards, {
      transformPerspective: 1500,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      [intro.querySelector('.section-label'), intro.querySelector('h2'), intro.querySelector('p')],
      { opacity: 0, y: 26, rotateX: -14, z: -70 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.64,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 38, rotateX: -16, rotateY: -10, z: -110, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.76,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: grid,
          start: 'top 84%',
          once: true,
        },
      },
    );

    cards.forEach((card, index) => {
      const distance = index % 2 === 0 ? -10 : -14;
      gsap.to(card, {
        y: distance,
        duration: 2.8 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.3 + index * 0.08,
        scrollTrigger: {
          trigger: grid,
          start: 'top 84%',
        },
      });
    });
  }

  private animateProcessSection(): void {
    const section = document.querySelector<HTMLElement>('.process');
    const header = section?.querySelector<HTMLElement>('.section-header');
    const grid = section?.querySelector<HTMLElement>('.process-grid');
    if (!section || !header || !grid) return;

    const cards = gsap.utils.toArray<HTMLElement>('.process-card');

    gsap.set(header, {
      transformPerspective: 1300,
      transformStyle: 'preserve-3d',
    });

    gsap.set(cards, {
      transformPerspective: 1450,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      [header.querySelector('.section-label'), header.querySelector('h2'), header.querySelector('p')],
      { opacity: 0, y: 24, rotateX: -14, z: -70 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.62,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 36, rotateX: -16, rotateY: -8, z: -100, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.process-card__number',
      { opacity: 0, y: 14, scale: 0.88, z: 24, transformPerspective: 1200 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        z: 0,
        duration: 0.44,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.16,
        scrollTrigger: {
          trigger: grid,
          start: 'top 84%',
          once: true,
        },
      },
    );
  }

  private animateConsultationNote(): void {
    const section = document.querySelector<HTMLElement>('.consultation-note');
    const box = section?.querySelector<HTMLElement>('.consultation-note__box');
    if (!section || !box) return;

    const textGroup = box.querySelector<HTMLElement>('div');
    const action = box.querySelector<HTMLElement>('.btn');
    if (!textGroup || !action) return;

    gsap.set(box, {
      transformPerspective: 1500,
      transformStyle: 'preserve-3d',
    });

    gsap.set(textGroup, {
      transformPerspective: 1300,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      box,
      { opacity: 0, y: 34, rotateX: -12, z: -90, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        scale: 1,
        duration: 0.82,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      [textGroup.querySelector('.section-label'), textGroup.querySelector('h2'), textGroup.querySelector('p')],
      { opacity: 0, y: 22, rotateX: -12, z: -60 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.58,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      action,
      { opacity: 0, x: 20, rotateY: -10, z: -30, scale: 0.94 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.54,
        ease: 'power2.out',
        delay: 0.26,
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      },
    );
  }

  private animateFaqSection(): void {
    const section = document.querySelector<HTMLElement>('.services-faq');
    const header = section?.querySelector<HTMLElement>('.section-header');
    const grid = section?.querySelector<HTMLElement>('.faq-grid');
    if (!section || !header || !grid) return;

    const cards = gsap.utils.toArray<HTMLElement>('.faq-card');

    gsap.set(header, {
      transformPerspective: 1300,
      transformStyle: 'preserve-3d',
    });

    gsap.set(cards, {
      transformPerspective: 1450,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      [header.querySelector('.section-label'), header.querySelector('h2'), header.querySelector('p')],
      { opacity: 0, y: 24, rotateX: -14, z: -70 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.62,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 34, rotateX: -16, rotateY: -8, z: -100, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.faq-card__question',
      { opacity: 0, y: 14, scale: 0.9, z: 24, transformPerspective: 1200 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        z: 0,
        duration: 0.46,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.16,
        scrollTrigger: {
          trigger: grid,
          start: 'top 84%',
          once: true,
        },
      },
    );
  }

  private animateCtaSection(): void {
    const section = document.querySelector<HTMLElement>('.services-cta');
    const panel = section?.querySelector<HTMLElement>('.services-cta__panel');
    if (!section || !panel) return;

    gsap.set(panel, {
      transformPerspective: 1500,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      panel,
      { opacity: 0, y: 34, rotateX: -12, z: -90, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        scale: 1,
        duration: 0.84,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      [
        panel.querySelector('.services-cta__eyebrow'),
        panel.querySelector('.services-cta__title'),
        panel.querySelector('.services-cta__text'),
      ],
      { opacity: 0, y: 22, rotateX: -12, z: -60 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.58,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.services-cta__actions .btn',
      { opacity: 0, y: 18, rotateX: -10, z: -28, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.24,
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      },
    );
  }
}

import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

interface Value {
  icon: string;
  title: string;
  desc: string;
}
@Component({
  selector: 'app-about-component',
  imports: [],
  templateUrl: './about-component.html',
  styleUrl: './about-component.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  readonly values: Value[] = [
    {
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      title: 'Patient-First Care',
      desc: 'Every decision we make starts with one question — what is best for our patient? Your comfort and health always come first.',
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Clinical Excellence',
      desc: 'Our doctors continuously update their skills with the latest techniques and technologies in modern dentistry.',
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Welcoming Environment',
      desc: 'We have designed our clinic to feel calm and welcoming — because we know visiting a dentist can feel stressful.',
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Respect for Your Time',
      desc: 'We run on schedule. Online booking, minimal wait times, and clear communication — we value your time as much as our own.',
    },
  ];

  readonly clinicImages = [
    {
      src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80',
      alt: 'SmileCare reception area',
    },
    {
      src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80',
      alt: 'Modern dental treatment room',
    },
    {
      src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80',
      alt: 'SmileCare waiting lounge',
    },
  ];

  ngAfterViewInit(): void {
    this.animateHero();
    this.animateStorySection();
    this.animateMissionVision();
    this.animateValues();
    this.animateGalleryHeader();
    this.animateGallery();
    this.animateSections();
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  private animateHero(): void {
    const hero = document.querySelector<HTMLElement>('.page-hero');
    if (!hero) return;

    const heroInner = hero.querySelector<HTMLElement>('.page-hero__inner');
    if (heroInner) {
      gsap.set(heroInner, { transformPerspective: 1400, transformStyle: 'preserve-3d' });
    }

    gsap
      .timeline()
      .fromTo(
        '.page-hero__label',
        { opacity: 0, y: 20, rotateX: -24, z: -60, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.55, ease: 'power2.out' },
      )
      .fromTo(
        '.page-hero__heading',
        { opacity: 0, y: 28, rotateX: -18, z: -120, transformPerspective: 1400 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.72, ease: 'power3.out' },
        '-=0.2',
      )
      .fromTo(
        '.page-hero__sub',
        { opacity: 0, y: 20, rotateX: -12, z: -40, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.18',
      );

    gsap.fromTo(
      '.page-hero__bg',
      { opacity: 0, scale: 0.9, x: 50 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
      },
    );

    gsap.to('.page-hero__bg', {
      x: -16,
      y: 12,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  private animateStorySection(): void {
    const storySection = document.querySelector<HTMLElement>('.story__inner');
    if (!storySection) return;

    gsap.set('.story__image', { transformPerspective: 1500, transformStyle: 'preserve-3d' });
    gsap.set('.story__copy', { transformPerspective: 1300, transformStyle: 'preserve-3d' });

    gsap.fromTo(
      '.story__image',
      { opacity: 0, x: -42, rotateY: 14, rotateX: 8, z: -120, scale: 0.96 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        rotateX: 0,
        z: 0,
        scale: 1,
        duration: 0.88,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storySection,
          start: 'top 82%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.story__copy > *',
      { opacity: 0, y: 28, rotateX: -12, z: -70, transformPerspective: 1200 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.62,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: storySection,
          start: 'top 82%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.story__since',
      { opacity: 0, y: 16, scale: 0.92, rotateY: -10, z: 80, transformPerspective: 1200 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        z: 0,
        duration: 0.62,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: storySection,
          start: 'top 82%',
          once: true,
        },
      },
    );

    gsap.to('.story__since', {
      y: -10,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: storySection,
        start: 'top 82%',
      },
    });
  }

  private animateMissionVision(): void {
    const grid = document.querySelector<HTMLElement>('.mv__grid');
    if (!grid) return;

    const cards = gsap.utils.toArray<HTMLElement>('.mv-card');

    gsap.set(cards, {
      transformPerspective: 1400,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      cards,
      { opacity: 0, y: 42, rotateX: -18, rotateY: -8, z: -120, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: grid,
          start: 'top 82%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.mv-card__icon',
      { opacity: 0, y: 16, scale: 0.9, z: 30, transformPerspective: 1200 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        z: 0,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.18,
        scrollTrigger: {
          trigger: grid,
          start: 'top 82%',
          once: true,
        },
      },
    );
  }

  private animateValues(): void {
    const valuesGrid = document.querySelector<HTMLElement>('.values__grid');
    if (!valuesGrid) return;

    const valueCards = gsap.utils.toArray<HTMLElement>('.value-card');

    gsap.set(valueCards, {
      transformPerspective: 1300,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      valueCards,
      { opacity: 0, y: 34, rotateX: -16, rotateY: -8, z: -90, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: valuesGrid,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.value-card__icon',
      { opacity: 0, y: 14, scale: 0.88, z: 28, transformPerspective: 1200 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        z: 0,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.18,
        scrollTrigger: {
          trigger: valuesGrid,
          start: 'top 84%',
          once: true,
        },
      },
    );
  }

  private animateGallery(): void {
    const galleryGrid = document.querySelector<HTMLElement>('.gallery__grid');
    if (!galleryGrid) return;

    const galleryItems = gsap.utils.toArray<HTMLElement>('.gallery__item');

    gsap.set(galleryItems, {
      transformPerspective: 1500,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      galleryItems,
      { opacity: 0, y: 38, rotateX: -15, rotateY: 10, z: -120, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.78,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: galleryGrid,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.gallery__img',
      { scale: 1.08, filter: 'brightness(0.88)', z: 30, transformPerspective: 1200 },
      {
        scale: 1,
        filter: 'brightness(1)',
        z: 0,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: galleryGrid,
          start: 'top 84%',
          once: true,
        },
      },
    );
  }

  private animateGalleryHeader(): void {
    const galleryGrid = document.querySelector<HTMLElement>('.gallery__grid');
    const header = galleryGrid?.closest('section')?.querySelector<HTMLElement>('.section-header');
    if (!galleryGrid || !header) return;

    gsap.set(header, { transformPerspective: 1300, transformStyle: 'preserve-3d' });

    gsap.fromTo(
      [header.querySelector('.section-label'), header.querySelector('h2'), header.querySelector('p')],
      { opacity: 0, y: 24, rotateX: -14, z: -60 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: galleryGrid,
          start: 'top 88%',
          once: true,
        },
      },
    );
  }

  private animateSections(): void {
    // Fade up individual elements
    gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((el) => {
      if (
        el.closest('.story__inner') ||
        el.closest('.mv__grid') ||
        el.closest('.values__grid') ||
        el.closest('.gallery__grid') ||
        el.closest('.gallery')
      ) {
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        },
      );
    });

    // Stagger children
    gsap.utils.toArray<HTMLElement>('[data-stagger-parent]').forEach((parent) => {
      if (
        parent.classList.contains('mv__grid') ||
        parent.classList.contains('values__grid') ||
        parent.classList.contains('gallery__grid')
      ) {
        return;
      }

      gsap.fromTo(
        parent.querySelectorAll('[data-stagger-child]'),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: parent, start: 'top 82%', once: true },
        },
      );
    });
  }
}

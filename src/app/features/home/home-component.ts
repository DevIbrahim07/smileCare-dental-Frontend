import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  signal,
  computed,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
interface Stat {
  value: string;
  label: string;
  suffix: string;
}
interface Service {
  icon: string;
  title: string;
  description: string;
  color: string;
}
interface Doctor {
  id: string;
  name: string;
  speciality: string;
  experience: string;
  photo: string;
}
interface Testimonial {
  name: string;
  review: string;
  rating: number;
  role: string;
  avatar: string;
}
interface WhyFeature {
  icon: string;
  title: string;
  desc: string;
}
@Component({
  selector: 'app-home-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') private heroRef!: ElementRef<HTMLElement>;
  private heroCardCleanup?: () => void;
  private interactiveCleanups: Array<() => void> = [];
  // ── Signals ───────────────────────────────────────────────────────────────
  activeTestimonial = signal<number>(0);
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  // ── Data ──────────────────────────────────────────────────────────────────
  readonly stats: Stat[] = [
    { value: '12', suffix: '+', label: 'Years Experience' },
    { value: '8500', suffix: '+', label: 'Happy Patients' },
    { value: '15', suffix: '', label: 'Expert Doctors' },
    { value: '98', suffix: '%', label: 'Satisfaction Rate' },
  ];
  readonly services: Service[] = [
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'General Dentistry',
      description:
        'Comprehensive check-ups, cleanings, and preventive care to keep your smile healthy.',
      color: 'service-card--blue',
    },
    {
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      title: 'Teeth Whitening',
      description: 'Professional whitening treatments for a brighter, more confident smile.',
      color: 'service-card--yellow',
    },
    {
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      title: 'Orthodontics',
      description: 'Braces and clear aligners to straighten teeth and correct bite issues.',
      color: 'service-card--pink',
    },
    {
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      title: 'Dental Implants',
      description: 'Permanent tooth replacement solutions that look and feel completely natural.',
      color: 'service-card--teal',
    },
    {
      icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
      title: 'Root Canal',
      description: 'Pain-free root canal therapy to save damaged teeth with modern techniques.',
      color: 'service-card--purple',
    },
    {
      icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Cosmetic Dentistry',
      description: 'Veneers, bonding, and smile makeovers to enhance your appearance.',
      color: 'service-card--orange',
    },
  ];

  readonly whyFeatures: WhyFeature[] = [
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Modern Equipment',
      desc: 'State-of-the-art dental technology for precise diagnosis and comfortable treatment.',
    },
    {
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      title: 'Gentle & Painless Care',
      desc: 'We prioritize your comfort with gentle techniques and effective pain management.',
    },
    {
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      title: 'Experienced Team',
      desc: 'Our doctors bring 8–15 years of specialized experience to every patient.',
    },
    {
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      title: 'Easy Online Booking',
      desc: 'Book your appointment anytime with our simple online scheduling system.',
    },
  ];

  readonly doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Ahmed Raza',
      speciality: 'Orthodontist',
      experience: '12 years',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: '2',
      name: 'Dr. Sara Khan',
      speciality: 'Periodontist',
      experience: '8 years',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '3',
      name: 'Dr. Usman Ali',
      speciality: 'General Dentist',
      experience: '10 years',
      photo: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
  ];

  readonly testimonials: Testimonial[] = [
    {
      name: 'Ayesha Malik',
      role: 'Patient since 2021',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      review:
        'SmileCare completely transformed my smile. The team is professional, caring, and the results exceeded my expectations. Highly recommended!',
    },
    {
      name: 'Bilal Ahmed',
      role: 'Patient since 2022',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      review:
        'Had my orthodontic treatment here. Dr. Ahmed is fantastic — very thorough and always explains everything clearly. Pain-free experience!',
    },
    {
      name: 'Fatima Sheikh',
      role: 'Patient since 2020',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
      review:
        'Best dental clinic in Lahore. Modern equipment, friendly staff and excellent results. My teeth whitening results are amazing!',
    },
  ];

  // ── Computed ──────────────────────────────────────────────────────────────
  activeTestimonialData = computed(() => this.testimonials[this.activeTestimonial()]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  setTestimonial(index: number): void {
    this.activeTestimonial.set(index);
  }
  nextTestimonial(): void {
    this.activeTestimonial.update((i) => (i + 1) % this.testimonials.length);
  }
  prevTestimonial(): void {
    this.activeTestimonial.update((i) => (i === 0 ? this.testimonials.length - 1 : i - 1));
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngAfterViewInit(): void {
    this.animateHero();
    this.animateSections();
    this.autoplayTimer = setInterval(() => this.nextTestimonial(), 5000);
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
    this.heroCardCleanup?.();
    this.interactiveCleanups.forEach((cleanup) => cleanup());
  }

  // ── GSAP ─────────────────────────────────────────────────────────────────
  private animateHero(): void {
    const hero = this.heroRef?.nativeElement;
    if (!hero) return;

    const heroInner = hero.querySelector<HTMLElement>('.hero__inner');
    const heroCard = hero.querySelector<HTMLElement>('.hero__image-card');
    const heroBadges = hero.querySelectorAll<HTMLElement>('.hero__badge');

    if (heroInner) {
      gsap.set(heroInner, { transformPerspective: 1200, transformStyle: 'preserve-3d' });
    }

    gsap
      .timeline()
      .fromTo(
        '.hero__label',
        { opacity: 0, y: 20, rotateX: -26, z: -60, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.55, ease: 'power2.out' },
      )
      .fromTo(
        '.hero__heading',
        { opacity: 0, y: 34, rotateX: -20, z: -120, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.72, ease: 'power3.out' },
        '-=0.2',
      )
      .fromTo(
        '.hero__subtext',
        { opacity: 0, y: 22, rotateX: -14, z: -44, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.2',
      )
      .fromTo(
        '.hero__actions',
        { opacity: 0, y: 24, rotateX: -12, z: -40, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.15',
      )
      .fromTo(
        '.hero__trust',
        { opacity: 0, y: 18, rotateX: -10, z: -30, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.45, ease: 'power2.out' },
        '-=0.1',
      )
      .fromTo(
        '.hero__image',
        {
          opacity: 0,
          x: 54,
          scale: 0.94,
          rotateY: -16,
          rotateX: 8,
          z: -180,
          transformPerspective: 1400,
          transformOrigin: 'center center',
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          z: 0,
          duration: 0.95,
          ease: 'power3.out',
        },
        '-=0.7',
      );

    gsap.fromTo(
      heroBadges,
      {
        opacity: 0,
        y: 24,
        scale: 0.92,
        rotateY: -12,
        z: 80,
        transformPerspective: 1200,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        z: 0,
        duration: 0.68,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.48,
      },
    );

    gsap.to('.hero__blob--1', {
      y: 24,
      x: -18,
      duration: 5.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero__blob--2', {
      y: -18,
      x: 16,
      duration: 4.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    if (heroCard) {
      this.setupHeroCardTilt(heroCard);
    }
  }

  private setupHeroCardTilt(card: HTMLElement): void {
    const rotateToX = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power3.out' });
    const rotateToY = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power3.out' });
    const badgeOffsetX = gsap.quickTo('.hero__badge', 'x', { duration: 0.35, ease: 'power3.out' });
    const badgeOffsetY = gsap.quickTo('.hero__badge', 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (event: MouseEvent) => {
      const bounds = card.getBoundingClientRect();
      const pointerX = (event.clientX - bounds.left) / bounds.width;
      const pointerY = (event.clientY - bounds.top) / bounds.height;
      const rotateY = (pointerX - 0.5) * 10;
      const rotateX = (0.5 - pointerY) * 10;

      rotateToX(rotateX);
      rotateToY(rotateY);
      badgeOffsetX((pointerX - 0.5) * 12);
      badgeOffsetY((pointerY - 0.5) * -12);
    };

    const onLeave = () => {
      rotateToX(0);
      rotateToY(0);
      badgeOffsetX(0);
      badgeOffsetY(0);
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    this.heroCardCleanup = () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }

  private setupStatsTilt(items: HTMLElement[]): void {
    items.forEach((item) => {
      const rotateToX = gsap.quickTo(item, 'rotationX', { duration: 0.35, ease: 'power3.out' });
      const rotateToY = gsap.quickTo(item, 'rotationY', { duration: 0.35, ease: 'power3.out' });
      const moveValueY = gsap.quickTo(item.querySelector('.stats__value'), 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });
      const moveLabelY = gsap.quickTo(item.querySelector('.stats__label'), 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });

      const onMove = (event: MouseEvent) => {
        const bounds = item.getBoundingClientRect();
        const pointerX = (event.clientX - bounds.left) / bounds.width;
        const pointerY = (event.clientY - bounds.top) / bounds.height;

        rotateToY((pointerX - 0.5) * 12);
        rotateToX((0.5 - pointerY) * 10);
        moveValueY(-6);
        moveLabelY(-3);
      };

      const onLeave = () => {
        rotateToX(0);
        rotateToY(0);
        moveValueY(0);
        moveLabelY(0);
      };

      item.addEventListener('mousemove', onMove);
      item.addEventListener('mouseleave', onLeave);

      this.interactiveCleanups.push(() => {
        item.removeEventListener('mousemove', onMove);
        item.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  private setupServiceCardTilt(cards: HTMLElement[]): void {
    cards.forEach((card) => {
      const rotateToX = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power3.out' });
      const rotateToY = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power3.out' });
      const iconLift = gsap.quickTo(card.querySelector('.service-card__icon-wrap'), 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });
      const titleLift = gsap.quickTo(card.querySelector('.service-card__title'), 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });
      const linkLift = gsap.quickTo(card.querySelector('.service-card__link'), 'x', {
        duration: 0.35,
        ease: 'power3.out',
      });

      const onMove = (event: MouseEvent) => {
        const bounds = card.getBoundingClientRect();
        const pointerX = (event.clientX - bounds.left) / bounds.width;
        const pointerY = (event.clientY - bounds.top) / bounds.height;

        rotateToY((pointerX - 0.5) * 10);
        rotateToX((0.5 - pointerY) * 8);
        iconLift(-8);
        titleLift(-4);
        linkLift(6);
      };

      const onLeave = () => {
        rotateToX(0);
        rotateToY(0);
        iconLift(0);
        titleLift(0);
        linkLift(0);
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      this.interactiveCleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  private setupWhyImageTilt(imageWrap: HTMLElement): void {
    const rotateToX = gsap.quickTo(imageWrap, 'rotationX', { duration: 0.35, ease: 'power3.out' });
    const rotateToY = gsap.quickTo(imageWrap, 'rotationY', { duration: 0.35, ease: 'power3.out' });
    const badgeX = gsap.quickTo(imageWrap.querySelector('.why-us__exp-badge'), 'x', {
      duration: 0.35,
      ease: 'power3.out',
    });
    const badgeY = gsap.quickTo(imageWrap.querySelector('.why-us__exp-badge'), 'y', {
      duration: 0.35,
      ease: 'power3.out',
    });

    const onMove = (event: MouseEvent) => {
      const bounds = imageWrap.getBoundingClientRect();
      const pointerX = (event.clientX - bounds.left) / bounds.width;
      const pointerY = (event.clientY - bounds.top) / bounds.height;

      rotateToY((pointerX - 0.5) * 10);
      rotateToX((0.5 - pointerY) * 9);
      badgeX((pointerX - 0.5) * 12);
      badgeY((pointerY - 0.5) * -12);
    };

    const onLeave = () => {
      rotateToX(0);
      rotateToY(0);
      badgeX(0);
      badgeY(0);
    };

    imageWrap.addEventListener('mousemove', onMove);
    imageWrap.addEventListener('mouseleave', onLeave);

    this.interactiveCleanups.push(() => {
      imageWrap.removeEventListener('mousemove', onMove);
      imageWrap.removeEventListener('mouseleave', onLeave);
    });
  }

  private setupWhyFeatureTilt(features: HTMLElement[]): void {
    features.forEach((feature) => {
      const rotateToX = gsap.quickTo(feature, 'rotationX', { duration: 0.35, ease: 'power3.out' });
      const rotateToY = gsap.quickTo(feature, 'rotationY', { duration: 0.35, ease: 'power3.out' });
      const iconLift = gsap.quickTo(feature.querySelector('.why-feature__icon'), 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });
      const titleLift = gsap.quickTo(feature.querySelector('.why-feature__title'), 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });

      const onMove = (event: MouseEvent) => {
        const bounds = feature.getBoundingClientRect();
        const pointerX = (event.clientX - bounds.left) / bounds.width;
        const pointerY = (event.clientY - bounds.top) / bounds.height;

        rotateToY((pointerX - 0.5) * 8);
        rotateToX((0.5 - pointerY) * 6);
        iconLift(-6);
        titleLift(-3);
      };

      const onLeave = () => {
        rotateToX(0);
        rotateToY(0);
        iconLift(0);
        titleLift(0);
      };

      feature.addEventListener('mousemove', onMove);
      feature.addEventListener('mouseleave', onLeave);

      this.interactiveCleanups.push(() => {
        feature.removeEventListener('mousemove', onMove);
        feature.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  private setupDoctorCardTilt(cards: HTMLElement[]): void {
    cards.forEach((card) => {
      const rotateToX = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power3.out' });
      const rotateToY = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power3.out' });
      const imageScale = gsap.quickTo(card.querySelector('.doctor-card__img'), 'scale', {
        duration: 0.35,
        ease: 'power3.out',
      });
      const bodyLift = gsap.quickTo(card.querySelector('.doctor-card__body'), 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });
      const buttonLift = gsap.quickTo(card.querySelector('.doctor-card__btn'), 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });

      const onMove = (event: MouseEvent) => {
        const bounds = card.getBoundingClientRect();
        const pointerX = (event.clientX - bounds.left) / bounds.width;
        const pointerY = (event.clientY - bounds.top) / bounds.height;

        rotateToY((pointerX - 0.5) * 9);
        rotateToX((0.5 - pointerY) * 7);
        imageScale(1.05);
        bodyLift(-4);
        buttonLift(-3);
      };

      const onLeave = () => {
        rotateToX(0);
        rotateToY(0);
        imageScale(1);
        bodyLift(0);
        buttonLift(0);
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      this.interactiveCleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  private setupTestimonialTilt(card: HTMLElement): void {
    const rotateToX = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power3.out' });
    const rotateToY = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power3.out' });
    const reviewY = gsap.quickTo(card.querySelector('.testimonial-card__review'), 'y', {
      duration: 0.35,
      ease: 'power3.out',
    });
    const authorY = gsap.quickTo(card.querySelector('.testimonial-card__author'), 'y', {
      duration: 0.35,
      ease: 'power3.out',
    });

    const onMove = (event: MouseEvent) => {
      const bounds = card.getBoundingClientRect();
      const pointerX = (event.clientX - bounds.left) / bounds.width;
      const pointerY = (event.clientY - bounds.top) / bounds.height;

      rotateToY((pointerX - 0.5) * 8);
      rotateToX((0.5 - pointerY) * 6);
      reviewY(-4);
      authorY(-2);
    };

    const onLeave = () => {
      rotateToX(0);
      rotateToY(0);
      reviewY(0);
      authorY(0);
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    this.interactiveCleanups.push(() => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    });
  }

  private setupCtaTilt(panel: HTMLElement): void {
    const rotateToX = gsap.quickTo(panel, 'rotationX', { duration: 0.35, ease: 'power3.out' });
    const rotateToY = gsap.quickTo(panel, 'rotationY', { duration: 0.35, ease: 'power3.out' });
    const copyX = gsap.quickTo(panel.querySelector('.cta-banner__copy'), 'x', {
      duration: 0.35,
      ease: 'power3.out',
    });
    const actionsX = gsap.quickTo(panel.querySelector('.cta-banner__actions'), 'x', {
      duration: 0.35,
      ease: 'power3.out',
    });

    const onMove = (event: MouseEvent) => {
      const bounds = panel.getBoundingClientRect();
      const pointerX = (event.clientX - bounds.left) / bounds.width;
      const pointerY = (event.clientY - bounds.top) / bounds.height;

      rotateToY((pointerX - 0.5) * 7);
      rotateToX((0.5 - pointerY) * 6);
      copyX((pointerX - 0.5) * -8);
      actionsX((pointerX - 0.5) * 8);
    };

    const onLeave = () => {
      rotateToX(0);
      rotateToY(0);
      copyX(0);
      actionsX(0);
    };

    panel.addEventListener('mousemove', onMove);
    panel.addEventListener('mouseleave', onLeave);

    this.interactiveCleanups.push(() => {
      panel.removeEventListener('mousemove', onMove);
      panel.removeEventListener('mouseleave', onLeave);
    });
  }

  private animateSections(): void {
    const statsItems = gsap.utils.toArray<HTMLElement>('.stats__item');
    const serviceCards = gsap.utils.toArray<HTMLElement>('.service-card');
    const whyFeatures = gsap.utils.toArray<HTMLElement>('.why-feature');
    const doctorCards = gsap.utils.toArray<HTMLElement>('.doctor-card');
    const testimonialWrapper = document.querySelector<HTMLElement>('.testimonials__wrapper');
    const testimonialCard = document.querySelector<HTMLElement>('.testimonial-card');
    const ctaPanel = document.querySelector<HTMLElement>('.cta-banner__inner');
    const whyImage = document.querySelector<HTMLElement>('.why-us__image');

    if (statsItems.length) {
      gsap.set(statsItems, { transformPerspective: 1200, transformStyle: 'preserve-3d' });

      gsap.fromTo(
        statsItems,
        { opacity: 0, y: 30, rotateX: -16, z: -80 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          z: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.stats__grid', start: 'top 82%', once: true },
        },
      );

      statsItems.forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -7 : -10,
          duration: 2.6 + index * 0.18,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.4 + index * 0.08,
        });
      });

      this.setupStatsTilt(statsItems);
    }

    if (serviceCards.length) {
      gsap.set(serviceCards, { transformPerspective: 1400, transformStyle: 'preserve-3d' });

      gsap.fromTo(
        serviceCards,
        { opacity: 0, y: 42, rotateX: -18, rotateY: -8, z: -120 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          duration: 0.78,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.services__grid', start: 'top 80%', once: true },
        },
      );

      serviceCards.forEach((card, index) => {
        gsap.to(card, {
          y: index % 3 === 1 ? -9 : -6,
          duration: 3 + index * 0.12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.35 + index * 0.06,
        });
      });

      this.setupServiceCardTilt(serviceCards);
    }

    if (whyImage) {
      gsap.set(whyImage, { transformPerspective: 1500, transformStyle: 'preserve-3d' });

      gsap.fromTo(
        whyImage,
        { opacity: 0, x: -42, rotateY: 16, rotateX: 8, z: -140, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          rotateX: 0,
          z: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: whyImage, start: 'top 82%', once: true },
        },
      );

      gsap.to('.why-us__exp-badge', {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      this.setupWhyImageTilt(whyImage);
    }

    if (whyFeatures.length) {
      gsap.set(whyFeatures, { transformPerspective: 1300, transformStyle: 'preserve-3d' });

      gsap.fromTo(
        whyFeatures,
        { opacity: 0, y: 34, rotateX: -14, rotateY: -8, z: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          duration: 0.72,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.why-us__features', start: 'top 82%', once: true },
        },
      );

      whyFeatures.forEach((feature, index) => {
        gsap.to(feature, {
          y: index % 2 === 0 ? -5 : -8,
          duration: 2.8 + index * 0.18,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.3 + index * 0.05,
        });
      });

      this.setupWhyFeatureTilt(whyFeatures);
    }

    if (doctorCards.length) {
      gsap.set(doctorCards, { transformPerspective: 1400, transformStyle: 'preserve-3d' });

      gsap.fromTo(
        doctorCards,
        { opacity: 0, y: 34, rotateX: -16, rotateY: -10, z: -110, scale: 0.97 },
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
          scrollTrigger: { trigger: '.doctors__grid', start: 'top 82%', once: true },
        },
      );

      this.setupDoctorCardTilt(doctorCards);
    }

    if (testimonialWrapper && testimonialCard) {
      gsap.set([testimonialWrapper, testimonialCard], {
        transformPerspective: 1400,
        transformStyle: 'preserve-3d',
      });

      gsap.fromTo(
        testimonialWrapper,
        { opacity: 0, y: 42, rotateX: -14, z: -120 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          z: 0,
          duration: 0.82,
          ease: 'power3.out',
          scrollTrigger: { trigger: testimonialWrapper, start: 'top 82%', once: true },
        },
      );

      gsap.fromTo(
        '.testimonials__controls > *',
        { opacity: 0, y: 18, z: -40 },
        {
          opacity: 1,
          y: 0,
          z: 0,
          duration: 0.48,
          ease: 'power2.out',
          stagger: 0.08,
          delay: 0.2,
          scrollTrigger: { trigger: testimonialWrapper, start: 'top 82%', once: true },
        },
      );

      this.setupTestimonialTilt(testimonialCard);
    }

    if (ctaPanel) {
      gsap.set(ctaPanel, { transformPerspective: 1500, transformStyle: 'preserve-3d' });

      gsap.fromTo(
        ctaPanel,
        { opacity: 0, y: 44, rotateX: -16, z: -120, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          z: 0,
          scale: 1,
          duration: 0.88,
          ease: 'power3.out',
          scrollTrigger: { trigger: ctaPanel, start: 'top 84%', once: true },
        },
      );

      gsap.fromTo(
        '.cta-banner__pill',
        { opacity: 0, y: 18, rotateX: -12, z: -40 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          z: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          delay: 0.2,
          scrollTrigger: { trigger: ctaPanel, start: 'top 84%', once: true },
        },
      );

      this.setupCtaTilt(ctaPanel);
    }

    gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((el) => {
      if (
        el.classList.contains('why-us__image') ||
        el.classList.contains('testimonials__wrapper') ||
        el.classList.contains('cta-banner')
      ) {
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>('[data-stagger-parent]').forEach((parent) => {
      if (
        parent.classList.contains('stats__grid') ||
        parent.classList.contains('services__grid') ||
        parent.classList.contains('why-us__features') ||
        parent.classList.contains('doctors__grid')
      ) {
        return;
      }

      gsap.fromTo(
        parent.querySelectorAll('[data-stagger-child]'),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: parent, start: 'top 80%', once: true },
        },
      );
    });
  }
}

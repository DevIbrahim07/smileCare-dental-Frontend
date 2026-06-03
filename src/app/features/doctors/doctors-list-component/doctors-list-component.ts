import { Component, AfterViewInit, OnDestroy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
interface Doctor {
  id: string;
  name: string;
  speciality: string;
  experience: string;
  photo: string;
  workingDays: string[];
  bio: string; // short bio for card
}
@Component({
  selector: 'app-doctors-list-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './doctors-list-component.html',
  styleUrl: './doctors-list-component.scss',
})
export class DoctorsListComponent implements AfterViewInit, OnDestroy {
  // ── Signals ───────────────────────────────────────────────────────────────
  activeFilter = signal<string>('All');

  // ── Static data ───────────────────────────────────────────────────────────
  readonly allDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Ahmed Raza',
      speciality: 'Orthodontist',
      experience: '12 years',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu'],
      bio: 'Specialist in braces and clear aligners. Trained internationally at New York University.',
    },
    {
      id: '2',
      name: 'Dr. Sara Khan',
      speciality: 'Periodontist',
      experience: '8 years',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      workingDays: ['Mon', 'Wed', 'Thu', 'Sat'],
      bio: 'Expert in gum health, bone grafting, and dental implants. Diploma holder from London.',
    },
    {
      id: '3',
      name: 'Dr. Usman Ali',
      speciality: 'General Dentist',
      experience: '10 years',
      photo: 'https://randomuser.me/api/portraits/men/51.jpg',
      workingDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      bio: 'Comprehensive dental care from routine check-ups to cosmetic procedures.',
    },
    {
      id: '4',
      name: 'Dr. Hina Malik',
      speciality: 'Cosmetic Dentist',
      experience: '7 years',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      workingDays: ['Mon', 'Tue', 'Thu', 'Fri'],
      bio: 'Specialist in smile makeovers, veneers, and teeth whitening treatments.',
    },
    {
      id: '5',
      name: 'Dr. Kamran Sheikh',
      speciality: 'Oral Surgeon',
      experience: '14 years',
      photo: 'https://randomuser.me/api/portraits/men/67.jpg',
      workingDays: ['Mon', 'Wed', 'Fri'],
      bio: 'Experienced in wisdom tooth removal, jaw surgery, and complex extractions.',
    },
    {
      id: '6',
      name: 'Dr. Zara Hussain',
      speciality: 'Pediatric Dentist',
      experience: '6 years',
      photo: 'https://randomuser.me/api/portraits/women/52.jpg',
      workingDays: ['Tue', 'Thu', 'Sat'],
      bio: 'Dedicated to gentle dental care for children, making every visit fun and fear-free.',
    },
  ];

  // ── Filter options derived from data ──────────────────────────────────────
  readonly filters: string[] = ['All', ...new Set(this.allDoctors.map((d) => d.speciality))];

  // ── Computed — filtered list ──────────────────────────────────────────────
  filteredDoctors = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') return this.allDoctors;
    return this.allDoctors.filter((d) => d.speciality === filter);
  });

  // ── Methods ───────────────────────────────────────────────────────────────
  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngAfterViewInit(): void {
    this.animateHero();
    this.animateFilterGrid();
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  private animateHero(): void {
    const hero = document.querySelector<HTMLElement>('.dl-hero');
    if (!hero) return;

    const heroInner = hero.querySelector<HTMLElement>('.dl-hero__inner');
    if (heroInner) {
      gsap.set(heroInner, {
        transformPerspective: 1400,
        transformStyle: 'preserve-3d',
      });
    }

    gsap
      .timeline()
      .fromTo(
        '.dl-hero__label',
        { opacity: 0, y: 18, rotateX: -22, z: -60, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.5, ease: 'power2.out' },
      )
      .fromTo(
        '.dl-hero__heading',
        { opacity: 0, y: 28, rotateX: -16, z: -120, transformPerspective: 1400 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.72, ease: 'power3.out' },
        '-=0.18',
      )
      .fromTo(
        '.dl-hero__sub',
        { opacity: 0, y: 20, rotateX: -10, z: -45, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.56, ease: 'power2.out' },
        '-=0.2',
      );

    gsap.fromTo(
      '.dl-hero__bg',
      { opacity: 0, scale: 0.92, x: 36, y: -18 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      },
    );

    gsap.to('.dl-hero__bg', {
      x: -14,
      y: 10,
      duration: 5.1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  private animateFilterGrid(): void {
    const section = document.querySelector<HTMLElement>('.section');
    const filters = document.querySelector<HTMLElement>('.dl-filters');
    const results = document.querySelector<HTMLElement>('.dl-results');
    const grid = document.querySelector<HTMLElement>('.dl-grid');
    if (!section || !filters || !results || !grid) return;

    const cards = gsap.utils.toArray<HTMLElement>('.dl-card');

    gsap.set(filters, {
      transformPerspective: 1200,
      transformStyle: 'preserve-3d',
    });

    gsap.set(cards, {
      transformPerspective: 1450,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      filters,
      { opacity: 0, y: 24, rotateX: -12, z: -50 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.56,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      results,
      { opacity: 0, y: 18, rotateX: -8, z: -30 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.46,
        ease: 'power2.out',
        delay: 0.08,
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
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
        duration: 0.74,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: 'top 86%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.dl-card__img-wrap, .dl-card__name, .dl-card__meta, .dl-card__bio, .dl-card__actions',
      { opacity: 0, y: 14, z: 22, transformPerspective: 1200 },
      {
        opacity: 1,
        y: 0,
        z: 0,
        duration: 0.44,
        ease: 'power2.out',
        stagger: 0.04,
        delay: 0.14,
        scrollTrigger: {
          trigger: grid,
          start: 'top 86%',
          once: true,
        },
      },
    );
  }
}

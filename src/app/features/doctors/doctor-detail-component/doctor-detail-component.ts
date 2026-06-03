import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  signal,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// ── Interfaces ────────────────────────────────────────────────────────────────
interface DoctorDetail {
  id: string;
  name: string;
  speciality: string;
  experience: string;
  photo: string;
  bio: string;
  qualifications: string[];
  workingDays: string[];
  workingHours: { start: string; end: string };
  languages: string[];
  services: string[];
}
@Component({
  selector: 'app-doctor-detail-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './doctor-detail-component.html',
  styleUrl: './doctor-detail-component.scss',
})
export class DoctorDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  // ── Signals ───────────────────────────────────────────────────────────────
  doctor = signal<DoctorDetail | null>(null);
  notFound = signal<boolean>(false);

  // ── Computed ──────────────────────────────────────────────────────────────
  // Splits working days into 2 groups for display
  workingDaysDisplay = computed(() => {
    const d = this.doctor();
    if (!d) return '';
    return d.workingDays.join(', ');
  });

  // ── Static dummy data (replaced by API call in Phase 2) ──────────────────
  private readonly allDoctors: DoctorDetail[] = [
    {
      id: '1',
      name: 'Dr. Ahmed Raza',
      speciality: 'Orthodontist',
      experience: '12 years',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Dr. Ahmed Raza is a highly experienced orthodontist who has helped thousands of patients achieve perfectly aligned smiles. He completed his specialization from King Edward Medical University and has trained internationally in the USA. He is known for his gentle approach and clear communication with patients of all ages.',
      qualifications: [
        'BDS — King Edward Medical University',
        'FCPS Orthodontics — College of Physicians & Surgeons Pakistan',
        'International Training — New York University, USA',
      ],
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      workingHours: { start: '10:00 AM', end: '6:00 PM' },
      languages: ['English', 'Urdu', 'Punjabi'],
      services: ['Braces', 'Clear Aligners', 'Retainers', 'Space Maintainers', 'Jaw Correction'],
    },
    {
      id: '2',
      name: 'Dr. Sara Khan',
      speciality: 'Periodontist',
      experience: '8 years',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Dr. Sara Khan specializes in gum health and the prevention, diagnosis, and treatment of periodontal disease. With 8 years of focused experience, she has a reputation for thorough, painless gum treatments and excellent patient education. She is passionate about helping patients understand the link between gum health and overall wellness.',
      qualifications: [
        'BDS — University of Health Sciences, Lahore',
        'FCPS Periodontology — College of Physicians & Surgeons Pakistan',
        'Diploma in Implantology — London, UK',
      ],
      workingDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      workingHours: { start: '9:00 AM', end: '5:00 PM' },
      languages: ['English', 'Urdu'],
      services: [
        'Scaling & Polishing',
        'Gum Surgery',
        'Bone Grafting',
        'Dental Implants',
        'Gum Disease Treatment',
      ],
    },
    {
      id: '3',
      name: 'Dr. Usman Ali',
      speciality: 'General Dentist',
      experience: '10 years',
      photo: 'https://randomuser.me/api/portraits/men/51.jpg',
      bio: 'Dr. Usman Ali is a general dentist with 10 years of broad clinical experience. He handles everything from routine checkups and fillings to extractions and cosmetic work. Patients appreciate his calm demeanor and his ability to make even anxious visitors feel completely at ease. He believes prevention is the best treatment.',
      qualifications: [
        'BDS — Fatima Jinnah Dental College, Karachi',
        'Certificate in Cosmetic Dentistry — Dubai',
        'Advanced Restorative Dentistry — ADA, USA',
      ],
      workingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      workingHours: { start: '11:00 AM', end: '7:00 PM' },
      languages: ['English', 'Urdu', 'Sindhi'],
      services: ['Checkups', 'Fillings', 'Extractions', 'Teeth Whitening', 'Veneers', 'Root Canal'],
    },
  ];

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const found = this.allDoctors.find((d) => d.id === id) ?? null;
    this.doctor.set(found);
    if (!found) this.notFound.set(true);
  }

  ngAfterViewInit(): void {
    if (!this.doctor()) return;

    this.animateHero();
    this.animateMainContent();
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  // ── Methods ───────────────────────────────────────────────────────────────
  goBack(): void {
    this.location.back();
  }

  // Days of week — to highlight working days
  readonly allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  readonly dayMap: Record<string, string> = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
  };

  isDayActive(shortDay: string): boolean {
    const doc = this.doctor();
    if (!doc) return false;
    return doc.workingDays.some((d) => this.dayMap[d] === shortDay);
  }

  private animateHero(): void {
    const hero = document.querySelector<HTMLElement>('.detail-hero');
    if (!hero) return;

    const heroInner = hero.querySelector<HTMLElement>('.detail-hero__inner');
    const profile = hero.querySelector<HTMLElement>('.detail-hero__profile');
    if (heroInner) {
      gsap.set(heroInner, {
        transformPerspective: 1500,
        transformStyle: 'preserve-3d',
      });
    }

    if (profile) {
      gsap.set(profile, {
        transformPerspective: 1500,
        transformStyle: 'preserve-3d',
      });
    }

    gsap
      .timeline()
      .fromTo(
        '.detail-hero__back',
        { opacity: 0, y: 18, rotateX: -14, z: -40, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.46, ease: 'power2.out' },
      )
      .fromTo(
        '.detail-hero__photo-wrap',
        { opacity: 0, x: -26, rotateY: 14, rotateX: 8, z: -110, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          rotateX: 0,
          z: 0,
          scale: 1,
          duration: 0.78,
          ease: 'power3.out',
        },
        '-=0.1',
      )
      .fromTo(
        '.detail-hero__speciality',
        { opacity: 0, y: 18, rotateX: -16, z: -50, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.46, ease: 'power2.out' },
        '-=0.42',
      )
      .fromTo(
        '.detail-hero__name',
        { opacity: 0, y: 26, rotateX: -14, z: -110, transformPerspective: 1400 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.2',
      )
      .fromTo(
        '.detail-hero__meta',
        { opacity: 0, y: 18, rotateX: -10, z: -40, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.22',
      )
      .fromTo(
        '.detail-hero__book-btn',
        { opacity: 0, y: 16, rotateX: -10, z: -28, scale: 0.95, transformPerspective: 1200 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          z: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.18',
      );

    gsap.fromTo(
      '.detail-hero__bg',
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

    gsap.to('.detail-hero__bg', {
      x: -14,
      y: 10,
      duration: 5.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  private animateMainContent(): void {
    const body = document.querySelector<HTMLElement>('.detail-body');
    const mainColumn = body?.querySelector<HTMLElement>('.detail-body__main');
    const sidebar = body?.querySelector<HTMLElement>('.detail-body__sidebar');
    if (!body || !mainColumn || !sidebar) return;

    const mainSections = gsap.utils.toArray<HTMLElement>('.detail-body__main .detail-section');
    const sidebarCards = gsap.utils.toArray<HTMLElement>('.detail-body__sidebar .sidebar-card');

    gsap.set(mainSections, {
      transformPerspective: 1450,
      transformStyle: 'preserve-3d',
    });

    gsap.set(sidebarCards, {
      transformPerspective: 1450,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      mainSections,
      { opacity: 0, y: 34, rotateX: -14, rotateY: -8, z: -90, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: body,
          start: 'top 84%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      sidebarCards,
      { opacity: 0, y: 38, rotateX: -16, rotateY: 10, z: -110, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1,
        duration: 0.76,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: sidebar,
          start: 'top 86%',
          once: true,
        },
      },
    );

    gsap.fromTo(
      '.detail-section__heading, .detail-section__text, .qual-list__item, .services-tags__item, .sidebar-card__heading, .day-pill, .sidebar-card__hours, .sidebar-card__sub, .sidebar-card .btn, .sidebar-card__contact-link',
      { opacity: 0, y: 14, z: 24, transformPerspective: 1200 },
      {
        opacity: 1,
        y: 0,
        z: 0,
        duration: 0.42,
        ease: 'power2.out',
        stagger: 0.03,
        delay: 0.18,
        scrollTrigger: {
          trigger: body,
          start: 'top 84%',
          once: true,
        },
      },
    );
  }
}

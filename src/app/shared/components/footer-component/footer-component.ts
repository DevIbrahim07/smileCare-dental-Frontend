import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface FooterLink {
  label: string;
  path: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}
interface SocialLink {
  label: string;
  href: string;
  icon: string; // SVG path
}

@Component({
  selector: 'app-footer-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('footerRef') private footerRef!: ElementRef<HTMLElement>;
  private interactiveCleanups: Array<() => void> = [];

  currentYear = signal<number>(new Date().getFullYear());
  // ── Footer columns ─────────────────────────────────────────────────────────
  readonly columns: FooterColumn[] = [
    {
      heading: 'Quick Links',
      links: [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Our Services', path: '/services' },
        { label: 'Our Doctors', path: '/doctors' },
        { label: 'Contact', path: '/contact' },
      ],
    },
    {
      heading: 'Our Services',
      links: [
        { label: 'Teeth Cleaning', path: '/services' },
        { label: 'Teeth Whitening', path: '/services' },
        { label: 'Orthodontics', path: '/services' },
        { label: 'Dental Implants', path: '/services' },
        { label: 'Root Canal', path: '/services' },
      ],
    },
    {
      heading: 'Working Hours',
      links: [
        { label: 'Mon – Thu: 9:00 AM – 6:00 PM', path: '' },
        { label: 'Fri: 9:00 AM – 5:00 PM', path: '' },
        { label: 'Sat: 10:00 AM – 4:00 PM', path: '' },
        { label: 'Sun: Closed', path: '' },
      ],
    },
  ];
  // ── Social links ───────────────────────────────────────────────────────────
  readonly socialLinks: SocialLink[] = [
    {
      label: 'Facebook',
      href: '#',
      icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    },
    {
      label: 'Instagram',
      href: '#',
      icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
    },
    {
      label: 'Twitter / X',
      href: '#',
      icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2-4.52 4.52 0 .35.04.7.11 1.03A12.83 12.83 0 0 1 2.24.89a4.52 4.52 0 0 0 1.4 6.03 4.49 4.49 0 0 1-2.05-.57v.06a4.52 4.52 0 0 0 3.63 4.43 4.54 4.54 0 0 1-2.04.08 4.53 4.53 0 0 0 4.22 3.14A9.07 9.07 0 0 1 2 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 24 4.59a9 9 0 0 1-2.59.71A4.52 4.52 0 0 0 23 3z',
    },
    {
      label: 'WhatsApp',
      href: '#',
      icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.998 2C6.477 2 2 6.484 2 12.017c0 1.99.524 3.86 1.44 5.48L2 22l4.644-1.418A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z',
    },
  ];
  // ── GSAP entrance ──────────────────────────────────────────────────────────
  ngAfterViewInit(): void {
    const el = this.footerRef?.nativeElement;
    if (!el) return;

    gsap.set(el.querySelector('.footer__grid'), {
      transformPerspective: 1500,
      transformStyle: 'preserve-3d',
    });

    gsap.fromTo(
      el.querySelectorAll('[data-footer-animate]'),
      {
        opacity: 0,
        y: 38,
        rotateX: -18,
        z: -70,
        transformPerspective: 1100,
        transformOrigin: 'top center',
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
        },
      },
    );

    gsap.fromTo(
      el.querySelectorAll('.footer__social-link'),
      {
        opacity: 0,
        y: 16,
        rotateY: -18,
        z: -50,
        transformPerspective: 1200,
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        z: 0,
        duration: 0.48,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
        },
      },
    );

    gsap.fromTo(
      el.querySelector('.footer__book-btn'),
      {
        opacity: 0,
        y: 18,
        scale: 0.94,
        rotateX: -12,
        z: -40,
        transformPerspective: 1200,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        z: 0,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 84%',
        },
      },
    );

    gsap.fromTo(
      el.querySelector('.footer__bottom-inner'),
      { opacity: 0, y: 18, rotateX: -10, z: -40, transformPerspective: 1200 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
        },
      },
    );

    this.setupColumnTilt(el.querySelectorAll<HTMLElement>('[data-footer-animate]'));
    this.setupSocialIconClicks(el.querySelectorAll<HTMLElement>('.footer__social-link'));
  }

  ngOnDestroy(): void {
    this.interactiveCleanups.forEach((cleanup) => cleanup());
  }

  private setupColumnTilt(columns: NodeListOf<HTMLElement>): void {
    columns.forEach((column) => {
      const rotateToX = gsap.quickTo(column, 'rotationX', { duration: 0.35, ease: 'power3.out' });
      const rotateToY = gsap.quickTo(column, 'rotationY', { duration: 0.35, ease: 'power3.out' });
      const contentY = gsap.quickTo(column.querySelector('.footer__tagline, .footer__col-links'), 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });
      const socialY = gsap.quickTo(column.querySelector('.footer__social, .footer__book-btn'), 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });

      const resetColumn = () => {
        rotateToX(0);
        rotateToY(0);
        contentY(0);
        socialY(0);
      };

      const onMove = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        if (target?.closest('.footer__social') || target?.closest('.footer__book-btn')) {
          resetColumn();
          return;
        }

        const bounds = column.getBoundingClientRect();
        const pointerX = (event.clientX - bounds.left) / bounds.width;
        const pointerY = (event.clientY - bounds.top) / bounds.height;

        rotateToY((pointerX - 0.5) * 8);
        rotateToX((0.5 - pointerY) * 6);
        contentY(-4);
        socialY(-2);
      };

      const onLeave = () => {
        resetColumn();
      };

      column.addEventListener('mousemove', onMove);
      column.addEventListener('mouseleave', onLeave);

      this.interactiveCleanups.push(() => {
        column.removeEventListener('mousemove', onMove);
        column.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  private setupSocialIconClicks(icons: NodeListOf<HTMLElement>): void {
    icons.forEach((icon) => {
      const onClick = () => {
        gsap.fromTo(
          icon,
          { scale: 1, rotateZ: 0, y: 0 },
          {
            keyframes: [
              { scale: 0.92, rotateZ: -6, y: 1, duration: 0.08 },
              { scale: 1.12, rotateZ: 6, y: -3, duration: 0.14 },
              { scale: 1, rotateZ: 0, y: 0, duration: 0.16 },
            ],
            ease: 'power2.out',
            overwrite: true,
          },
        );
      };

      icon.addEventListener('click', onClick);

      this.interactiveCleanups.push(() => {
        icon.removeEventListener('click', onClick);
      });
    });
  }
}

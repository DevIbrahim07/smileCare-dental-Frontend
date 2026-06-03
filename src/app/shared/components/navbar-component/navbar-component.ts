import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import gsap from 'gsap';

interface NavLink {
  label: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent implements AfterViewInit {
  private readonly hostRef = inject(ElementRef<HTMLElement>);

  @ViewChild('shell') private shellRef?: ElementRef<HTMLElement>;
  @ViewChild('mobilePanel') private mobilePanelRef?: ElementRef<HTMLElement>;

  readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Contact', path: '/contact' },
  ];

  readonly isMenuOpen = signal(false);
  readonly isScrolled = signal(false);

  readonly navbarClass = computed(() =>
    this.isScrolled() ? 'navbar navbar--scrolled' : 'navbar',
  );

  ngAfterViewInit(): void {
    this.animateNavbarEntrance();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 12);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 960) {
      this.isMenuOpen.set(false);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);

    if (!this.isMenuOpen()) {
      return;
    }

    requestAnimationFrame(() => {
      const mobilePanel = this.mobilePanelRef?.nativeElement;

      if (!mobilePanel) {
        return;
      }

      gsap.fromTo(
        mobilePanel,
        {
          opacity: 0,
          y: -18,
          rotateX: -10,
          transformPerspective: 900,
          transformOrigin: 'top center',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.42,
          ease: 'power2.out',
        },
      );
    });
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  private animateNavbarEntrance(): void {
    const shell = this.shellRef?.nativeElement;

    if (!shell) {
      return;
    }

    const animatedItems = this.hostRef.nativeElement.querySelectorAll('[data-nav-animate]');

    gsap.fromTo(
      shell,
      {
        opacity: 0,
        y: -28,
        rotateX: -16,
        z: -80,
        transformPerspective: 1200,
        transformOrigin: 'top center',
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        duration: 0.75,
        ease: 'power3.out',
      },
    );

    gsap.fromTo(
      animatedItems,
      {
        opacity: 0,
        y: -12,
        z: -30,
      },
      {
        opacity: 1,
        y: 0,
        z: 0,
        duration: 0.52,
        ease: 'power2.out',
        stagger: 0.06,
        delay: 0.12,
      },
    );
  }
}

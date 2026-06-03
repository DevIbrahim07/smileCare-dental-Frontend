import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-not-found-component',
  imports: [RouterLink],
  templateUrl: './not-found-component.html',
  styleUrl: './not-found-component.scss',
})
export class NotFoundComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const panel = document.querySelector<HTMLElement>('.nf-page__panel');
    if (!panel) return;

    gsap.set(panel, {
      transformPerspective: 1500,
      transformStyle: 'preserve-3d',
    });

    gsap
      .timeline()
      .fromTo(
        '.nf-page__eyebrow',
        { opacity: 0, y: 18, rotateX: -20, z: -50, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.48, ease: 'power2.out' },
      )
      .fromTo(
        '.nf-page__code',
        { opacity: 0, y: 24, rotateX: -14, z: -100, transformPerspective: 1400 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.72, ease: 'power3.out' },
        '-=0.16',
      )
      .fromTo(
        '.nf-page__title',
        { opacity: 0, y: 22, rotateX: -12, z: -70, transformPerspective: 1300 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.58, ease: 'power3.out' },
        '-=0.28',
      )
      .fromTo(
        '.nf-page__text',
        { opacity: 0, y: 18, rotateX: -10, z: -40, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.52, ease: 'power2.out' },
        '-=0.24',
      )
      .fromTo(
        '.nf-page__actions .btn',
        { opacity: 0, y: 16, rotateX: -10, z: -24, scale: 0.95, transformPerspective: 1200 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          z: 0,
          scale: 1,
          duration: 0.46,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=0.18',
      )
      .fromTo(
        '.nf-page__note',
        { opacity: 0, y: 14, rotateX: -8, z: -18, transformPerspective: 1100 },
        { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 0.42, ease: 'power2.out' },
        '-=0.12',
      );

    gsap.fromTo(
      '.nf-page__glow',
      { opacity: 0, scale: 0.9, x: 28, y: -18 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      },
    );

    gsap.to('.nf-page__glow', {
      x: -14,
      y: 10,
      duration: 5.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }
}

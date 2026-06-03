import { Routes } from '@angular/router';

export const routes: Routes = [
  // ── Public routes ────────────────────────────────────────────────────────
  {
    path: '',
    loadComponent: () => import('./features/home/home-component').then((m) => m.HomeComponent),
    title: 'SmileCare Dental | Home',
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about-component').then((m) => m.AboutComponent),
    title: 'About Us | SmileCare Dental',
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/services/services-component').then((m) => m.ServicesComponent),
    title: 'Our Services | SmileCare Dental',
  },
  {
    path: 'doctors',
    loadComponent: () =>
      import('./features/doctors/doctors-list-component/doctors-list-component').then(
        (m) => m.DoctorsListComponent,
      ),
    title: 'Our Doctors | SmileCare Dental',
  },
  {
    path: 'doctors/:id',
    loadComponent: () =>
      import('./features/doctors/doctor-detail-component/doctor-detail-component').then(
        (m) => m.DoctorDetailComponent,
      ),
    title: 'Doctor Profile | SmileCare Dental',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact-component').then((m) => m.ContactComponent),
    title: 'Contact Us | SmileCare Dental',
  },

  // ── Auth routes (Phase 2) ────────────────────────────────────────────────
  // {
  //   path: 'login',
  //   loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent),
  //   title: 'Login | SmileCare Dental',
  // },
  // {
  //   path: 'register',
  //   loadComponent: () =>
  //     import('./features/auth/register.component').then((m) => m.RegisterComponent),
  //   title: 'Register | SmileCare Dental',
  // },

  // ── Protected routes (Phase 2) — canActivate added in Phase 2 ───────────
  {
    path: 'booking',
    loadComponent: () =>
      import('./features/booking/booking-component').then((m) => m.BookingComponent),
    title: 'Book Appointment | SmileCare Dental',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/patient-dashboard/patient-dashboard-component').then(
        (m) => m.PatientDashboardComponent,
      ),
    title: 'My Dashboard | SmileCare Dental',
  },

  // ── Doctor panel (Phase 3) ───────────────────────────────────────────────
  {
    path: 'doctor',
    loadComponent: () =>
      import('./features/doctor-dashboard/doctor-dashboard-component').then(
        (m) => m.DoctorDashboardComponent,
      ),
    title: 'Doctor Panel | SmileCare Dental',
  },

  // ── 404 ──────────────────────────────────────────────────────────────────
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found-component/not-found-component').then(
        (m) => m.NotFoundComponent,
      ),
    title: '404 | SmileCare Dental',
  },
];

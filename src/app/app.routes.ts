import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Artino Studio Art Academy',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomePage),
  },
  {
    path: 'about',
    title: 'About',
    loadComponent: () => import('./pages/about/about').then((m) => m.AboutPage),
  },
  {
    path: 'courses',
    title: 'Programmes',
    loadComponent: () => import('./pages/courses/courses').then((m) => m.CoursesPage),
  },
  {
    path: 'gallery',
    title: 'Gallery',
    loadComponent: () => import('./pages/gallery/gallery').then((m) => m.GalleryPage),
  },
  {
    path: 'contact',
    title: 'Contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.ContactPage),
  },
  {
    path: 'privacy',
    title: 'Privacy',
    loadComponent: () => import('./pages/privacy/privacy').then((m) => m.PrivacyPage),
  },
  {
    path: 'terms',
    title: 'Terms',
    loadComponent: () => import('./pages/terms/terms').then((m) => m.TermsPage),
  },
  {
    path: '404',
    title: 'Page not found',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
];

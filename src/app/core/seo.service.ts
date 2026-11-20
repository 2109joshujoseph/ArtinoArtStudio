import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE } from './site-data';

export interface Crumb {
  name: string;
  path: string;
}

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string;
  noindex?: boolean;
  crumbs?: Crumb[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly schemaId = 'artino-page-schema';

  setPage(seo: PageSeo): void {
    const url = this.absolute(seo.path);
    const image = this.absolute(seo.image ?? '/images/og-image.jpg');
    const fullTitle = seo.title.includes(SITE.name) ? seo.title : `${seo.title} | ${SITE.name}`;

    this.titleService.setTitle(fullTitle);

    this.setMeta('name', 'description', seo.description);
    this.setMeta('name', 'keywords', seo.keywords ?? 'art classes Kochi, art academy Kerala, drawing classes, painting classes, art portfolio preparation');
    this.setMeta('name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    this.setMeta('name', 'author', SITE.name);

    this.setMeta('property', 'og:type', seo.type ?? 'website');
    this.setMeta('property', 'og:site_name', SITE.name);
    this.setMeta('property', 'og:locale', 'en_IN');
    this.setMeta('property', 'og:title', fullTitle);
    this.setMeta('property', 'og:description', seo.description);
    this.setMeta('property', 'og:url', url);
    this.setMeta('property', 'og:image', image);
    this.setMeta('property', 'og:image:width', '1200');
    this.setMeta('property', 'og:image:height', '630');
    this.setMeta('property', 'og:image:alt', `${SITE.name} — ${SITE.tagline}`);

    this.setMeta('name', 'twitter:card', 'summary_large_image');
    this.setMeta('name', 'twitter:site', '@artinostudio');
    this.setMeta('name', 'twitter:title', fullTitle);
    this.setMeta('name', 'twitter:description', seo.description);
    this.setMeta('name', 'twitter:image', image);
    this.setMeta('name', 'twitter:image:alt', `${SITE.name} — ${SITE.tagline}`);

    this.setCanonical(url);
    this.setSchema(seo);
  }

  /** Adds an additional standalone JSON-LD block (FAQ, course list, etc.). */
  setSchema(seo: PageSeo): void {
    const graph: Record<string, unknown>[] = [];

    if (seo.crumbs?.length) {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${this.absolute(seo.path)}#breadcrumbs`,
        itemListElement: seo.crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: this.absolute(crumb.path),
        })),
      });
    }

    if (seo.jsonLd) {
      if (Array.isArray(seo.jsonLd)) {
        graph.push(...seo.jsonLd);
      } else {
        graph.push(seo.jsonLd);
      }
    }

    const existing = this.document.getElementById(this.schemaId) as HTMLScriptElement | null;

    if (!graph.length) {
      existing?.remove();
      return;
    }

    const script = existing ?? this.document.createElement('script');
    script.id = this.schemaId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });

    if (!existing) {
      this.document.head.appendChild(script);
    }
  }

  private absolute(pathOrUrl: string): string {
    if (/^https?:\/\//i.test(pathOrUrl)) {
      return pathOrUrl;
    }
    const clean = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${SITE.url}${clean}`;
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private setMeta(attribute: 'name' | 'property', key: string, content: string): void {
    const selector = `${attribute}="${key}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attribute]: key, content });
    } else {
      this.meta.addTag({ [attribute]: key, content });
    }
  }
}

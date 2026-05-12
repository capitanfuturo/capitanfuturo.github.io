import { getCollection } from 'astro:content';

export const PAGE_SIZE = 10;

export function postSlug(id: string): string {
  return id.replace(/\/index$/, '');
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => data.published !== false);
  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

export function postExcerpt(body: string | undefined, lines = 5): string {
  if (!body) return '';
  return body
    .split('\n')
    .map(line =>
      line
        .replace(/^#{1,6}\s+/, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
        .replace(/[*_`~>]/g, '')
        .trim()
    )
    .filter(line => line.length > 0)
    .slice(0, lines)
    .join(' ');
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

import { Pipe, PipeTransform } from '@angular/core';

/**
 * TruncatePipe
 * Truncates a string to a given character limit and appends a suffix.
 *
 * Usage in template:
 *   {{ doctor.bio | truncate }}              → truncates at 100 chars with '...'
 *   {{ doctor.bio | truncate:60 }}           → truncates at 60 chars with '...'
 *   {{ doctor.bio | truncate:60:'— read more' }} → custom suffix
 *
 * If text is shorter than limit, it is returned unchanged.
 * Truncation happens at the nearest word boundary to avoid cutting mid-word.
 */
@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit: number = 100, suffix: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;

    // Trim to limit then cut at last space (word boundary)
    const trimmed = value.slice(0, limit);
    const lastSpace = trimmed.lastIndexOf(' ');

    // If no space found, hard-cut at limit
    const cutPoint = lastSpace > 0 ? lastSpace : limit;

    return trimmed.slice(0, cutPoint) + suffix;
  }
}

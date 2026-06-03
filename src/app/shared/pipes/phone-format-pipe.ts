import { Pipe, PipeTransform } from '@angular/core';

/**
 * PhoneFormatPipe
 * Formats Pakistani phone numbers into readable format.
 *
 * Usage in template:
 *   {{ '03001234567'   | phoneFormat }}  → '0300-123-4567'
 *   {{ '+923001234567' | phoneFormat }}  → '+92 300-123-4567'
 *   {{ '923001234567'  | phoneFormat }}  → '+92 300-123-4567'
 */
@Pipe({
  name: 'phoneFormat',
  standalone: true,
  pure: true,
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    // Strip all non-numeric characters except leading +
    const cleaned = value.replace(/[^\d+]/g, '');

    // International format: +92XXXXXXXXXX or 92XXXXXXXXXX
    if (cleaned.startsWith('+92') && cleaned.length === 13) {
      const num = cleaned.slice(3); // remove +92
      return `+92 ${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6)}`;
    }

    if (cleaned.startsWith('92') && cleaned.length === 12) {
      const num = cleaned.slice(2); // remove 92
      return `+92 ${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6)}`;
    }

    // Local format: 03XXXXXXXXX (11 digits)
    if (cleaned.startsWith('0') && cleaned.length === 11) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }

    // Fallback — return as-is if format not recognised
    return value;
  }
}

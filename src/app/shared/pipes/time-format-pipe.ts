import { Pipe, PipeTransform } from '@angular/core';

/**
 * TimeFormatPipe
 * Converts 24-hour time string to 12-hour AM/PM format.
 *
 * Usage in template:
 *   {{ '14:00' | timeFormat }}        → '2:00 PM'
 *   {{ '09:30' | timeFormat }}        → '9:30 AM'
 *   {{ '00:00' | timeFormat }}        → '12:00 AM'
 *   {{ '12:00' | timeFormat }}        → '12:00 PM'
 */
@Pipe({
  name: 'timeFormat',
  standalone: true,
  pure: true, // pure pipe — only recalculates when input changes
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    // Accept both "HH:MM" and "H:MM" formats
    const parts = value.trim().split(':');
    if (parts.length < 2) return value;

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);

    if (isNaN(hours) || isNaN(minutes)) return value;

    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // 0 → 12, 13 → 1, etc.
    const minutesPad = minutes.toString().padStart(2, '0');

    return `${hour12}:${minutesPad} ${period}`;
  }
}

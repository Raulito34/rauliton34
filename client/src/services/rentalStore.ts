import type { RentalBooking } from '../types';

const STORAGE_KEY = 'art-center-rentals';

export function getBookings(): RentalBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addBooking(booking: Omit<RentalBooking, 'id'>): RentalBooking {
  const bookings = getBookings();
  const newBooking: RentalBooking = {
    ...booking,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}

/** Check if a given space has any booking overlapping with [weekStart, weekEnd] */
export function getSpaceStatusForWeek(
  spaceName: string,
  weekStart: Date,
  weekEnd: Date,
): 'available' | 'reviewing' | 'confirmed' {
  const bookings = getBookings();
  for (const b of bookings) {
    if (b.spaceName !== spaceName) continue;
    const bStart = new Date(b.startDate);
    const bEnd = new Date(b.endDate);
    // Check overlap: booking overlaps week if bStart <= weekEnd && bEnd >= weekStart
    if (bStart <= weekEnd && bEnd >= weekStart) {
      return b.status;
    }
  }
  return 'available';
}

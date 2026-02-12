import { api } from './api';
import type { RentalBooking } from '../types';

export async function getBookings(): Promise<RentalBooking[]> {
  return api.getRentals();
}

export async function addBooking(
  booking: Omit<RentalBooking, 'id' | 'createdAt'>,
): Promise<RentalBooking> {
  return api.submitRental(booking as Parameters<typeof api.submitRental>[0]);
}

export async function updateBookingStatus(id: number, status: string): Promise<void> {
  await api.updateRentalStatus(id, status);
}

export async function deleteBooking(id: number): Promise<void> {
  await api.deleteRental(id);
}

/** Check if a given space has any booking overlapping with [weekStart, weekEnd] */
export function getSpaceStatusForWeek(
  bookings: RentalBooking[],
  spaceName: string,
  weekStart: Date,
  weekEnd: Date,
): string {
  for (const b of bookings) {
    if (b.spaceName !== spaceName) continue;
    const bStart = new Date(b.startDate);
    const bEnd = new Date(b.endDate);
    if (bStart <= weekEnd && bEnd >= weekStart) {
      return b.status;
    }
  }
  return 'available';
}

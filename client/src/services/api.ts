import type { Exhibition, Space, RentalPricing, RentalApplication, RentalBooking, NewsItem, ContactForm } from '../types';

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

export function getAdminCode(): string | null {
  return sessionStorage.getItem('adminCode');
}

export function setAdminCode(code: string) {
  sessionStorage.setItem('adminCode', code);
}

export function clearAdminCode() {
  sessionStorage.removeItem('adminCode');
}

function adminHeaders(): Record<string, string> {
  const code = getAdminCode();
  return code ? { 'x-admin-code': code } : {};
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function fetchJsonAdmin<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { ...adminHeaders() },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function postJson<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function patchJson<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...adminHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function deleteJson(url: string): Promise<void> {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'DELETE',
    headers: { ...adminHeaders() },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
}

export const api = {
  getExhibitions: (status?: string) =>
    fetchJson<Exhibition[]>(status ? `/exhibitions?status=${status}` : '/exhibitions'),
  getExhibition: (id: number) => fetchJson<Exhibition>(`/exhibitions/${id}`),
  getSpaces: () => fetchJson<Space[]>('/spaces'),
  getSpace: (floor: string) => fetchJson<Space>(`/spaces/${floor}`),
  getPricing: () => fetchJson<RentalPricing[]>('/pricing'),
  submitRental: (data: RentalApplication) => postJson<RentalBooking>('/rentals', data),
  getRentals: () => fetchJsonAdmin<RentalBooking[]>('/rentals'),
  getRentalStatuses: () => fetchJson<Pick<RentalBooking, 'id' | 'spaceName' | 'startDate' | 'endDate' | 'status'>[]>('/rentals/status'),
  verifyAdmin: (code: string) => postJson<{ ok: boolean }>('/admin/verify', { code }),
  updateRentalStatus: (id: number, status: string) => patchJson<RentalBooking>(`/rentals/${id}`, { status }),
  deleteRental: (id: number) => deleteJson(`/rentals/${id}`),
  getNews: (category?: string) =>
    fetchJson<NewsItem[]>(category ? `/news?category=${category}` : '/news'),
  getNewsItem: (id: number) => fetchJson<NewsItem>(`/news/${id}`),
  submitContact: (data: ContactForm) => postJson('/contact', data),
};

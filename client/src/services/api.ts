import type { Exhibition, Space, RentalPricing, RentalApplication, RentalBooking, NewsItem, ContactForm, SiteImage } from '../types';

// Resolve API_BASE defensively:
//   - If VITE_API_URL is not set → use same-origin '/api' (works via Vercel proxy).
//   - If it's set but missing scheme (e.g. "rauliton34-production.up.railway.app"),
//     prepend https:// so the browser doesn't treat it as a relative path.
function resolveApiBase(): string {
  const raw = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  if (!raw) return '/api';
  const withScheme = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  return `${withScheme.replace(/\/+$/, '')}/api`;
}
const API_BASE = resolveApiBase();

export function getAdminCode(): string | null {
  return sessionStorage.getItem('adminCode');
}

export function setAdminCode(code: string) {
  sessionStorage.setItem('adminCode', code.trim());
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

async function postJsonAdmin<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...adminHeaders() },
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
  createExhibition: (data: Omit<Exhibition, 'id'> & { details?: string }) =>
    postJsonAdmin<Exhibition>('/exhibitions', data),
  updateExhibition: (id: number, data: Partial<Exhibition> & { details?: string }) =>
    patchJson<Exhibition>(`/exhibitions/${id}`, data),
  deleteExhibition: (id: number) => deleteJson(`/exhibitions/${id}`),
  getSpaces: () => fetchJson<Space[]>('/spaces'),
  getSpace: (floor: string) => fetchJson<Space>(`/spaces/${floor}`),
  getPricing: () => fetchJson<RentalPricing[]>('/pricing'),
  submitRental: (data: RentalApplication) => postJson<RentalBooking>('/rentals', data),
  getRentals: () => fetchJsonAdmin<RentalBooking[]>('/rentals'),
  getRentalStatuses: () => fetchJson<Pick<RentalBooking, 'id' | 'spaceName' | 'startDate' | 'endDate' | 'status'>[]>('/rentals/status'),
  lookupRentals: (applicantName: string, email: string) =>
    postJson<RentalBooking[]>('/rentals/lookup', { applicantName, email }),
  cancelRental: (id: number, email: string) =>
    postJson<RentalBooking>(`/rentals/${id}/cancel`, { email }),
  rescheduleRental: (id: number, email: string, startDate: string, endDate: string) =>
    postJson<RentalBooking>(`/rentals/${id}/reschedule`, { email, startDate, endDate }),
  verifyAdmin: (code: string) => postJson<{ ok: boolean }>('/admin/verify', { code: code.trim() }),
  updateRentalStatus: (id: number, status: string) => patchJson<RentalBooking>(`/rentals/${id}`, { status }),
  deleteRental: (id: number) => deleteJson(`/rentals/${id}`),
  getNews: (category?: string) =>
    fetchJson<NewsItem[]>(category ? `/news?category=${category}` : '/news'),
  getNewsItem: (id: number) => fetchJson<NewsItem>(`/news/${id}`),
  createNews: (data: Omit<NewsItem, 'id' | 'createdAt'>) => postJsonAdmin<NewsItem>('/news', data),
  updateNews: (id: number, data: Partial<Omit<NewsItem, 'id' | 'createdAt'>>) =>
    patchJson<NewsItem>(`/news/${id}`, data),
  deleteNews: (id: number) => deleteJson(`/news/${id}`),
  submitContact: (data: ContactForm) => postJson('/contact', data),
  getSiteImages: () => fetchJson<SiteImage[]>('/site-images'),
  updateSiteImage: (key: string, data: { imageUrl?: string; label?: string }) =>
    patchJson<SiteImage>(`/site-images/${key}`, data),
  createSiteImage: (data: { key: string; imageUrl: string; label?: string }) =>
    postJsonAdmin<SiteImage>('/site-images', data),
  deleteSiteImage: (key: string) => deleteJson(`/site-images/${key}`),
};

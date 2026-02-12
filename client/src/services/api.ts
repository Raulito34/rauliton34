import type { Exhibition, Space, RentalPricing, RentalApplication, NewsItem, ContactForm } from '../types';

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`);
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

export const api = {
  getExhibitions: (status?: string) =>
    fetchJson<Exhibition[]>(status ? `/exhibitions?status=${status}` : '/exhibitions'),
  getExhibition: (id: number) => fetchJson<Exhibition>(`/exhibitions/${id}`),
  getSpaces: () => fetchJson<Space[]>('/spaces'),
  getSpace: (floor: string) => fetchJson<Space>(`/spaces/${floor}`),
  getPricing: () => fetchJson<RentalPricing[]>('/pricing'),
  submitRental: (data: RentalApplication) => postJson('/rentals', data),
  getNews: (category?: string) =>
    fetchJson<NewsItem[]>(category ? `/news?category=${category}` : '/news'),
  getNewsItem: (id: number) => fetchJson<NewsItem>(`/news/${id}`),
  submitContact: (data: ContactForm) => postJson('/contact', data),
};

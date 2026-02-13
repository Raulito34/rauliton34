export interface Exhibition {
  id: number;
  title: string;
  artist: string;
  description: string;
  startDate: string;
  endDate: string;
  floor: string;
  imageUrl: string;
  status: 'current' | 'upcoming' | 'past';
}

export interface Space {
  id: number;
  name: string;
  floor: string;
  area: number;
  height: number;
  capacity: number;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface RentalPricing {
  id: number;
  spaceName: string;
  floor: string;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
}

export interface RentalApplication {
  spaceName: string;
  applicantName: string;
  organization: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  purpose: string;
  message: string;
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  category: 'notice' | 'news';
  createdAt: string;
  thumbnail?: string;
}

export interface RentalBooking {
  id: number;
  spaceName: string;
  startDate: string;
  endDate: string;
  status: string;
  applicantName: string;
  organization: string;
  email: string;
  phone: string;
  purpose: string;
  message: string;
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

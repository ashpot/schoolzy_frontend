export type PortfolioRole = "Parent" | "Alumni" | "Student" | "Staff" | "Guardian" | "Community";

export interface Testimonial {
  id: string;
  fullName: string;
  portfolio: PortfolioRole;
  photo?: string;
  comment: string;
  createdAt: string; // e.g. "14 Jan 2025"
}

export type NewsCategory = "News" | "Events" | "Announcements" | "Sports" | "Academic";

export interface NewsPost {
  id: string;
  title: string;
  author: string;
  category: NewsCategory;
  content: string;
  coverPhoto?: string;
  featured: boolean;
  createdAt: string;
}

export interface SchoolSettings {
  name: string;
  motto: string;
  address: string;
  about: string;
  logo?: string;
  phone: string;
  email: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
}
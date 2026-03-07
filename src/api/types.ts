// Base API response type
export interface ApiResponse<T> {
  data: T;
}

// Offers/Brands types
export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  models: CarModel[];
}

export interface CarModel {
  id: number;
  name: string;
  offers: string[];
}

export interface OffersData {
  brands: Brand[];
}

export interface Inquiry {
  id?: number;
  brand: string;
  model: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  created_at?: string;
}

// Events types
export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string | null;
  date: string;
  time: string;
  location: string;
  registrationLink: string;
  isRegistrationOpen: boolean;
  order: number;
  isActive: boolean;
  gallery?: string[];
}

export interface EventGalleryImage {
  id: number;
  image: string;
  order: number;
}

// Homepage types
export interface PartnerBrand {
  id: number;
  name: string;
  logo: string;
  order: number;
  is_active: boolean;
}

// Services types
export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  thumbnail: string | null;
  path: string;
  fullSpecs?: string;
  detailedImages?: string[];
}

export interface ServiceImage {
  id: number;
  image: string;
  order: number;
}

// FAQ types
export interface FAQ {
  id: string;
  q: string;
  a: string;
}

// Projects types
export interface ProjectTestimonial {
  content: string;
  name: string;
  designation: string;
  stars: number;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  oldImage: string | null;
  newImage: string | null;
  path: string;
  category: string;
  testimonial?: ProjectTestimonial;
  created_at?: string;
  updated_at?: string;
}

// Why Us types
export interface WhyUsFeature {
  id: string;
  title: string;
  description: string;
  image: string | null;
  order: number;
  is_active: boolean;
}

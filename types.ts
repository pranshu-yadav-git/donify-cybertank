import React from 'react';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[]; // Changed from imageUrl: string
  goal: number;
  raised: number;
  donors: number;
  category: 'Medical' | 'Education' | 'Environment' | 'Disaster Relief' | 'Children' | 'Elderly' | 'Animals' | 'Women Empowerment';
  creatorType: 'individual' | 'ngo';
  organizer: {
    name: string; // Individual name or NGO contact person
    avatarUrl: string;
    ngoDetails?: {
      name: string;
      phone: string;
      email: string;
      address: string;
    }
  };
  verified: boolean;
  urgency: 'High' | 'Medium' | 'Low';
  location: string;
  updates: { date: string; title: string; content: string }[];
  comments: { name: string; avatarUrl: string; comment: string }[];
  isCompleted?: boolean; // Added completion status
}

export interface Testimonial {
  name: string;
  role: 'Donor' | 'Recipient';
  quote: string;
  avatarUrl: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatarUrl: string;
  donations: number;
  total: number;
  verified?: boolean;
  totalDonatedThisMonth?: number;
  donationHistory?: AuthUser['donationHistory'];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AuthUser {
  userType: 'individual' | 'ngo';
  name: string; // Individual name or Contact Person name for NGO
  email: string;
  ngoName?: string;
  phone?: string;
  address?: string;
  pan?: string;
  aadhaar?: string;
  totalDonatedThisMonth: number;
  donationHistory: { campaignId: string; campaignTitle: string; amount: number; date: Date }[];
  verified: boolean;
}

export interface LocationRequest {
  id: number;
  type: 'donor' | 'recipient';
  title: string;
  description: string;
  position: { lat: number; lng: number };
  name: string;
  email: string;
  phone: string;
  imageUrl?: string;
  address?: string;
  verified?: boolean;
}

export interface ChatbotMessage {
  id: number;
  text: string | React.ReactNode;
  sender: 'bot' | 'user';
  options?: { text: string, payload: string }[];
}
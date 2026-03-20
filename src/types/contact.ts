import type { EnrichProfile } from "./common.js";

// ── Reverse Email Lookup ──

export interface ReverseEmailParams {
  email: string;
  lookup_depth?: "superficial" | "deep";
  enrich_profile?: EnrichProfile;
}

// ── Reverse Phone Lookup ──

export interface ReversePhoneParams {
  phone_number: string;
}

// ── Work Email Lookup ──

export interface WorkEmailParams {
  profile_url: string;
  callback_url?: string;
}

// ── Personal Contact ──

export interface PersonalContactParams {
  profile_url?: string;
  twitter_profile_url?: string;
  facebook_profile_url?: string;
  page_size?: string;
}

// ── Personal Email ──

export interface PersonalEmailParams {
  profile_url?: string;
  twitter_profile_url?: string;
  facebook_profile_url?: string;
  email_validation?: "none" | "fast" | "precise";
  page_size?: string;
}

// ── Disposable Email ──

export interface DisposableEmailParams {
  email: string;
}

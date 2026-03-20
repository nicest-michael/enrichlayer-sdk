import type { CachePolicy, EnrichProfile, IncludeExclude } from "./common.js";

// ── Person Profile ──

export interface PersonProfileParams {
  profile_url?: string;
  twitter_profile_url?: string;
  facebook_profile_url?: string;
  extra?: IncludeExclude;
  personal_contact_number?: IncludeExclude;
  personal_email?: IncludeExclude;
  skills?: IncludeExclude;
  use_cache?: CachePolicy;
}

// ── Person Lookup ──

export interface PersonLookupParams {
  first_name: string;
  company_domain: string;
  last_name?: string;
  title?: string;
  location?: string;
  similarity_checks?: "include" | "skip";
  enrich_profile?: EnrichProfile;
}

// ── Person Picture ──

export interface PersonPictureParams {
  person_profile_url: string;
}

// ── Role Lookup ──

export interface RoleLookupParams {
  company_name: string;
  role: string;
  enrich_profile?: EnrichProfile;
}

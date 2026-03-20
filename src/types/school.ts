import type { CachePolicy, EnrichProfile, BooleanString } from "./common.js";

// ── School Profile ──

export interface SchoolProfileParams {
  url: string;
  use_cache?: CachePolicy;
  live_fetch?: "default" | "force";
}

// ── Student Listing ──

export interface StudentListParams {
  school_url: string;
  boolean_search_keyword?: string;
  country?: string;
  enrich_profiles?: EnrichProfile;
  page_size?: string;
  resolve_numeric_id?: BooleanString;
  sort_by?: "recently-matriculated" | "recently-graduated" | "none";
  student_status?: "current" | "past" | "all";
}

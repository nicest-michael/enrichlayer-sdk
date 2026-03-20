import type {
  CachePolicy,
  EnrichProfile,
  IncludeExclude,
  BooleanString,
  EmploymentStatus,
} from "./common.js";

// ── Company Profile ──

export interface CompanyProfileParams {
  url: string;
  categories?: IncludeExclude;
  funding_data?: IncludeExclude;
  exit_data?: IncludeExclude;
  acquisitions?: IncludeExclude;
  extra?: IncludeExclude;
  use_cache?: CachePolicy;
}

// ── Company Lookup ──

export interface CompanyLookupParams {
  company_name?: string;
  company_domain?: string;
  company_location?: string;
  enrich_profile?: EnrichProfile;
}

// ── Company ID Lookup ──

export interface CompanyIdLookupParams {
  id: string;
}

// ── Company Picture ──

export interface CompanyPictureParams {
  company_profile_url: string;
}

// ── Employee Listing ──

export interface EmployeeListParams {
  url: string;
  boolean_role_search?: string;
  coy_name_match?: IncludeExclude;
  country?: string;
  employment_status?: EmploymentStatus;
  enrich_profiles?: EnrichProfile;
  page_size?: string;
  resolve_numeric_id?: BooleanString;
  sort_by?: "recently-joined" | "recently-left" | "oldest" | "none";
  use_cache?: CachePolicy;
}

// ── Employee Count ──

export interface EmployeeCountParams {
  url: string;
  at_date?: string;
  coy_name_match?: IncludeExclude;
  employment_status?: EmploymentStatus;
  estimated_employee_count?: IncludeExclude;
  use_cache?: CachePolicy;
}

// ── Employee Search ──

export interface EmployeeSearchParams {
  company_profile_url: string;
  keyword_boolean: string;
  country?: string;
  enrich_profiles?: EnrichProfile;
  page_size?: string;
  resolve_numeric_id?: BooleanString;
}

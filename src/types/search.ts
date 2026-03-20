import type { CachePolicy, EnrichProfile } from "./common.js";

// ── Company Search ──

export interface CompanySearchParams {
  country?: string;
  region?: string;
  city?: string;
  type?:
    | "EDUCATIONAL"
    | "GOVERNMENT_AGENCY"
    | "NON_PROFIT"
    | "PARTNERSHIP"
    | "PRIVATELY_HELD"
    | "PUBLIC_COMPANY"
    | "SELF_EMPLOYED"
    | "SELF_OWNED";
  follower_count_min?: string;
  follower_count_max?: string;
  name?: string;
  industry?: string;
  primary_industry?: string;
  specialities?: string;
  employee_count_category?:
    | "custom"
    | "startup"
    | "small"
    | "medium"
    | "large"
    | "enterprise";
  employee_count_min?: string;
  employee_count_max?: string;
  description?: string;
  founded_after_year?: string;
  founded_before_year?: string;
  funding_amount_min?: string;
  funding_amount_max?: string;
  funding_raised_after?: string;
  funding_raised_before?: string;
  page_size?: string;
  enrich_profiles?: EnrichProfile;
  use_cache?: CachePolicy;
}

// ── Person Search ──

export interface PersonSearchParams {
  country: string;
  first_name?: string;
  last_name?: string;
  education_field_of_study?: string;
  education_degree_name?: string;
  education_school_name?: string;
  education_school_profile_url?: string;
  current_role_title?: string;
  past_role_title?: string;
  current_role_before?: string;
  current_role_after?: string;
  current_company_profile_url?: string;
  past_company_profile_url?: string;
  current_job_description?: string;
  past_job_description?: string;
  current_company_name?: string;
  past_company_name?: string;
  groups?: string;
  languages?: string;
  region?: string;
  city?: string;
  headline?: string;
  summary?: string;
  industries?: string;
  interests?: string;
  skills?: string;
}

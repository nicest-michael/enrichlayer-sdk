// ── Job Profile ──

export interface JobProfileParams {
  url: string;
}

// ── Job Search ──

export interface JobSearchParams {
  search_id?: string;
  job_type?:
    | "full-time"
    | "part-time"
    | "contract"
    | "internship"
    | "temporary"
    | "volunteer"
    | "anything";
  experience_level?:
    | "internship"
    | "entry_level"
    | "associate"
    | "mid_senior_level"
    | "director"
    | "anything";
  when?: "yesterday" | "past-week" | "past-month" | "anytime";
  flexibility?: "remote" | "on-site" | "hybrid" | "anything";
  geo_id?: string;
  keyword?: string;
}

// ── Job Count ──

export interface JobCountParams {
  search_id?: string;
  job_type?:
    | "full-time"
    | "part-time"
    | "contract"
    | "internship"
    | "temporary"
    | "volunteer"
    | "anything";
  experience_level?:
    | "internship"
    | "entry_level"
    | "associate"
    | "mid_senior_level"
    | "director"
    | "anything";
  when?: "yesterday" | "past-week" | "past-month" | "anytime";
  flexibility?: "remote" | "on-site" | "hybrid" | "anything";
  geo_id?: string;
  keyword?: string;
}

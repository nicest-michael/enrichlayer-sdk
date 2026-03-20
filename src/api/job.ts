import type { ApiClient } from "../client.js";
import { ENDPOINTS } from "../endpoints.js";
import type {
  JobProfileParams,
  JobSearchParams,
  JobCountParams,
} from "../types/job.js";

export class JobApi {
  constructor(private client: ApiClient) {}

  /** Get structured data of a job posting. Cost: 2 credits. */
  async profile(params: JobProfileParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.JOB_PROFILE, params);
  }

  /** Search for job postings by company, type, experience level, and more. Cost: 2 credits. */
  async search(params: JobSearchParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.JOB_SEARCH, params);
  }

  /** Get the number of job postings matching your criteria. Cost: 2 credits. */
  async count(params: JobCountParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.JOB_COUNT, params);
  }
}

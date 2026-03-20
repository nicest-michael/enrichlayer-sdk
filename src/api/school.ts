import type { ApiClient } from "../client.js";
import { ENDPOINTS } from "../endpoints.js";
import type {
  SchoolProfileParams,
  StudentListParams,
} from "../types/school.js";

export class SchoolApi {
  constructor(private client: ApiClient) {}

  /** Get structured school profile data. Cost: 1 credit. */
  async profile(params: SchoolProfileParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.SCHOOL_PROFILE, params);
  }

  /** List students of a school. Cost: 3 credits per student returned. */
  async students(params: StudentListParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.STUDENT_LISTING, params);
  }
}

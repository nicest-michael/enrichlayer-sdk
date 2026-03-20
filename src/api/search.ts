import type { ApiClient } from "../client.js";
import { ENDPOINTS } from "../endpoints.js";
import type {
  CompanySearchParams,
  PersonSearchParams,
} from "../types/search.js";

export class SearchApi {
  constructor(private client: ApiClient) {}

  /** Search companies by location, industry, size, funding, and more. Cost: 3 credits per URL returned. */
  async companies(params: CompanySearchParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.COMPANY_SEARCH, params);
  }

  /** Search people by name, location, education, role, company, and more. Cost: 3 credits per URL returned. */
  async people(params: PersonSearchParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.PERSON_SEARCH, params);
  }
}

import type { ApiClient } from "../client.js";
import { ENDPOINTS } from "../endpoints.js";
import type {
  CompanyProfileParams,
  CompanyLookupParams,
  CompanyIdLookupParams,
  CompanyPictureParams,
  EmployeeListParams,
  EmployeeCountParams,
  EmployeeSearchParams,
} from "../types/company.js";

export class CompanyApi {
  constructor(private client: ApiClient) {}

  /** Get structured company profile data from a professional network URL. Cost: 1 credit base. */
  async profile(params: CompanyProfileParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.COMPANY_PROFILE, params);
  }

  /** Look up a company by name or domain. Provide at least one of company_name or company_domain. Cost: 2 credits. */
  async resolve(params: CompanyLookupParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.COMPANY_LOOKUP, params);
  }

  /** Look up a company by its internal numeric ID. Cost: 0 credits. */
  async resolveById(params: CompanyIdLookupParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.COMPANY_ID_LOOKUP, params);
  }

  /** Get the profile picture URL of a company. Cost: 0 credits. */
  async picture(params: CompanyPictureParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.COMPANY_PICTURE, params);
  }

  /** List employees of a company. Cost: 3 credits per employee returned. */
  async employees(params: EmployeeListParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.EMPLOYEE_LISTING, params);
  }

  /** Get the number of employees at a company. Cost: 1 credit. */
  async employeeCount(params: EmployeeCountParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.EMPLOYEE_COUNT, params);
  }

  /** Search employees by keyword at a specific company. Cost: 10 credits. */
  async employeeSearch(params: EmployeeSearchParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.EMPLOYEE_SEARCH, params);
  }
}

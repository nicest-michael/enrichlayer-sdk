import { ApiClient } from "../client.js";
import { ENDPOINTS } from "../endpoints.js";
import {
  mapCompany,
  mapPerson,
  mapProspectorResult,
  mapNameToDomain,
} from "./mappers.js";
import type {
  ClearbitCompany,
  ClearbitPerson,
  ClearbitProspectorResponse,
  ClearbitNameToDomainResponse,
} from "./clearbit-types.js";

export interface ClearbitCompatOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}

/**
 * Drop-in compatible replacement for the deprecated `clearbit` npm package.
 *
 * ```ts
 * // Before: const clearbit = require('clearbit')('api_key');
 * // After:
 * import { ClearbitCompat } from '@enrichlayer/sdk/compat';
 * const clearbit = new ClearbitCompat({ apiKey: 'your-enrichlayer-key' });
 *
 * const company = await clearbit.Company.find({ domain: 'uber.com' });
 * const person = await clearbit.Person.find({ email: 'alex@uber.com' });
 * ```
 */
export class ClearbitCompat {
  readonly Company: CompanyNamespace;
  readonly Person: PersonNamespace;
  readonly Prospector: ProspectorNamespace;
  readonly NameToDomain: NameToDomainNamespace;

  constructor(options: ClearbitCompatOptions) {
    const client = new ApiClient(options);
    this.Company = new CompanyNamespace(client);
    this.Person = new PersonNamespace(client);
    this.Prospector = new ProspectorNamespace(client);
    this.NameToDomain = new NameToDomainNamespace(client);
  }
}

// ── Company ──

class CompanyNamespace {
  constructor(private client: ApiClient) {}

  /**
   * Find a company by domain.
   * Maps to Enrich Layer's company/resolve + company profile.
   */
  async find(params: { domain: string }): Promise<ClearbitCompany> {
    const resolved = (await this.client.request(ENDPOINTS.COMPANY_LOOKUP, {
      company_domain: params.domain,
      enrich_profile: "enrich",
    })) as Record<string, unknown>;

    return mapCompany(resolved);
  }
}

// ── Person ──

class PersonNamespace {
  constructor(private client: ApiClient) {}

  /**
   * Find a person by email.
   * Maps to Enrich Layer's reverse email lookup with enrichment.
   */
  async find(params: { email: string }): Promise<ClearbitPerson> {
    const resolved = (await this.client.request(
      ENDPOINTS.REVERSE_EMAIL_LOOKUP,
      {
        email: params.email,
        lookup_depth: "deep",
        enrich_profile: "enrich",
      },
    )) as Record<string, unknown>;

    return mapPerson(resolved, params.email);
  }
}

// ── Prospector ──

class ProspectorNamespace {
  constructor(private client: ApiClient) {}

  /**
   * Search for people at a company.
   * Maps to Enrich Layer's employee listing endpoint.
   */
  async search(params: {
    domain: string;
    role?: string;
    page?: number;
    page_size?: number;
  }): Promise<ClearbitProspectorResponse> {
    // First resolve the company to get its URL
    const resolved = (await this.client.request(ENDPOINTS.COMPANY_LOOKUP, {
      company_domain: params.domain,
    })) as Record<string, unknown>;

    const companyUrl = resolved.url as string | undefined;
    if (!companyUrl) {
      return { page: 1, page_size: 0, total: 0, results: [] };
    }

    const pageSize = params.page_size ?? 10;

    // Search employees with optional role filter
    const employeeParams: Record<string, string | undefined> = {
      url: companyUrl,
      enrich_profiles: "enrich",
      page_size: String(pageSize),
    };
    if (params.role) {
      employeeParams.boolean_role_search = params.role;
    }

    const employees = (await this.client.request(
      ENDPOINTS.EMPLOYEE_LISTING,
      employeeParams,
    )) as Record<string, unknown>;

    const employeeList = (employees.employees ??
      employees.results ??
      []) as Record<string, unknown>[];

    const results = employeeList.map(mapProspectorResult);

    // Try to get total count
    let total = results.length;
    if (employees.total_result_count !== undefined) {
      total = employees.total_result_count as number;
    }

    return {
      page: params.page ?? 1,
      page_size: pageSize,
      total,
      results,
    };
  }
}

// ── Name to Domain ──

class NameToDomainNamespace {
  constructor(private client: ApiClient) {}

  /**
   * Find a company's domain by name.
   * Maps to Enrich Layer's company resolve endpoint.
   */
  async find(params: {
    name: string;
  }): Promise<ClearbitNameToDomainResponse> {
    const resolved = (await this.client.request(ENDPOINTS.COMPANY_LOOKUP, {
      company_name: params.name,
      enrich_profile: "enrich",
    })) as Record<string, unknown>;

    return mapNameToDomain(resolved);
  }
}

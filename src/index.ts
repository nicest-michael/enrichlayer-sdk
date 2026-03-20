import { ApiClient, EnrichLayerError } from "./client.js";
import type { ClientOptions } from "./client.js";
import { CompanyApi } from "./api/company.js";
import { PersonApi } from "./api/person.js";
import { ContactApi } from "./api/contact.js";
import { SearchApi } from "./api/search.js";
import { SchoolApi } from "./api/school.js";
import { JobApi } from "./api/job.js";
import { MetaApi } from "./api/meta.js";

export interface EnrichLayerOptions {
  /** Your Enrich Layer API key. Get one at https://enrichlayer.com/dashboard */
  apiKey: string;
  /** Override the base URL (default: https://enrichlayer.com) */
  baseUrl?: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeoutMs?: number;
}

export class EnrichLayer {
  readonly company: CompanyApi;
  readonly person: PersonApi;
  readonly contact: ContactApi;
  readonly search: SearchApi;
  readonly school: SchoolApi;
  readonly job: JobApi;
  readonly meta: MetaApi;

  constructor(options: EnrichLayerOptions) {
    const client = new ApiClient(options);
    this.company = new CompanyApi(client);
    this.person = new PersonApi(client);
    this.contact = new ContactApi(client);
    this.search = new SearchApi(client);
    this.school = new SchoolApi(client);
    this.job = new JobApi(client);
    this.meta = new MetaApi(client);
  }
}

// Re-export everything
export { EnrichLayerError } from "./client.js";
export type { ClientOptions } from "./client.js";

// Type re-exports
export type * from "./types/common.js";
export type * from "./types/company.js";
export type * from "./types/person.js";
export type * from "./types/contact.js";
export type * from "./types/search.js";
export type * from "./types/school.js";
export type * from "./types/job.js";

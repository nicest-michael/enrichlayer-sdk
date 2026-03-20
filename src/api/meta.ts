import type { ApiClient } from "../client.js";
import { ENDPOINTS } from "../endpoints.js";

export class MetaApi {
  constructor(private client: ApiClient) {}

  /** Get your current Enrich Layer credit balance. Cost: 0 credits. */
  async creditBalance(): Promise<unknown> {
    return this.client.request(ENDPOINTS.CREDIT_BALANCE);
  }
}

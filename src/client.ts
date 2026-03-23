const BASE_URL = "https://enrichlayer.com";
const DEFAULT_TIMEOUT_MS = 30_000;

/** Converts a typed params interface to a plain string record for query string building */
function toQueryRecord(params: object): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      result[key] = String(value);
    }
  }
  return result;
}

export interface ClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}

export class ApiClient {
  private apiKey: string;
  private baseUrl: string;
  private timeoutMs: number;

  constructor(options: ClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? BASE_URL;
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  }

  async request<T = unknown>(
    path: string,
    params: object = {},
  ): Promise<T> {
    const record = toQueryRecord(params);
    const qs = new URLSearchParams();
    for (const [key, value] of Object.entries(record)) {
      if (value !== undefined && value !== "") {
        qs.set(key, String(value));
      }
    }

    const url = `${this.baseUrl}${path}${qs.toString() ? `?${qs.toString()}` : ""}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      const body = await response.text();

      if (!response.ok) {
        let detail: string;
        try {
          const parsed = JSON.parse(body);
          detail = parsed.message || parsed.error || parsed.description || body;
        } catch {
          // Non-JSON response (e.g. Cloudflare HTML error page) — extract a clean message
          detail = response.statusText || `HTTP ${response.status}`;
        }
        throw new EnrichLayerError(
          `Enrich Layer API error ${response.status}: ${detail}`,
          response.status,
        );
      }

      return JSON.parse(body) as T;
    } catch (error) {
      if (error instanceof EnrichLayerError) throw error;
      if (error instanceof Error && error.name === "AbortError") {
        throw new EnrichLayerError(
          `Enrich Layer API request timed out after ${this.timeoutMs / 1000}s`,
          408,
        );
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}

export class EnrichLayerError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "EnrichLayerError";
    this.status = status;
  }
}

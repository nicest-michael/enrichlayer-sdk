import type { ApiClient } from "../client.js";
import { ENDPOINTS } from "../endpoints.js";
import type {
  ReverseEmailParams,
  ReversePhoneParams,
  WorkEmailParams,
  PersonalContactParams,
  PersonalEmailParams,
  DisposableEmailParams,
} from "../types/contact.js";

export class ContactApi {
  constructor(private client: ApiClient) {}

  /** Look up a person's profile by email address. Cost: 3 credits. */
  async reverseEmail(params: ReverseEmailParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.REVERSE_EMAIL_LOOKUP, params);
  }

  /** Look up a person's profile by phone number (E.164 format). Cost: 3 credits. */
  async reversePhone(params: ReversePhoneParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.REVERSE_PHONE_LOOKUP, params);
  }

  /** Get the work email of a person from their profile URL. Cost: 3 credits. */
  async workEmail(params: WorkEmailParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.WORK_EMAIL_LOOKUP, params);
  }

  /** Get personal contact phone numbers. Cost: 1 credit per number. */
  async personalContact(params: PersonalContactParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.PERSONAL_CONTACT, params);
  }

  /** Get personal email addresses. Cost: 1 credit per email. */
  async personalEmail(params: PersonalEmailParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.PERSONAL_EMAIL, params);
  }

  /** Check if an email is from a disposable email provider. Cost: 0 credits. */
  async disposableEmail(params: DisposableEmailParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.DISPOSABLE_EMAIL, params);
  }
}

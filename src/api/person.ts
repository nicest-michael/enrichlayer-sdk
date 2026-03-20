import type { ApiClient } from "../client.js";
import { ENDPOINTS } from "../endpoints.js";
import type {
  PersonProfileParams,
  PersonLookupParams,
  PersonPictureParams,
  RoleLookupParams,
} from "../types/person.js";

export class PersonApi {
  constructor(private client: ApiClient) {}

  /** Get structured person profile data. Provide one of: profile_url, twitter_profile_url, facebook_profile_url. Cost: 1 credit base. */
  async profile(params: PersonProfileParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.PERSON_PROFILE, params);
  }

  /** Look up a person by first name and company domain. Cost: 2 credits. */
  async resolve(params: PersonLookupParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.PERSON_LOOKUP, params);
  }

  /** Get the profile picture URL of a person. Cost: 0 credits. */
  async picture(params: PersonPictureParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.PERSON_PICTURE, params);
  }

  /** Look up a person by their role at a company. Cost: 3 credits. */
  async roleLookup(params: RoleLookupParams): Promise<unknown> {
    return this.client.request(ENDPOINTS.ROLE_LOOKUP, params);
  }
}

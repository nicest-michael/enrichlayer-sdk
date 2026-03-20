import type {
  ClearbitCompany,
  ClearbitPerson,
  ClearbitProspectorResult,
  ClearbitNameToDomainResponse,
} from "./clearbit-types.js";

// ── Helpers ──

function extractDomain(url: string | undefined | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function linkedinHandle(
  universalNameId?: string | null,
  profileUrl?: string | null,
): string | null {
  if (universalNameId) return universalNameId;
  if (!profileUrl) return null;
  const match = profileUrl.match(
    /linkedin\.com\/(?:in|company)\/([^/?#]+)/,
  );
  return match?.[1] ?? null;
}

function formatEmployeesRange(
  companySize?: (string | number)[] | null,
): string | null {
  if (!companySize || !Array.isArray(companySize) || companySize.length < 2)
    return null;
  return `${companySize[0]}-${companySize[1]}`;
}

// ── Company Mapper ──

export function mapCompany(el: Record<string, unknown>): ClearbitCompany {
  const profile = (el.profile ?? el) as Record<string, unknown>;
  const hq = (profile.hq ?? {}) as Record<string, unknown>;

  return {
    id: (profile.universal_name_id as string) ?? null,
    name: (profile.name as string) ?? null,
    domain: extractDomain(profile.website as string | undefined),
    description: (profile.description as string) ?? null,
    url: (profile.website as string) ?? null,
    logo: (profile.profile_pic_url as string) ?? null,
    foundedYear:
      typeof profile.founded_year === "number"
        ? profile.founded_year
        : null,
    tags: Array.isArray(profile.specialities) ? profile.specialities : [],
    category: {
      industry: (profile.industry as string) ?? null,
      sector: null, // not directly available
      industryGroup: null,
      subIndustry: null,
    },
    metrics: {
      employees:
        typeof profile.company_size_on_linkedin === "number"
          ? profile.company_size_on_linkedin
          : null,
      employeesRange: formatEmployeesRange(
        profile.company_size as (string | number)[] | null,
      ),
      raised: null,
      annualRevenue: null,
      estimatedAnnualRevenue: null,
    },
    geo: {
      streetNumber: null,
      streetName: null,
      subPremise: null,
      city: (hq.city as string) ?? null,
      state: (hq.state as string) ?? null,
      stateCode: null,
      postalCode: (hq.postal_code as string) ?? null,
      country: (hq.country as string) ?? null,
      countryCode: null,
      lat: null,
      lng: null,
    },
    legal: {
      legalName: null,
    },
    social: {
      linkedin: {
        handle: linkedinHandle(
          profile.universal_name_id as string | null,
        ),
      },
      twitter: { handle: null },
      facebook: { handle: null },
    },
    tech: [],
    parent: { domain: null },
  };
}

// ── Person Mapper ──

export function mapPerson(
  el: Record<string, unknown>,
  email?: string,
): ClearbitPerson {
  const profile = (el.profile ?? el) as Record<string, unknown>;
  const firstName = (profile.first_name as string) ?? null;
  const lastName = (profile.last_name as string) ?? null;
  const fullName =
    firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName ?? lastName;

  // Current experience
  const experiences = (profile.experiences ??
    profile.experience) as Record<string, unknown>[] | undefined;
  const current = experiences?.[0] as Record<string, unknown> | undefined;

  const profileUrl = (profile.profile_pic_url ?? profile.url) as
    | string
    | undefined;

  return {
    id: null,
    avatar: (profile.profile_pic_url as string) ?? null,
    bio:
      (profile.summary as string) ??
      (profile.headline as string) ??
      null,
    site: null,
    name: {
      fullName: fullName,
      givenName: firstName,
      familyName: lastName,
    },
    email: email ?? null,
    gender: (profile.gender as string) ?? null,
    location: (profile.city as string) ?? (profile.country as string) ?? null,
    geo: {
      city: (profile.city as string) ?? null,
      state: (profile.state as string) ?? null,
      stateCode: null,
      country: (profile.country as string) ?? null,
      countryCode: (profile.country as string) ?? null,
      lat: null,
      lng: null,
    },
    employment: {
      domain: current
        ? extractDomain(
            current.company_linkedin_profile_url as string | undefined,
          )
        : null,
      name: (current?.company as string) ?? null,
      title: (current?.title as string) ?? null,
      role: null,
      seniority: null,
    },
    social: {
      linkedin: {
        handle: linkedinHandle(
          null,
          profileUrl,
        ),
      },
      twitter: { handle: null },
      facebook: { handle: null },
    },
  };
}

// ── Prospector Result Mapper ──

export function mapProspectorResult(
  el: Record<string, unknown>,
): ClearbitProspectorResult {
  const firstName = (el.first_name as string) ?? null;
  const lastName = (el.last_name as string) ?? null;
  const fullName =
    firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName ?? lastName;

  return {
    id: null,
    name: {
      fullName,
      givenName: firstName,
      familyName: lastName,
    },
    title: (el.headline as string) ?? (el.title as string) ?? null,
    role: null,
    seniority: null,
    email: (el.email as string) ?? null,
  };
}

// ── Name to Domain Mapper ──

export function mapNameToDomain(
  el: Record<string, unknown>,
): ClearbitNameToDomainResponse {
  const profile = (el.profile ?? el) as Record<string, unknown>;
  return {
    domain: extractDomain(profile.website as string | undefined),
    logo: (profile.profile_pic_url as string) ?? null,
    name: (profile.name as string) ?? null,
  };
}

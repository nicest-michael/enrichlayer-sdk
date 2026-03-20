// Clearbit-compatible response shapes
// These match the field names/structure of the deprecated `clearbit` npm package

export interface ClearbitCompany {
  id: string | null;
  name: string | null;
  domain: string | null;
  description: string | null;
  url: string | null;
  logo: string | null;
  foundedYear: number | null;
  tags: string[];
  category: {
    industry: string | null;
    sector: string | null;
    industryGroup: string | null;
    subIndustry: string | null;
  };
  metrics: {
    employees: number | null;
    employeesRange: string | null;
    raised: number | null;
    annualRevenue: number | null;
    estimatedAnnualRevenue: string | null;
  };
  geo: {
    streetNumber: string | null;
    streetName: string | null;
    subPremise: string | null;
    city: string | null;
    state: string | null;
    stateCode: string | null;
    postalCode: string | null;
    country: string | null;
    countryCode: string | null;
    lat: number | null;
    lng: number | null;
  };
  legal: {
    legalName: string | null;
  };
  social: {
    linkedin: { handle: string | null };
    twitter: { handle: string | null };
    facebook: { handle: string | null };
  };
  tech: string[];
  parent: { domain: string | null };
}

export interface ClearbitPerson {
  id: string | null;
  avatar: string | null;
  bio: string | null;
  site: string | null;
  name: {
    fullName: string | null;
    givenName: string | null;
    familyName: string | null;
  };
  email: string | null;
  gender: string | null;
  location: string | null;
  geo: {
    city: string | null;
    state: string | null;
    stateCode: string | null;
    country: string | null;
    countryCode: string | null;
    lat: number | null;
    lng: number | null;
  };
  employment: {
    domain: string | null;
    name: string | null;
    title: string | null;
    role: string | null;
    seniority: string | null;
  };
  social: {
    linkedin: { handle: string | null };
    twitter: { handle: string | null };
    facebook: { handle: string | null };
  };
}

export interface ClearbitProspectorResult {
  id: string | null;
  name: {
    fullName: string | null;
    givenName: string | null;
    familyName: string | null;
  };
  title: string | null;
  role: string | null;
  seniority: string | null;
  email: string | null;
}

export interface ClearbitProspectorResponse {
  page: number;
  page_size: number;
  total: number;
  results: ClearbitProspectorResult[];
}

export interface ClearbitNameToDomainResponse {
  domain: string | null;
  logo: string | null;
  name: string | null;
}

# @enrichlayer/sdk

Official Node.js SDK for the [Enrich Layer](https://enrichlayer.com) API — company, person, and contact enrichment with a Clearbit-compatible drop-in replacement.

## Install

```bash
npm install @enrichlayer/sdk
```

Requires Node.js 18+ (uses native `fetch`). Zero runtime dependencies.

## Quick Start

```typescript
import { EnrichLayer } from '@enrichlayer/sdk';

const el = new EnrichLayer({ apiKey: 'your-api-key' });

const company = await el.company.resolve({ company_domain: 'microsoft.com' });
console.log(company);
```

## Native API

### Company (7 endpoints)

```typescript
// Look up company by name or domain (2 credits)
const resolved = await el.company.resolve({ company_domain: 'microsoft.com' });

// Get full company profile (1 credit)
const profile = await el.company.profile({ url: resolved.url });

// Look up company by numeric ID (0 credits)
const byId = await el.company.resolveById({ id: '1441' });

// Get company profile picture (0 credits)
const pic = await el.company.picture({ company_profile_url: resolved.url });

// List employees (3 credits per employee)
const employees = await el.company.employees({ url: resolved.url, page_size: '10' });

// Get employee count (1 credit)
const count = await el.company.employeeCount({ url: resolved.url });

// Search employees by keyword (10 credits)
const search = await el.company.employeeSearch({
  company_profile_url: resolved.url,
  keyword_boolean: 'ceo OR cto',
});
```

### Person (4 endpoints)

```typescript
// Get person profile (1 credit)
const person = await el.person.profile({
  profile_url: 'https://linkedin.com/in/satya-nadella',
});

// Look up person by name + company (2 credits)
const resolved = await el.person.resolve({
  first_name: 'Satya',
  company_domain: 'microsoft.com',
});

// Get person profile picture (0 credits)
const pic = await el.person.picture({
  person_profile_url: 'https://linkedin.com/in/satya-nadella',
});

// Find who holds a role at a company (3 credits)
const ceo = await el.person.roleLookup({ company_name: 'enrichlayer', role: 'ceo' });
```

### Contact (6 endpoints)

```typescript
// Reverse email lookup (3 credits)
const fromEmail = await el.contact.reverseEmail({ email: 'satya@microsoft.com' });

// Reverse phone lookup (3 credits)
const fromPhone = await el.contact.reversePhone({ phone_number: '+14155552671' });

// Get work email from profile URL (3 credits)
const workEmail = await el.contact.workEmail({
  profile_url: 'https://linkedin.com/in/satya-nadella',
});

// Get personal phone numbers (1 credit per number)
const phones = await el.contact.personalContact({
  profile_url: 'https://linkedin.com/in/satya-nadella',
});

// Get personal emails (1 credit per email)
const emails = await el.contact.personalEmail({
  profile_url: 'https://linkedin.com/in/satya-nadella',
});

// Check if email is disposable (0 credits)
const check = await el.contact.disposableEmail({ email: 'test@mailinator.com' });
```

### Search (2 endpoints)

```typescript
// Search companies (3 credits per result)
const companies = await el.search.companies({
  industry: 'IT Services',
  country: 'US',
  page_size: '10',
});

// Search people (3 credits per result)
const people = await el.search.people({
  country: 'US',
  current_role_title: 'CTO',
});
```

### School (2 endpoints)

```typescript
// Get school profile (1 credit)
const school = await el.school.profile({ url: 'https://linkedin.com/school/mit' });

// List students (3 credits per student)
const students = await el.school.students({ school_url: 'https://linkedin.com/school/mit' });
```

### Job (3 endpoints)

```typescript
// Get job posting details (2 credits)
const job = await el.job.profile({ url: 'https://linkedin.com/jobs/view/123456' });

// Search job postings (2 credits)
const jobs = await el.job.search({ keyword: 'engineer', flexibility: 'remote' });

// Count matching jobs (2 credits)
const jobCount = await el.job.count({ keyword: 'engineer' });
```

### Meta

```typescript
// Check credit balance (0 credits)
const balance = await el.meta.creditBalance();
```

## Clearbit Drop-in Replacement

Migrating from the deprecated `clearbit` npm package? Use the compatibility layer:

```typescript
// Before:
// const clearbit = require('clearbit')('your_clearbit_key');

// After:
import { ClearbitCompat } from '@enrichlayer/sdk/compat';
const clearbit = new ClearbitCompat({ apiKey: 'your-enrichlayer-key' });

// Same method signatures as the clearbit package
const company = await clearbit.Company.find({ domain: 'uber.com' });
console.log(company.name);              // "Uber"
console.log(company.category.industry); // "Transportation"
console.log(company.metrics.employees); // 32000

const person = await clearbit.Person.find({ email: 'alex@uber.com' });
console.log(person.name.fullName);      // "Alex Smith"
console.log(person.employment.title);   // "Engineering Manager"

const results = await clearbit.Prospector.search({
  domain: 'clearbit.com',
  role: 'engineering',
});
console.log(results.total);
console.log(results.results[0].name.fullName);

const domain = await clearbit.NameToDomain.find({ name: 'Uber' });
console.log(domain.domain); // "uber.com"
```

### Migration Guide

| Clearbit | Enrich Layer SDK |
|----------|-----------------|
| `require('clearbit')(key)` | `new ClearbitCompat({ apiKey: key })` |
| `clearbit.Company.find({ domain })` | Same |
| `clearbit.Person.find({ email })` | Same |
| `clearbit.Prospector.search({ domain, role })` | Same |
| `clearbit.NameToDomain.find({ name })` | Same |

The compat layer maps Enrich Layer's response fields to Clearbit's format. Fields not available in Enrich Layer (like `tech`, `social.twitter`) return `null` or `[]`.

## Configuration

```typescript
const el = new EnrichLayer({
  apiKey: 'your-api-key',      // Required
  baseUrl: 'https://...',      // Optional, default: https://enrichlayer.com
  timeoutMs: 60_000,           // Optional, default: 30000
});
```

## Error Handling

```typescript
import { EnrichLayer, EnrichLayerError } from '@enrichlayer/sdk';

try {
  const company = await el.company.resolve({ company_domain: 'example.com' });
} catch (err) {
  if (err instanceof EnrichLayerError) {
    console.error(`API error ${err.status}: ${err.message}`);
  }
}
```

## License

MIT

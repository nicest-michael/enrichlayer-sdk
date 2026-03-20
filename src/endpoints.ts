export const ENDPOINTS = {
  // Company (7 endpoints)
  COMPANY_PROFILE: "/api/v2/company",
  COMPANY_LOOKUP: "/api/v2/company/resolve",
  COMPANY_ID_LOOKUP: "/api/v2/company/resolve-id",
  COMPANY_PICTURE: "/api/v2/company/profile-picture",
  EMPLOYEE_LISTING: "/api/v2/company/employees/",
  EMPLOYEE_COUNT: "/api/v2/company/employees/count",
  EMPLOYEE_SEARCH: "/api/v2/company/employee/search/",

  // Person (4 endpoints)
  PERSON_PROFILE: "/api/v2/profile",
  PERSON_LOOKUP: "/api/v2/profile/resolve",
  PERSON_PICTURE: "/api/v2/person/profile-picture",
  ROLE_LOOKUP: "/api/v2/find/company/role/",

  // Contact (6 endpoints)
  REVERSE_EMAIL_LOOKUP: "/api/v2/profile/resolve/email",
  REVERSE_PHONE_LOOKUP: "/api/v2/resolve/phone",
  WORK_EMAIL_LOOKUP: "/api/v2/profile/email",
  PERSONAL_CONTACT: "/api/v2/contact-api/personal-contact",
  PERSONAL_EMAIL: "/api/v2/contact-api/personal-email",
  DISPOSABLE_EMAIL: "/api/v2/disposable-email",

  // School (2 endpoints)
  SCHOOL_PROFILE: "/api/v2/school",
  STUDENT_LISTING: "/api/v2/school/students/",

  // Job (3 endpoints)
  JOB_PROFILE: "/api/v2/job",
  JOB_SEARCH: "/api/v2/company/job",
  JOB_COUNT: "/api/v2/company/job/count",

  // Search (2 endpoints)
  COMPANY_SEARCH: "/api/v2/search/company",
  PERSON_SEARCH: "/api/v2/search/person",

  // Meta (1 endpoint)
  CREDIT_BALANCE: "/api/v2/credit-balance",
} as const;

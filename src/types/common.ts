/** Cache policy for API requests */
export type CachePolicy = "if-present" | "if-recent";

/** Whether to enrich the result with full profile data */
export type EnrichProfile = "skip" | "enrich";

/** Include/exclude toggle for optional data */
export type IncludeExclude = "include" | "exclude";

/** Boolean string for numeric ID resolution */
export type BooleanString = "true" | "false";

/** Employment status filter */
export type EmploymentStatus = "current" | "past" | "all";

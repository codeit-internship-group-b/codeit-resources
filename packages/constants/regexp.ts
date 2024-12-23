export const REGEXP_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  PASSWORD: /^[A-Za-z\d@$!%*?&]+$/,
} as const;
